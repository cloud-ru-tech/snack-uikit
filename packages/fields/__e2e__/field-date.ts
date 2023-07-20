import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests, runTestsForOpenableFields } from './utils';

fixture('Field Date').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

const TEST_ID = 'field-date-test';
const CALENDAR_TEST_ID = 'field-date__calendar';
const COMPONENT_PREFIX = 'field-date';

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);
const getDay = () => Selector(dataTestIdSelector('item-' + CALENDAR_TEST_ID));
const getSelectedDay = () => Selector(`${dataTestIdSelector('item-' + CALENDAR_TEST_ID)}[data-is-selected]`);
const getMonthAndYear = () => Selector(dataTestIdSelector('period-level-' + CALENDAR_TEST_ID));

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-date',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

runCommonTests(props => visit(props), TEST_ID, {
  componentPrefix: COMPONENT_PREFIX,
  hasCounter: false,
  hasPlaceholder: false,
  hasPrefixIcon: false,
  hasClearButton: true,
  defaultValue: '10-10-2010',
  expectedValue: '10.10.2010',
});

runTestsForOpenableFields(props => visit(props), TEST_ID, {
  iconTestId: 'icon-calendar-xs',
  dropListTestId: CALENDAR_TEST_ID,
});

// format data
test.page(visit({ value: '' }))('Should format value correctly', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '19121987').expect(input.value).eql('19.12.1987');
});

// select data
test.page(visit({ value: '10-06-2023' }))('Should select value from calendar with mouse', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const calendar = Selector(dataTestIdSelector(CALENDAR_TEST_ID));

  await t.expect(input.value).eql('10.06.2023');

  await t.click(input);

  await t.expect(getSelectedDay().textContent).eql('10');
  await t.expect(getMonthAndYear().textContent).eql('June 2023');

  await t.click(getMonthAndYear()).click(getDay().nth(7)).click(getDay().nth(24));

  await t.expect(calendar.exists).notOk('calendar is still present after selection');
  await t.expect(input.value).eql('23.08.2023');
});

test.page(visit({ value: '10-06-2023' }))('Should select value from calendar with keyboard', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const calendar = Selector(dataTestIdSelector(CALENDAR_TEST_ID));

  await t.expect(input.value).eql('10.06.2023');

  await t.click(wrapper);
  // await t.pressKey('tab').pressKey('space');

  await t.expect(getSelectedDay().textContent).eql('10');
  await t.expect(getMonthAndYear().textContent).eql('June 2023');

  // open month menu
  await t.pressKey('down').pressKey('enter');
  // select month
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('right').pressKey('enter');
  //select day
  await t
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('right')
    .pressKey('right')
    .pressKey('right')
    .pressKey('enter');

  await t.expect(calendar.exists).notOk('calendar is still present after selection');
  await t.expect(input.value).eql('23.08.2023');
});

test.page(visit())('should not toggle droplist by many clicks', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const getCalendar = () => Selector(dataTestIdSelector(CALENDAR_TEST_ID));

  await t.expect(getCalendar().exists).notOk('calendar is present before first click');
  await t.click(wrapper);
  await t.expect(getCalendar().exists).ok('calendar is not present after click');
  await t.click(wrapper);
  await t.expect(getCalendar().exists).ok('calendar was hidden by second click');
});
