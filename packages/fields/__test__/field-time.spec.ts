import { expect, Locator, Page, test } from '../../../playwright/fixtures';
import { getInput, runCommonTests, runTestsForOpenableFields } from './utils';

test.describe('Field Time', () => {
  const TEST_ID = 'field-time-test';
  const TIMEPICKER_TEST_ID = 'field-time__timepicker';
  const COMPONENT_PREFIX = 'field-time';

  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);
  const getApplyButton = (getByTestId: (testId: string) => Locator) =>
    getByTestId('apply-button-' + TIMEPICKER_TEST_ID);

  const getHour = (getByTestId: (testId: string) => Locator) => getByTestId('hours-' + TIMEPICKER_TEST_ID);
  const getSelectedHour = (page: Page) =>
    page.locator('[data-test-id="hours-' + TIMEPICKER_TEST_ID + '"][data-checked]');

  const getMinute = (getByTestId: (testId: string) => Locator) => getByTestId('minutes-' + TIMEPICKER_TEST_ID);

  const getSelectedMinute = (page: Page) =>
    page.locator('[data-test-id="minutes-' + TIMEPICKER_TEST_ID + '"][data-checked]');

  const getSeconds = (getByTestId: (testId: string) => Locator) => getByTestId('seconds-' + TIMEPICKER_TEST_ID);
  const getSelectedSeconds = (page: Page) =>
    page.locator('[data-test-id="seconds-' + TIMEPICKER_TEST_ID + '"][data-checked]');

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-time',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: false,
    hasPlaceholder: false,
    hasPrefixIcon: false,
    hasPrefix: false,
    hasPostfix: false,
    hasClearButton: true,
    hasCopyButton: true,
    hasValidationStates: true,
    defaultValue: '02' /* 10.06.2023 */,
    expectedValue: '02:00:00',
    valuePropName: 'valueHours',
  });

  runTestsForOpenableFields(getStory, TEST_ID, {
    iconTestId: 'icon-watch-xs',
    dropListTestId: TIMEPICKER_TEST_ID,
  });

  // format data
  test('Should format value correctly', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.pressSequentially('555555');
    await expect(input).toHaveValue('05:55:05');
  });

  test('Should format value correctly, showSeconds=false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ showSeconds: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.pressSequentially('5555');
    await expect(input).toHaveValue('05:05');
  });

  // select data
  test('Should select value from timepicker with mouse', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ valueHours: 4, valueMinutes: 5, valueSeconds: 6 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const timepicker = getByTestId(TIMEPICKER_TEST_ID);

    await expect(input).toHaveValue('04:05:06');

    await input.click();

    await expect(getSelectedHour(page)).toHaveText('04');
    await expect(getSelectedMinute(page)).toHaveText('05');
    await expect(getSelectedSeconds(page)).toHaveText('06');

    await getHour(getByTestId).nth(10).click();
    await getMinute(getByTestId).nth(11).click();
    await getSeconds(getByTestId).nth(12).click();
    await getApplyButton(getByTestId).click();

    await expect(timepicker, 'timepicker is still present after selection').not.toBeVisible();
    await expect(input).toHaveValue('10:11:12');
  });

  test('Should select value from timepicker with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ valueHours: 4, valueMinutes: 5, valueSeconds: 6 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const timepicker = getByTestId(TIMEPICKER_TEST_ID);

    await expect(input).toHaveValue('04:05:06');

    await wrapper.click();

    await expect(getSelectedHour(page)).toHaveText('04');
    await expect(getSelectedMinute(page)).toHaveText('05');
    await expect(getSelectedSeconds(page)).toHaveText('06');

    // open menu & select hours
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // select minutes
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // select seconds & apply
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');

    await expect(timepicker, 'timepicker is still present after selection').not.toBeVisible();
    await expect(input).toHaveValue('07:08:09');
  });

  test('should not toggle droplist by many clicks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const wrapper = getByTestId(TEST_ID);
    const getTimepicker = () => getByTestId(TIMEPICKER_TEST_ID);

    await expect(getTimepicker(), 'timepicker is present before first click').not.toBeVisible();
    await wrapper.click();
    await expect(getTimepicker(), 'timepicker is not present after click').toBeVisible();
    await wrapper.click();
    await expect(getTimepicker(), 'timepicker was hidden by second click').toBeVisible();
  });
});
