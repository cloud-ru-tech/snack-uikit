import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'month',
      ...props,
    },
  });

fixture('[calendar] mode=month');

test.page(getPage())('Should select month by click in month mode', async t => {
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(1)); // выбрать второй месяц

  await t.expect(await getCalendarTextSnapshot()).eql({
    items: 'January,[February],March,April,!May,June,July,August,September,October,November,December',
    periodLevelName: '2023',
  });
});

test.page(getPage({ showPeriodPresets: true }))('Presets should not be available', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).visible).ok();
  await t.expect(Selector(dataTestIdSelector(`presets-${TEST_ID}`)).visible).notOk();
});
