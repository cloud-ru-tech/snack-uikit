import { expect, test } from '../../../playwright/fixtures';
import { getButtonField, getButtonFieldList, getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';

test.describe('Field Text', () => {
  const TEST_ID = 'field-text-test';
  const COMPONENT_PREFIX = 'field-text';

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-text',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: true,
    hasPlaceholder: true,
    hasPrefixIcon: true,
    hasPrefix: true,
    hasPostfix: true,
    hasClearButton: true,
    hasCopyButton: true,
    hasValidationStates: true,
  });

  test('Should show prefix button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ buttonContent: 'DaySVG', prefixIcon: 'PlaceholderSVG', buttonVariant: 'before' }));
    const wrapper = getByTestId(TEST_ID);
    const buttonField = getButtonField(wrapper);

    await expect(buttonField, 'button field is not present').toBeVisible();
    await expect(
      wrapper.locator('[data-test-id="icon-placeholder-xs"]'),
      "prefix icon is present although shouldn't",
    ).not.toBeVisible();
  });

  test('Should show postfix button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ buttonContent: 'DaySVG', prefixIcon: 'PlaceholderSVG', buttonVariant: 'after' }));
    const wrapper = getByTestId(TEST_ID);
    const buttonField = getButtonField(wrapper);

    await expect(buttonField, 'button field is not present').toBeVisible();
    await expect(
      wrapper.locator('[data-test-id="icon-placeholder-xs"]'),
      "prefix icon is present although shouldn't",
    ).not.toBeVisible();
  });

  test('Should show button field list', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({
        buttonContent: 'DaySVG',
        prefixIcon: 'PlaceholderSVG',
        buttonVariant: 'before',
        showButtonItems: true,
      }),
    );
    const wrapper = getByTestId(TEST_ID);
    const buttonField = getButtonField(wrapper);
    const buttonFieldList = getButtonFieldList(getByTestId);

    await expect(buttonField, 'button field is not present').toBeVisible();
    await expect(
      buttonField.locator('[data-test-id="icon-chevron-down-s"]'),
      'button chevron is not present',
    ).toBeVisible();

    await buttonField.click();

    await expect(buttonFieldList, 'button field list is not present').toBeVisible();

    await buttonFieldList.locator('[data-test-id="list__base-item_1"]').click();

    await expect(buttonFieldList, "button field list is present although shouldn't").not.toBeVisible();
    await expect(getByTestId('toast-user-action__icon'), 'toaster is not present').toBeVisible();
  });

  // test was not working properly before
  test.skip('Should show button field list with search', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({
        buttonContent: 'DaySVG',
        prefixIcon: 'PlaceholderSVG',
        buttonVariant: 'before',
        showButtonItems: true,
      }),
    );
    const wrapper = getByTestId(TEST_ID);
    const buttonField = getButtonField(wrapper);
    const buttonFieldList = getButtonFieldList(getByTestId);
    const search = buttonField.locator('[data-test-id="list__search-item"]');

    await expect(buttonField, 'button field is not present').toBeVisible();
    await expect(
      buttonField.locator('[data-test-id="icon-chevron-down-s"]'),
      'button chevron is not present',
    ).toBeVisible();

    await buttonField.click();

    await expect(buttonFieldList, 'button field list is not present').toBeVisible();
    await expect(search, 'search in button field list is not present').toBeVisible();
  });

  test('Should navigate to button field via keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      getStory({
        buttonContent: 'DaySVG',
        prefixIcon: 'PlaceholderSVG',
        buttonVariant: 'before',
        showButtonItems: true,
      }),
    );
    const wrapper = getByTestId(TEST_ID);
    await expect(wrapper, 'field is not present').toBeVisible();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    const buttonFieldList = getButtonFieldList(getByTestId);

    await expect(buttonFieldList, 'button field list is not present').toBeVisible();

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');
    await page.keyboard.press('a');

    await expect(buttonFieldList, "button field list is present although shouldn't").not.toBeVisible();
    await expect(getInput(wrapper, COMPONENT_PREFIX)).toHaveValue('a');
  });
});
