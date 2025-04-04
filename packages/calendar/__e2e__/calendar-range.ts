import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { focusItem, getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;
const PERIOD_LEVEL = `period-level-${TEST_ID}`;

const mainElementSelector = Selector(dataTestIdSelector(TEST_ID));

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
