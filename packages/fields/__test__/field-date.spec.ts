import type { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';
import { runTestsForOpenableFields } from './utils/runTestsForOpenableFields';

test.describe('Field Date', () => {
  const TEST_ID = 'field-date-test';
  const CALENDAR_TEST_ID = 'field-date__calendar';
  const COMPONENT_PREFIX = 'field-date';
  const MILLISECONDS_TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);
  const getApplyButton = (getByTestId: (testId: string) => Locator) => getByTestId('apply-button-' + CALENDAR_TEST_ID);

  const getDay = (getByTestId: (testId: string) => Locator) => getByTestId('item-' + CALENDAR_TEST_ID);
  const getSelectedDay = (getByTestId: (testId: string) => Locator) =>
    getByTestId('item-' + CALENDAR_TEST_ID)
      .locator('[data-is-selected]')
      .locator('span');
  const getMonthAndYear = (getByTestId: (testId: string) => Locator) => getByTestId('period-level-' + CALENDAR_TEST_ID);

  const getHour = (getByTestId: (testId: string) => Locator) => getByTestId('hours-' + CALENDAR_TEST_ID);
  const getSelectedHour = (page: Page) => page.locator('[data-test-id="hours-' + CALENDAR_TEST_ID + '"][data-checked]');

  const getMinute = (getByTestId: (testId: string) => Locator) => getByTestId('minutes-' + CALENDAR_TEST_ID);
  const getSelectedMinute = (page: Page) =>
    page.locator('[data-test-id="minutes-' + CALENDAR_TEST_ID + '"][data-checked]');

  const getSeconds = (getByTestId: (testId: string) => Locator) => getByTestId('seconds-' + CALENDAR_TEST_ID);
  const getSelectedSeconds = (page: Page) =>
    page.locator('[data-test-id="seconds-' + CALENDAR_TEST_ID + '"][data-checked]');

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-date',
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
    defaultValue: String(1286668800000 + MILLISECONDS_TIMEZONE_OFFSET) /* 10.10.2023 00:00:00 */,
    expectedValue: '10.10.2010',
    valuePropName: 'dateValue',
  });

  runTestsForOpenableFields(getStory, TEST_ID, {
    iconTestId: 'icon-calendar-xs',
    dropListTestId: CALENDAR_TEST_ID,
  });

  // format data
  test("[mode='date'] Should format value correctly", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ mode: 'date', dateValue: '' }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.click();
    await input.pressSequentially('19121987');
    await expect(input).toHaveValue('19.12.1987');
  });

  // select data
  test("[mode='date'] Should select value from calendar with mouse", async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({ mode: 'date', dateValue: 1686355200000 + MILLISECONDS_TIMEZONE_OFFSET /* 10.06.2023 */ }),
    );
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const calendar = getByTestId(CALENDAR_TEST_ID);

    await expect(input).toHaveValue('10.06.2023');

    await input.click();

    await expect(getSelectedDay(getByTestId)).toHaveText('10');
    await expect(getMonthAndYear(getByTestId)).toHaveText('Июнь 2023');

    await getMonthAndYear(getByTestId).click();
    await getDay(getByTestId).nth(7).click();
    await getDay(getByTestId).nth(23).click();

    await expect(calendar, 'calendar is still present after selection').not.toBeVisible();
    await expect(input).toHaveValue('23.08.2023');
  });

  test("[mode='date'] Should select value from calendar with keyboard", async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      getStory({ mode: 'date', dateValue: 1686355200000 + MILLISECONDS_TIMEZONE_OFFSET /* 10.06.2023 */ }),
    );
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const calendar = getByTestId(CALENDAR_TEST_ID);

    await expect(input).toHaveValue('10.06.2023');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    await expect(getSelectedDay(getByTestId)).toHaveText('10');
    await expect(getMonthAndYear(getByTestId)).toHaveText('Июнь 2023');

    // open month selection
    await page.keyboard.press('Enter');
    // select month
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    //select day
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(calendar, 'calendar is still present after selection').not.toBeVisible();
    await expect(input).toHaveValue('24.05.2023');
  });

  // mode = date-time

  // format data
  test("[mode='date-time'] Should format value correctly", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ mode: 'date-time', dateValue: '' }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.click();
    await input.pressSequentially('19121987122025');
    await expect(input).toHaveValue('19.12.1987, 12:20:25');
  });

  // format data
  test("[mode='date-time', showSeconds=false] Should format value correctly", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ mode: 'date-time', dateValue: '', showSeconds: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.click();
    await input.pressSequentially('19121987122025');
    await expect(input).toHaveValue('19.12.1987, 12:25');
  });

  // select data
  test("[mode='date-time'] Should select value from calendar with mouse", async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      getStory({
        mode: 'date-time',
        dateValue: 1686367405000 + MILLISECONDS_TIMEZONE_OFFSET /* 10.06.2023, 03:23:25 */,
      }),
    );
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const calendar = getByTestId(CALENDAR_TEST_ID);

    await expect(input).toHaveValue('10.06.2023, 03:23:25');

    await input.click();
    await expect(calendar).toBeVisible();

    await expect(getSelectedDay(getByTestId)).toHaveText('10');
    await expect(getMonthAndYear(getByTestId)).toHaveText('Июнь 2023');
    await expect(getSelectedHour(page)).toHaveText('03');
    await expect(getSelectedMinute(page)).toHaveText('23');
    await expect(getSelectedSeconds(page)).toHaveText('25');

    await getMonthAndYear(getByTestId).click();
    await getDay(getByTestId).nth(7).click();
    await getDay(getByTestId).nth(23).click();
    await getHour(getByTestId).nth(10).click();
    await getMinute(getByTestId).nth(11).click();
    await getSeconds(getByTestId).nth(12).click();
    await getApplyButton(getByTestId).click();

    await expect(calendar, 'calendar is still present after selection').not.toBeVisible();
    await expect(input).toHaveValue('23.08.2023, 10:11:12');
  });

  test("[mode='date-time'] Should select value from calendar with keyboard", async ({
    gotoStory,
    getByTestId,
    page,
  }) => {
    await gotoStory(
      getStory({
        mode: 'date-time',
        dateValue: String(1686367405000 + MILLISECONDS_TIMEZONE_OFFSET) /* 10.06.2023, 03:23:25 */,
      }),
    );
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const calendar = getByTestId(CALENDAR_TEST_ID);

    await expect(input).toHaveValue('10.06.2023, 03:23:25');

    await wrapper.click();
    await expect(calendar).toBeVisible();

    await expect(getSelectedDay(getByTestId)).toHaveText('10');
    await expect(getMonthAndYear(getByTestId)).toHaveText('Июнь 2023');
    await expect(getSelectedHour(page)).toHaveText('03');
    await expect(getSelectedMinute(page)).toHaveText('23');
    await expect(getSelectedSeconds(page)).toHaveText('25');

    // open month menu
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // select month
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    //select day
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    //select hour
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    //select minute
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    //select minute & apply
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');

    await expect(calendar, 'calendar is still present after selection').not.toBeVisible();
    await expect(input).toHaveValue('24.05.2023, 06:20:22');
  });

  // regress test
  test('should not toggle droplist by many clicks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const wrapper = getByTestId(TEST_ID);
    const getCalendar = () => getByTestId(CALENDAR_TEST_ID);

    await expect(getCalendar(), 'calendar is present before first click').not.toBeVisible();
    await wrapper.click();
    await expect(getCalendar(), 'calendar is not present after click').toBeVisible();
    await wrapper.click();
    await expect(getCalendar(), 'calendar was hidden by second click').toBeVisible();
  });
});
