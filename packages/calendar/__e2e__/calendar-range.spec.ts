import { expect, test } from '../../../playwright/fixtures';
import {
  focusItem,
  getCalendarTextSnapshot,
  getCustomOptions,
  getDefaultOptions,
  getPresetsItemsLabels,
} from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;
const PERIOD_LEVEL = `period-level-${TEST_ID}`;
const PRESETS = `presets-${TEST_ID}`;
const PRESETS_TITLE = `presets-header-${TEST_ID}`;

const DEFAULT_OPTIONS_LABELS = getDefaultOptions();
const CUSTOM_OPTIONS_LABELS = getCustomOptions();

test.describe('[calendar] mode=range', () => {
  test('Should highlight selected range', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        rangeValueStart: 1681894800000, // 19 апреля 23
        rangeValueEnd: 1682672400000, // 28 апреля 23
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,[19]_,_20_,_21_,_22_,_23_,_24_,_25_,_26_,_27_,_[28],29,30,1,2,3,4,5,6',
      periodLevelName: 'April 2023',
    });
  });

  test('Should show start of selected range', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        rangeValueStart: 1681894800000, // 19 апреля 23
        rangeValueEnd: 1751101200000, // 28 июня 25
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,[19]_,_20_,_21_,_22_,_23_,_24_,_25_,_26_,_27_,_28_,_29_,_30_,_1_,_2_,_3_,_4_,_5_,_6_',
      periodLevelName: 'April 2023',
    });
  });

  test('Should show selected months', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        rangeValueStart: 1681894800000, // 19 апреля 23
        rangeValueEnd: 1751101200000, // 28 июня 25
      },
    });
    await getByTestId(PERIOD_LEVEL).click();
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items:
        'January,February,March,[April]_,_!May_,_June_,_July_,_August_,_September_,_October_,_November_,_December_',
      periodLevelName: '2023',
    });
  });

  test('Should show selected years', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        rangeValueStart: 1681894800000, // 19 апреля 23
        rangeValueEnd: 1751101200000, // 28 июня 25
      },
    });
    await getByTestId(PERIOD_LEVEL).click();
    await getByTestId(PERIOD_LEVEL).click();
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '2019,2020,2021,2022,[!2023]_,_2024_,_[2025],2026,2027,2028,2029,2030',
      periodLevelName: '2020-2029',
    });
  });

  test('Should highlight days on focus in preselect', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        localeName: 'ru-RU',
      },
    });
    await getByTestId(ITEM).nth(3).click();
    await focusItem(page, 22);
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Пн,Вт,Ср,Чт,Пт,Сб,Вс',
      items:
        '1,2,3,[4]_,_5_,_6_,_7_,_8_,_9_,_10_,_11_,_12_,_13_,_14_,_!15_,_16_,_17_,_18_,_19_,_20_,_21_,_22_,_23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11',
      periodLevelName: 'Май 2023',
    });
  });

  test('Should highlight months on focus in preselect', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        localeName: 'ru-RU',
      },
    });
    await getByTestId(ITEM).nth(3).click();
    await getByTestId(PERIOD_LEVEL).click();
    await focusItem(page, 9);
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: 'Январь,Февраль,Март,Апрель,[!Май]_,_Июнь_,_Июль_,_Август_,_Сентябрь_,_Октябрь,Ноябрь,Декабрь',
      periodLevelName: '2023',
    });
  });

  test('Should highlight year on focus in preselect', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
        localeName: 'ru-RU',
      },
    });
    await getByTestId(ITEM).nth(3).click();
    await getByTestId(PERIOD_LEVEL).click();
    await getByTestId(PERIOD_LEVEL).click();
    await focusItem(page, 9);
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '2019,2020,2021,2022,[!2023]_,_2024_,_2025_,_2026_,_2027_,_2028,2029,2030',
      periodLevelName: '2020-2029',
    });
  });

  test('Should select range by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); // попадаем на даты
    await page.keyboard.press('ArrowUp'); // переходим на предыдущий месяц
    await page.keyboard.press('ArrowUp'); // переходим на предыдущий месяц
    await page.keyboard.press('ArrowRight'); // переходим на предыдущий месяц
    await page.keyboard.press('Enter'); // выбираем начало периода
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter'); // выбираем конец периода
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '_30_,_1_,_2_,_3_,_4_,_5_,_6_,_7_,_8_,_9_,_10_,_11_,_12_,_13_,_14_,_!15_,_[16],17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
    });
  });

  test('Presets section should not be available by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(PRESETS)).not.toBeVisible();
  });

  test('If presets feature is enabled, presets title should be present by default and only fallback presets list options should be available', async ({
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
        mode: 'range',
        showPeriodPresets: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(PRESETS_TITLE)).toBeVisible();

    const availableItemsLabels = await getPresetsItemsLabels(page);
    await expect(availableItemsLabels.join(',')).toEqual(DEFAULT_OPTIONS_LABELS.join(','));
  });

  test('If provided, custom options should be displayed instead of fallback options', async ({
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
        mode: 'range',
        showPeriodPresets: true,
        showCustomPresetsItems: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    const availableItemsLabels = await getPresetsItemsLabels(page);
    await expect(availableItemsLabels.join(',')).toEqual(CUSTOM_OPTIONS_LABELS.join(','));
  });

  test('Presets title should not be visible if is disabled in options, but presets items should still be available', async ({
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
        mode: 'range',
        showPeriodPresets: true,
        showCustomPresetsItems: true,
        showPresetsTitle: false,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(PRESETS_TITLE)).not.toBeVisible();

    const availableItemsLabels = await getPresetsItemsLabels(page);
    await expect(availableItemsLabels.join(',')).toEqual(CUSTOM_OPTIONS_LABELS.join(','));
  });

  test('Clicking a preset option should specify appropriate period for calendar', async ({
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
        mode: 'range',
        showPeriodPresets: true,
        showCustomPresetsItems: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    const availableItemsLabels = await getPresetsItemsLabels(page);
    await expect(availableItemsLabels.join(',')).toEqual(CUSTOM_OPTIONS_LABELS.join(','));

    await getByTestId('list__base-item-option').filter({ hasText: 'Next 7 days' }).click();
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[!15]_,_16_,_17_,_18_,_19_,_20_,_21_,_[22],23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
    });

    await getByTestId('list__base-item-option').filter({ hasText: 'Previous 7 days' }).click();
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,[8]_,_9_,_10_,_11_,_12_,_13_,_14_,_[!15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
    });

    await getByTestId('list__base-item-option').filter({ hasText: 'Next weekend' }).click();
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,[20]_,_[21],22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
    });
  });
});
