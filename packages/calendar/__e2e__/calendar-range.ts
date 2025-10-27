import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
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

const mainElementSelector = Selector(dataTestIdSelector(TEST_ID));
const presetsSelector = Selector(dataTestIdSelector(PRESETS));

const DEFAULT_OPTIONS_LABELS = getDefaultOptions();
const CUSTOM_OPTIONS_LABELS = getCustomOptions();

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'range',
      ...props,
    },
  });

fixture('[calendar] mode=range');

test.page(
  getPage({
    rangeValueStart: 1681894800000, // 19 апреля 23
    rangeValueEnd: 1682672400000, // 28 апреля 23
  }),
)('Should highlight selected range', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,[19]_,_20_,_21_,_22_,_23_,_24_,_25_,_26_,_27_,_[28],29,30,1,2,3,4,5,6',
    periodLevelName: 'April 2023',
  });
});

test.page(
  getPage({
    rangeValueStart: 1681894800000, // 19 апреля 23
    rangeValueEnd: 1751101200000, // 28 июня 25
  }),
)('Should show start of selected range', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,[19]_,_20_,_21_,_22_,_23_,_24_,_25_,_26_,_27_,_28_,_29_,_30_,_1_,_2_,_3_,_4_,_5_,_6_',
    periodLevelName: 'April 2023',
  });
});

test.page(
  getPage({
    rangeValueStart: 1681894800000, // 19 апреля 23
    rangeValueEnd: 1751101200000, // 28 июня 25
  }),
)('Should show selected months', async t => {
  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await t.expect(await getCalendarTextSnapshot()).eql({
    items: 'January,February,March,[April]_,_!May_,_June_,_July_,_August_,_September_,_October_,_November_,_December_',
    periodLevelName: '2023',
  });
});

test.page(
  getPage({
    rangeValueStart: 1681894800000, // 19 апреля 23
    rangeValueEnd: 1751101200000, // 28 июня 25
  }),
)('Should show selected years', async t => {
  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await t.expect(await getCalendarTextSnapshot()).eql({
    items: '2019,2020,2021,2022,[!2023]_,_2024_,_[2025],2026,2027,2028,2029,2030',
    periodLevelName: '2020-2029',
  });
});

test.page(
  getPage({
    localeName: 'ru-RU',
  }),
)('Should highlight days on focus in preselect', async t => {
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(3));
  await focusItem(22);
  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Пн,Вт,Ср,Чт,Пт,Сб,Вс',
    items:
      '1,2,3,[4]_,_5_,_6_,_7_,_8_,_9_,_10_,_11_,_12_,_13_,_14_,_!15_,_16_,_17_,_18_,_19_,_20_,_21_,_22_,_23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11',
    periodLevelName: 'Май 2023',
  });
});

test.page(
  getPage({
    localeName: 'ru-RU',
  }),
)('Should highlight months on focus in preselect', async t => {
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(3));
  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await focusItem(9);
  await t.expect(await getCalendarTextSnapshot()).eql({
    items: 'Январь,Февраль,Март,Апрель,[!Май]_,_Июнь_,_Июль_,_Август_,_Сентябрь_,_Октябрь,Ноябрь,Декабрь',
    periodLevelName: '2023',
  });
});

test.page(
  getPage({
    localeName: 'ru-RU',
  }),
)('Should highlight year on focus in preselect', async t => {
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(3));
  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await focusItem(9);
  await t.expect(await getCalendarTextSnapshot()).eql({
    items: '2019,2020,2021,2022,[!2023]_,_2024_,_2025_,_2026_,_2027_,_2028,2029,2030',
    periodLevelName: '2020-2029',
  });
});

test.page(getPage())('Should select range by keyboard', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t.pressKey('tab');
  await t.pressKey('down'); // попадаем на даты
  await t.pressKey('up'); // переходим на предыдущий месяц
  await t.pressKey('up'); // переходим на предыдущий месяц
  await t.pressKey('right'); // переходим на предыдущий месяц
  await t.pressKey('enter'); // выбираем начало периода
  await t.pressKey('down');
  await t.pressKey('down');
  await t.pressKey('down');
  await t.pressKey('down');
  await t.pressKey('right');
  await t.pressKey('enter'); // выбираем конец периода
  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '_30_,_1_,_2_,_3_,_4_,_5_,_6_,_7_,_8_,_9_,_10_,_11_,_12_,_13_,_14_,_!15_,_[16],17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });
});

test.page(getPage())('Presets section should not be available by default', async t => {
  await t.expect(mainElementSelector.visible).ok();
  await t.expect(presetsSelector.visible).notOk();
});

test.page(
  getPage({
    showPeriodPresets: true,
  }),
)(
  'If presets feature is enabled, presets title should be present by default and only fallback presets list options should be available',
  async t => {
    await t.expect(mainElementSelector.visible).ok();
    await t.expect(Selector(dataTestIdSelector(PRESETS_TITLE)).visible).ok();

    const availableItemsLabels = await getPresetsItemsLabels();
    await t.expect(availableItemsLabels.join(',')).eql(DEFAULT_OPTIONS_LABELS.join(','));
  },
);

test.page(
  getPage({
    showPeriodPresets: true,
    showCustomPresetsItems: true,
  }),
)('If provided, custom options should be displayed instead of fallback options', async t => {
  await t.expect(mainElementSelector.visible).ok();

  const availableItemsLabels = await getPresetsItemsLabels();
  await t.expect(availableItemsLabels.join(',')).eql(CUSTOM_OPTIONS_LABELS.join(','));
});

test.page(
  getPage({
    showPeriodPresets: true,
    showCustomPresetsItems: true,
    showPresetsTitle: false,
  }),
)(
  'Presets title should not be visible if is disabled in options, but presets items should still be available',
  async t => {
    await t.expect(mainElementSelector.visible).ok();
    await t.expect(Selector(dataTestIdSelector(PRESETS_TITLE)).visible).notOk();

    const availableItemsLabels = await getPresetsItemsLabels();
    await t.expect(availableItemsLabels.join(',')).eql(CUSTOM_OPTIONS_LABELS.join(','));
  },
);

test.page(
  getPage({
    showPeriodPresets: true,
    showCustomPresetsItems: true,
  }),
)('Clicking a preset option should specify appropriate period for calendar', async t => {
  await t.expect(mainElementSelector.visible).ok();

  const availableItemsLabels = await getPresetsItemsLabels();
  await t.expect(availableItemsLabels.join(',')).eql(CUSTOM_OPTIONS_LABELS.join(','));

  await t.click(Selector(dataTestIdSelector('list__base-item-option')).withText('Next 7 days'));
  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[!15]_,_16_,_17_,_18_,_19_,_20_,_21_,_[22],23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });

  await t.click(Selector(dataTestIdSelector('list__base-item-option')).withText('Previous 7 days'));
  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,4,5,6,7,[8]_,_9_,_10_,_11_,_12_,_13_,_14_,_[!15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });

  await t.click(Selector(dataTestIdSelector('list__base-item-option')).withText('Next weekend'));
  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,[20]_,_[21],22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
  });
});
