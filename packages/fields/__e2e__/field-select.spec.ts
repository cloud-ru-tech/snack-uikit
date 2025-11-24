import { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { getButtonClearValue, getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';
import { runTestsForOpenableFields } from './utils/runTestsForOpenableFields';

test.describe('Field Select', () => {
  const TEST_ID = 'field-select-test';
  const COMPONENT_PREFIX = 'field-select';
  const LIST_TEST_ID = 'field-select__list';

  const getOptions = (page: Page) => page.locator('[data-test-id^="field-select__list-option-"]');
  const getOption = (getByTestId: (testId: string) => Locator, id: string) =>
    getByTestId(`field-select__list-option-${id}`);
  const getNoData = (getByTestId: (testId: string) => Locator) => getByTestId('field-select__no-data');

  const expectOptionChecked = async (getByTestId: (testId: string) => Locator, optionIds: string[]) => {
    for (const id of optionIds) {
      const attrs = await getOption(getByTestId, id).getAttribute('data-checked');

      await expect(attrs, `option with id "${id}" is not selected`).toEqual('true');
    }
  };

  const expectOptionNotChecked = async (getByTestId: (testId: string) => Locator, optionIds: string[]) => {
    for (const id of optionIds) {
      const attrs = await getOption(getByTestId, id).getAttribute('data-checked');

      await expect(attrs, `option with id "${id}" is checked although shouldn't`).not.toEqual('true');
    }
  };

  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-select',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: false,
    hasPlaceholder: true,
    hasPrefixIcon: true,
    hasPrefix: true,
    hasPostfix: true,
    hasClearButton: true,
    hasCopyButton: false,
    hasValidationStates: true,
    defaultValue: 'op1',
    expectedValue: 'Option 1',
  });

  runTestsForOpenableFields(props => getStory({ ...props, searchable: false }), TEST_ID, {
    dropListTestId: LIST_TEST_ID,
    iconTestId: 'icon-chevron-down-xs',
  });

  // searchable = false;
  test("Shouldn't allow to input text when searchable = false", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: '', searchable: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.fill('Option');
    await expect(input).toHaveValue('');
  });

  // open/close & searchable = true
  test('Should open list when typing & reset input when closing list', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 'op1', searchable: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const list = getByTestId(LIST_TEST_ID);

    await expect(wrapper).toBeVisible();

    await page.keyboard.press('Tab');

    await page.keyboard.press('o');
    await page.keyboard.press('o');
    await expect(input).toHaveValue('oo');
    await expect(list, 'list is not present after input').toBeVisible();

    await page.keyboard.press('Escape');
    await expect(list, 'list is present after esc').not.toBeVisible();
    await expect(input).toHaveValue('Option 1');
  });

  // open/close & required = true
  test('Should open list on clearing value if required', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 'op1', required: true }));
    const wrapper = getByTestId(TEST_ID);
    const list = getByTestId(LIST_TEST_ID);

    await getButtonClearValue(wrapper).click();

    await expect(list, 'list is not present after clearing value').toBeVisible();
  });

  // FieldSelect.mode = Single

  // select item by mouse
  test('Should select items with mouse', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 'op1', searchable: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const list = getByTestId(LIST_TEST_ID);

    await input.click();
    await expect(input, { message: 'Option 1 is not selected at the beginning' }).toHaveValue('Option 1');
    await expectOptionChecked(getByTestId, ['op1']);

    await getOption(getByTestId, 'op2').click();
    await expect(list, 'list is still present after selecting item').not.toBeVisible();
    await expect(input, { message: 'should select active item' }).toHaveValue('Option 2');

    // selecting disabled item
    await input.click();
    await expectOptionChecked(getByTestId, ['op2']);
    await getOption(getByTestId, 'op5').click();
    await expect(list, 'list is not present after selecting disabled item').toBeVisible();
    await expect(input, { message: "shouldn't select disabled item" }).toHaveValue('Option 2');
  });

  // search & select item by mouse
  test.skip('Should search & select items with mouse', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: '', searchable: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const options = getOptions(page);

    await input.click();
    await expect(options.count()).toEqual(7);

    await page.keyboard.press('o');
    await page.keyboard.press('n');
    await page.keyboard.press(' ');
    await page.keyboard.press('1');
    await expect(input).toHaveText('ion 1');

    await expect(options.count()).toEqual(3);
  });

  // select item by keyboard
  test.skip('Should select items with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 'op1', searchable: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const list = getByTestId(LIST_TEST_ID);

    // open list
    await page.keyboard.press('Tab');

    // select 2nd option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(list, 'list is still present after selecting item').not.toBeVisible();

    await expect(input, { message: 'should go down & select item with space' }).toHaveValue('Option 2');

    // skip disabled item
    // await page.keyboard.press('right'); // navigate to button first & then open
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input, { message: 'should go down, skip disabled item & select active item' }).toHaveValue(
      'Option 11',
    );

    // do the same in the other direction
    // select 11th option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(input, { message: 'should go up & select item with space' }).toHaveValue('Option 2');

    // skip disabled item
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(input, { message: 'should go up, skip disabled item & select active item' }).toHaveValue('Option 4');
  });

  // search & select item by keyboard
  test.skip('Should search & select items with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: '', searchable: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const options = getOptions(page);

    // search & open list
    await page.keyboard.press('Tab');
    await page.keyboard.press('o');
    await page.keyboard.press('n');
    await page.keyboard.press(' ');
    await page.keyboard.press('1');
    await expect(options.count()).toEqual(3);

    // select 2nd option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input, { message: 'should go down & select item with space' }).toHaveValue('Option 11');

    // do the same in the other direction
    // select 11th option
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Delete');
    await expect(options.count()).toEqual(7);
    await page.keyboard.press('o');
    await page.keyboard.press('n');
    await page.keyboard.press(' ');
    await page.keyboard.press('1');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(input, { message: 'should go up & select item with space' }).toHaveValue('Option 11');

    // get back into input & search until nothing is found
    await page.keyboard.press('Control+a');
    await page.keyboard.type('tion 1');
    await expect(options.count()).toEqual(3);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('1');
    await expect(options.count()).toEqual(1);
    await expect(options.nth(0)).toHaveText('Option 11');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('1');
    await expect(getNoData(getByTestId), 'no data is not present').toBeVisible();
  });

  // FieldSelect.mode = Multi

  // select item by mouse
  test('Should select multiple items with mouse', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 'op1', selection: 'multiple', searchable: false, required: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const list = getByTestId(LIST_TEST_ID);

    await input.click();

    await expectOptionChecked(getByTestId, ['op1']);

    // selecting items
    await getOption(getByTestId, 'op2').click();
    await expect(list, 'list is not present after selecting item').toBeVisible();

    await expectOptionChecked(getByTestId, ['op1', 'op2']);

    // selecting disabled item
    await getOption(getByTestId, 'op5').click();
    await expectOptionChecked(getByTestId, ['op1', 'op2']);
    await expectOptionNotChecked(getByTestId, ['op5']);

    // unselecting items
    await getOption(getByTestId, 'op1').click();

    await expectOptionNotChecked(getByTestId, ['op1']);
    await expectOptionChecked(getByTestId, ['op2']);

    await getButtonClearValue(wrapper).click();

    await expectOptionNotChecked(getByTestId, ['op2']);
  });

  // close after selection
  test('Open/close list after selection multiple items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 'op1', selection: 'multiple', searchable: false, required: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const list = getByTestId(LIST_TEST_ID);

    // selecting items
    await input.click();
    await getOption(getByTestId, 'op2').click();
    await expect(list, 'list is not present after selecting item').toBeVisible();

    // should close list on click
    await input.click();
    await expect(list, 'list is still present after input click').not.toBeVisible();
    await input.click();
    await expect(list, 'list is not present after second input click').toBeVisible();
  });

  // search & select item by mouse
  test.skip('Should search & select multiple items with mouse', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 'op1', selection: 'multiple', searchable: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const options = getOptions(page);

    // should search and select
    await input.click();
    await expect(options.count()).toEqual(7);
    await expect(input).toHaveValue('');

    await page.keyboard.press('o');
    await page.keyboard.press('n');
    await page.keyboard.press(' ');
    await page.keyboard.press('1');

    await expect(input).toHaveValue('ion 1');
    await expect(options.count()).toEqual(3);

    await options.nth(1).click();

    await expect(options.count()).toEqual(3);
  });

  // select item by keyboard
  test.skip('Should select multiple items with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 'op1', selection: 'multiple', searchable: false }));
    // open list
    await page.keyboard.press('Tab');

    // select 2nd option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expectOptionChecked(getByTestId, ['op1', 'op2']);

    // skip disabled item
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expectOptionChecked(getByTestId, ['op1', 'op2', 'op11']);

    // do the same in the other direction
    // select 11th option
    await page.keyboard.press('Escape');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    await expectOptionChecked(getByTestId, ['op1', 'op2']);
    await expectOptionNotChecked(getByTestId, ['op11']);

    // skip disabled item
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    await expectOptionChecked(getByTestId, ['op1', 'op2', 'op4']);
  });

  // search & select item by keyboard
  test.skip('Should search & select multiple items with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: '', selection: 'multiple', searchable: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const options = getOptions(page);

    // search & open list
    await page.keyboard.press('Tab');
    await page.keyboard.press('o');
    await page.keyboard.press('n');
    await page.keyboard.press(' ');
    await page.keyboard.press('1');
    await expect(input, { message: 'text is not entered' }).toHaveValue('ion 1');
    await expect(options.count()).toEqual(3);

    // select 2nd option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(options.count()).toEqual(3);
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Delete');
    await expectOptionChecked(getByTestId, ['op1', 'op11']);

    // do the same in the other direction
    // select 11th option
    await page.keyboard.press('o');
    await page.keyboard.press('n');
    await page.keyboard.press(' ');
    await page.keyboard.press('1');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Delete');
    await expectOptionChecked(getByTestId, ['op3']);
    await expectOptionNotChecked(getByTestId, ['op11']);

    // get back into input & search until nothing is found
    // await page.keyboard.press('ion 1');
    await expect(options.count()).toEqual(3);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('1');
    await expect(options.count()).toEqual(1);
    await expect(options.nth(0)).toHaveText('Option 11');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('1');
  });

  test('should toggle droplist by clicks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const wrapper = getByTestId(TEST_ID);
    const getDropList = () => getByTestId(LIST_TEST_ID);

    await expect(getDropList(), "drop list is present although shouldn't").not.toBeVisible();
    await wrapper.click();
    await expect(getDropList(), 'drop list is not present after click').toBeVisible();
    await wrapper.click();
    await expect(getDropList(), "drop list still present after click although shouldn't").not.toBeVisible();

    // await icon.click();
    // await expect(getDropList()).toBeVisible('drop list is not present after clicking on icon');

    // await wrapper.click();
    // await expect(getDropList()).not.toBeVisible("drop list still present after click although shouldn't");
    // await page.keyboard.press('Enter');
    // await expect(getDropList()).toBeVisible('drop list is not present after enter');
  });
});
