import { expect, test } from '../../../playwright/fixtures';
import { getCalendarTextSnapshot, getTimeValueFromHolder } from './utils';

const TEST_ID = 'test-id';
const HOURS_ITEM = `hours-${TEST_ID}`;
const MINUTES_ITEM = `minutes-${TEST_ID}`;
const SECONDS_ITEM = `seconds-${TEST_ID}`;
const APPLY_BUTTON = `apply-button-${TEST_ID}`;
const CURRENT_BUTTON = `current-button-${TEST_ID}`;

test.describe('timepicker', () => {
  test('Should select time by click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'time-picker',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        todayHours: 12,
        todayMinutes: 0,
        todaySeconds: 0,
        mode: 'date-time',
      },
    });
    await getByTestId(HOURS_ITEM).nth(5).click();
    await getByTestId(MINUTES_ITEM).nth(5).click();
    await getByTestId(SECONDS_ITEM).nth(5).click();
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await expect(await getTimeValueFromHolder(page)).toEqual('05:05:05');
  });

  test('Should render with selected time', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'time-picker',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        todayHours: 12,
        todayMinutes: 0,
        todaySeconds: 0,
        mode: 'date-time',
        valueHours: 5,
        valueMinutes: 5,
        valueSeconds: 5,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await expect(await getTimeValueFromHolder(page)).toEqual('05:05:05');
  });

  test('Should select current time by click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'time-picker',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        todayHours: 12,
        todayMinutes: 0,
        todaySeconds: 0,
        mode: 'date-time',
        valueHours: 5,
        valueMinutes: 5,
        valueSeconds: 5,
      },
    });
    await getByTestId(CURRENT_BUTTON).click();
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      hours: '00,01,02,03,04,05,06,07,08,09,10,11,[12],13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await expect(await getTimeValueFromHolder(page)).toEqual('12:00:00');
  });

  test('Should select time by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'time-picker',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        todayHours: 12,
        todayMinutes: 0,
        todaySeconds: 0,
        mode: 'date-time',
      },
    });
    const pressKey = async (key: string, times: number = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press(key);
      }
    };

    await expect(getByTestId(TEST_ID)).toBeVisible();

    // select 5 hours
    await pressKey('Tab');
    await pressKey('ArrowDown', 5);
    await pressKey('Enter');

    // select 5 minutes
    await pressKey('ArrowDown', 5);
    await pressKey('Enter');

    // select 5 seconds
    await pressKey('ArrowDown', 5);
    await pressKey('Enter');

    // apply
    await pressKey('Enter');

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await expect(await getTimeValueFromHolder(page)).toEqual('05:05:05');
  });

  test('Should select current time by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'time-picker',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        todayHours: 12,
        todayMinutes: 0,
        todaySeconds: 0,
        mode: 'date-time',
        valueHours: 5,
        valueMinutes: 5,
        valueSeconds: 5,
      },
    });
    const pressKey = async (key: string, times: number = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press(key);
      }
    };

    // workaround to place focus in the beginning, because of some issues in Testcafe
    await getByTestId(TEST_ID).click({ position: { x: 0, y: 0 } });

    // go to current button & apply
    await pressKey('Tab', 4);
    await pressKey('Enter', 2);

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      hours: '00,01,02,03,04,05,06,07,08,09,10,11,[12],13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await expect(await getTimeValueFromHolder(page)).toEqual('12:00:00');
  });

  test('Presets should not be available', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'time-picker',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        todayHours: 12,
        todayMinutes: 0,
        todaySeconds: 0,
        mode: 'date-time',
        showPeriodPresets: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(`presets-${TEST_ID}`)).not.toBeVisible();
  });
});
