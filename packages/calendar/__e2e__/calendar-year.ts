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
      mode: 'year',
      ...props,
    },
  });

fixture('[calendar] mode=year');

test.page(getPage())('Should select year by click in year mode', async t => {
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(1)); // выбрать 2020 год

  await t.expect(await getCalendarTextSnapshot()).eql({
    items: '2019,[2020],2021,2022,!2023,2024,2025,2026,2027,2028,2029,2030',
    periodLevelName: '2020-2029',
  });
});

test.page(getPage({ showPeriodPresets: true }))('Presets should not be available', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).visible).ok();
  await t.expect(Selector(dataTestIdSelector(`presets-${TEST_ID}`)).visible).notOk();
});
