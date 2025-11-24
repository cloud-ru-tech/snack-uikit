import { expect, test } from '../../../playwright/fixtures';
import { getCalendarTextSnapshot, getDateValueFromHolder } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;
const PERIOD_LEVEL = `period-level-${TEST_ID}`;
const HOURS_ITEM = `hours-${TEST_ID}`;
const MINUTES_ITEM = `minutes-${TEST_ID}`;
const SECONDS_ITEM = `seconds-${TEST_ID}`;
const APPLY_BUTTON = `apply-button-${TEST_ID}`;
const CURRENT_BUTTON = `current-button-${TEST_ID}`;
const MILLISECONDS_TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

test.describe('[calendar] mode=date-time', () => {
  test('Should select date and then time by click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
      },
    });
    await getByTestId(ITEM).nth(4).click();
    await getByTestId(APPLY_BUTTON).click({ force: true });

    // check apply button is still disabled
    await expect(await getDateValueFromHolder(page)).toEqual('');

    await getByTestId(HOURS_ITEM).nth(5).click();
    await getByTestId(MINUTES_ITEM).nth(5).click();
    await getByTestId(SECONDS_ITEM).nth(5).click();
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1683176705000 + MILLISECONDS_TIMEZONE_OFFSET));
  });
  test('Should select time and then date by click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
      },
    });
    await getByTestId(HOURS_ITEM).nth(5).click();
    await getByTestId(MINUTES_ITEM).nth(5).click();
    await getByTestId(SECONDS_ITEM).nth(5).click();
    await getByTestId(APPLY_BUTTON).click({ force: true });

    // check apply button is still disabled
    await expect(await getDateValueFromHolder(page)).toEqual('');

    await getByTestId(ITEM).nth(4).click();
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1683176705000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Should save selected time then moving between periods', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
      },
    });
    await getByTestId(HOURS_ITEM).nth(5).click();
    await getByTestId(MINUTES_ITEM).nth(5).click();
    await getByTestId(SECONDS_ITEM).nth(5).click();

    await getByTestId(PERIOD_LEVEL).click();
    await getByTestId(ITEM).nth(5).click();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8',
      periodLevelName: 'June 2023',
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
  });

  test('Should render with selected date & time', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
        dateValue: 1678856705000 + MILLISECONDS_TIMEZONE_OFFSET /* 15 марта 23 05:05:05*/,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '26,27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8',
      periodLevelName: 'March 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1678856705000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Should select current date & time by click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
        dateDefaultValue: 1678856705000 + MILLISECONDS_TIMEZONE_OFFSET /* 15 марта 23 05:05:05 */,
      },
    });
    await getByTestId(CURRENT_BUTTON).click();
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[!15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1684152000000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Should select date and then time by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
      },
    });
    const pressKey = async (keys: string, times: number = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press(keys);
      }
    };

    await expect(getByTestId(TEST_ID)).toBeVisible();

    // select May 4
    await pressKey('Tab', 2);
    await pressKey('ArrowUp', 2);
    await pressKey('ArrowRight', 3);
    await pressKey('Enter');

    // select 5 hours
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
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1683176705000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Should select time and then date by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
      },
    });
    const pressKey = async (keys: string, times: number = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press(keys);
      }
    };

    await expect(getByTestId(TEST_ID)).toBeVisible();

    // go to time section
    await pressKey('Tab', 3);

    // select 5 hours
    await pressKey('ArrowDown', 5);
    await pressKey('Enter');

    // select 5 minutes
    await pressKey('ArrowDown', 5);
    await pressKey('Enter');

    // select 5 seconds
    await pressKey('ArrowDown', 5);
    await pressKey('Enter');

    // go to date section
    await pressKey('Shift+Tab', 5);

    // select May 4
    await pressKey('ArrowUp', 2);
    await pressKey('ArrowRight', 3);
    await pressKey('Enter');

    // apply
    await pressKey('Tab', 4);
    await pressKey('Enter');

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1683176705000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Should select current date & time by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
        dateDefaultValue: 1678856705000 + MILLISECONDS_TIMEZONE_OFFSET /* 15 марта 23 05:05:05 */,
      },
    });
    const pressKey = async (keys: string, times: number = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press(keys);
      }
    };

    // workaround to place focus in the beginning, because of some issues in Testcafe
    await getByTestId(TEST_ID).click({ position: { x: 0, y: 0 } });

    // go to current button & apply
    await pressKey('Tab', 6);
    await pressKey('Enter', 2);

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[!15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
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

    await expect(await getDateValueFromHolder(page)).toEqual(String(1684152000000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Should navigate by active elements in time lists', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
        dateValue: 1683176705000 + MILLISECONDS_TIMEZONE_OFFSET /* 4 мая 2023 05:05:05 */,
      },
    });
    const pressKey = async (keys: string, times: number = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press(keys);
      }
    };

    await expect(getByTestId(TEST_ID)).toBeVisible();

    // move by already selected items & apply
    await pressKey('Tab', 3);
    await pressKey('Enter', 3);
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getDateValueFromHolder(page)).toEqual(String(1683176705000 + MILLISECONDS_TIMEZONE_OFFSET));

    // go back to seconds
    await pressKey('Shift+Tab', 2);
    await pressKey('Enter');

    // go back to minutes
    await pressKey('Shift+Tab', 3);
    await pressKey('Enter');

    // go back to hours
    await pressKey('Shift+Tab');
    await pressKey('Enter');

    // apply
    await getByTestId(APPLY_BUTTON).click();

    await expect(await getDateValueFromHolder(page)).toEqual(String(1683176705000 + MILLISECONDS_TIMEZONE_OFFSET));
  });

  test('Presets should not be available', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684152000000 + MILLISECONDS_TIMEZONE_OFFSET, // 15 Мая 2023, 12-00
        mode: 'date-time',
        showPeriodPresets: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(`presets-${TEST_ID}`)).not.toBeVisible();
  });
});
