import { expect, test } from '../../../playwright/fixtures';
import { getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;
const PERIOD_LEVEL = `period-level-${TEST_ID}`;
const NEXT_PERIOD = `period-next-${TEST_ID}`;
const PREV_PERIOD = `period-prev-${TEST_ID}`;

test('[calendar] mode=date, default - Check the focus to the first not disable cell', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1697371200000, // 15 Октября 2023, 12-00
      mode: 'date',
      modeBuildCellProps: 'for-tests',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '1,2,3,4,5,6,7,8,9,10,11,12,13,[14],!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11',
    periodLevelName: 'October 2023',
  });
});

test('[calendar] mode=date, default - Checking clicking on a disable cell so there is no selected', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1697371200000, // 15 Октября 2023, 12-00
      mode: 'date',
      modeBuildCellProps: 'for-tests',
    },
  });
  await getByTestId(ITEM).nth(7).click({ force: true });

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '1,2,3,4,5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11',
    periodLevelName: 'October 2023',
  });
});

test('[calendar] mode=date, default - Should be rendered', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();
});

test('[calendar] mode=date, default - Should show all items for period with today', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });
});

test('[calendar] mode=date, default - Should be selected by click', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(ITEM).nth(4).click();

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });
});

test('[calendar] mode=date, default - Should shift to next period', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(NEXT_PERIOD).click();

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8',
    periodLevelName: 'June 2023',
  });
});

test('[calendar] mode=date, default - Should shift to prev period', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PREV_PERIOD).click();

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6',
    periodLevelName: 'April 2023',
  });
});

test('[calendar] mode=date, default - Should render in ru localeName', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Пн,Вт,Ср,Чт,Пт,Сб,Вс',
    items:
      '1,2,3,4,5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11',
    periodLevelName: 'Май 2023',
  });
});

test('[calendar] mode=date, default - Should render with selected date', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
      dateValue: 1678870800000 /* 15 марта 23 */,
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Пн,Вт,Ср,Чт,Пт,Сб,Вс',
    items:
      '27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9',
    periodLevelName: 'Март 2023',
  });
});

test('[calendar] mode=date, default - Should show year view by click to viewModeButton', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: 'January,February,March,April,!May,June,July,August,September,October,November,December',
    periodLevelName: '2023',
  });
});

test('[calendar] mode=date, default - Should show year view in `ru` locale by click to viewModeButton', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: 'Январь,Февраль,Март,Апрель,!Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь',
    periodLevelName: '2023',
  });
});

test('[calendar] mode=date, default - Should switch to the next year by click to next period in year view', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(NEXT_PERIOD).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь',
    periodLevelName: '2024',
  });
});

test('[calendar] mode=date, default - Should switch to the prev year by click to prev period in year view', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(PREV_PERIOD).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь',
    periodLevelName: '2022',
  });
});

test('[calendar] mode=date, default - Should show selected month', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(ITEM).nth(2).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Пн,Вт,Ср,Чт,Пт,Сб,Вс',
    items:
      '27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9',
    periodLevelName: 'Март 2023',
  });
});

test('[calendar] mode=date, default - Should highlight selected month after date selection', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      localeName: 'ru-RU',
    },
  });
  await getByTestId(NEXT_PERIOD).click();
  await getByTestId(ITEM).nth(10).click();
  await getByTestId(PERIOD_LEVEL).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: 'Январь,Февраль,Март,Апрель,!Май,[Июнь],Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь',
    periodLevelName: '2023',
  });
});

test('[calendar] mode=date, default - Should show decade', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(PERIOD_LEVEL).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: '2019,2020,2021,2022,!2023,2024,2025,2026,2027,2028,2029,2030',
    periodLevelName: '2020-2029',
  });
});

test('[calendar] mode=date, default - Should show next decade', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(NEXT_PERIOD).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: '2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040',
    periodLevelName: '2030-2039',
  });
});

test('[calendar] mode=date, default - Should show prev decade', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(PREV_PERIOD).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: '2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020',
    periodLevelName: '2010-2019',
  });
});

test('[calendar] mode=date, default - Should show decade even viewMode button was clicked 3 times', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PERIOD_LEVEL).click({ force: true });
  await getByTestId(PERIOD_LEVEL).click({ force: true });
  await getByTestId(PERIOD_LEVEL).click({ force: true });
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: '2019,2020,2021,2022,!2023,2024,2025,2026,2027,2028,2029,2030',
    periodLevelName: '2020-2029',
  });
});

test('[calendar] mode=date, default - Should highlight year day selection', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(NEXT_PERIOD).click();
  await getByTestId(NEXT_PERIOD).click();
  await getByTestId(ITEM).nth(2).click();
  await getByTestId(ITEM).nth(12).click();
  await getByTestId(PERIOD_LEVEL).click();
  await getByTestId(PERIOD_LEVEL).click();
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: '2019,2020,2021,2022,!2023,2024,[2025],2026,2027,2028,2029,2030',
    periodLevelName: '2020-2029',
  });
});

test('[calendar] mode=date, default - Should set focus on viewMode button on tab', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    items: 'January,February,March,April,!May,June,July,August,September,October,November,December',
    periodLevelName: '2023',
  });
});

test('[calendar] mode=date, default - Should set focus on prev period button with arrow right', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6',
    periodLevelName: 'April 2023',
  });
});

test('[calendar] mode=date, default - Should set focus on date items with arrow down', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '[30],1,2,3,4,5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });
});

test('[calendar] mode=date, default - Should set prev period when arrow up pressed with on-top date focused', async ({
  page,
  gotoStory,
  getByTestId,
}) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('Enter');
  await expect(await getCalendarTextSnapshot(page)).toEqual({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,[30],1,2,3,4,5,6',
    periodLevelName: 'April 2023',
  });
});

test('[calendar] mode=date, default - Presets should not be available', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date',
      showPeriodPresets: true,
    },
  });
  await expect(getByTestId(TEST_ID)).toBeVisible();
  await expect(getByTestId(`presets-${TEST_ID}`)).not.toBeVisible();
});
