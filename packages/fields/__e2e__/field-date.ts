import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests, runTestsForOpenableFields } from './utils';

fixture('Field Date');

const TEST_ID = 'field-date-test';
const CALENDAR_TEST_ID = 'field-date__calendar';
const COMPONENT_PREFIX = 'field-date';

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);
const getApplyButton = () => Selector(dataTestIdSelector('apply-button-' + CALENDAR_TEST_ID));

const getDay = () => Selector(dataTestIdSelector('item-' + CALENDAR_TEST_ID));
const getSelectedDay = () => Selector(`${dataTestIdSelector('item-' + CALENDAR_TEST_ID)}[data-is-selected]`);
const getMonthAndYear = () => Selector(dataTestIdSelector('period-level-' + CALENDAR_TEST_ID));

const getHour = () => Selector(`${dataTestIdSelector('hours-' + CALENDAR_TEST_ID)}`);
const getSelectedHour = () => Selector(`${dataTestIdSelector('hours-' + CALENDAR_TEST_ID)}[data-checked]`);

const getMinute = () => Selector(`${dataTestIdSelector('minutes-' + CALENDAR_TEST_ID)}`);
const getSelectedMinute = () => Selector(`${dataTestIdSelector('minutes-' + CALENDAR_TEST_ID)}[data-checked]`);

const getSeconds = () => Selector(`${dataTestIdSelector('seconds-' + CALENDAR_TEST_ID)}`);
const getSelectedSeconds = () => Selector(`${dataTestIdSelector('seconds-' + CALENDAR_TEST_ID)}[data-checked]`);

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
  hasPrefix: false,
  hasPostfix: false,
  hasClearButton: true,
  hasCopyButton: true,
  hasValidationStates: true,
  defaultValue: '1286654640000' /* 10.06.2023 00:04:00 */,
  expectedValue: '10.10.2010',
  valuePropName: 'dateValue',
});

runTestsForOpenableFields(props => visit(props), TEST_ID, {
  iconTestId: 'icon-calendar-xs',
  dropListTestId: CALENDAR_TEST_ID,
});

// format data
test.page(visit({ mode: 'date', dateValue: '' }))("[mode='date'] Should format value correctly", async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '19121987').expect(input.value).eql('19.12.1987');
});

// select data
test.page(visit({ mode: 'date', dateValue: '1686344400000' /* 10.06.2023 */ }))(
  "[mode='date'] Should select value from calendar with mouse",
  async t => {
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
  },
);

test.page(visit({ mode: 'date', dateValue: '1686344400000' /* 10.06.2023 */ }))(
  "[mode='date'] Should select value from calendar with keyboard",
  async t => {
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
    await t.pressKey('down down').pressKey('right').pressKey('enter');
    //select day
    await t.pressKey('down down down').pressKey('right right right').pressKey('enter');

    await t.expect(calendar.exists).notOk('calendar is still present after selection');
    await t.expect(input.value).eql('24.05.2023');
  },
);

// mode = date-time

// format data
test.page(visit({ mode: 'date-time', dateValue: '' }))("[mode='date-time'] Should format value correctly", async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '19121987122025').expect(input.value).eql('19.12.1987, 12:20:25');
});

// select data
test.page(visit({ mode: 'date-time', dateValue: '1686356605000' /* 10.06.2023, 03:23:25 */ }))(
  "[mode='date-time'] Should select value from calendar with mouse",
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const calendar = Selector(dataTestIdSelector(CALENDAR_TEST_ID));

    await t.expect(input.value).eql('10.06.2023, 03:23:25');

    await t.click(input);

    await t.expect(getSelectedDay().textContent).eql('10');
    await t.expect(getMonthAndYear().textContent).eql('June 2023');
    await t.expect(getSelectedHour().textContent).eql('3');
    await t.expect(getSelectedMinute().textContent).eql('23');
    await t.expect(getSelectedSeconds().textContent).eql('25');

    await t.click(getMonthAndYear()).click(getDay().nth(7)).click(getDay().nth(24));
    await t.click(getHour().nth(10)).click(getMinute().nth(11)).click(getSeconds().nth(12)).click(getApplyButton());

    await t.expect(calendar.exists).notOk('calendar is still present after selection');
    await t.expect(input.value).eql('23.08.2023, 10:11:12');
  },
);

test.page(visit({ mode: 'date-time', dateValue: '1686356605000' /* 10.06.2023, 03:23:25 */ }))(
  "[mode='date-time'] Should select value from calendar with keyboard",
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const calendar = Selector(dataTestIdSelector(CALENDAR_TEST_ID));

    await t.expect(input.value).eql('10.06.2023, 03:23:25');

    await t.click(wrapper);

    await t.expect(getSelectedDay().textContent).eql('10');
    await t.expect(getMonthAndYear().textContent).eql('June 2023');
    await t.expect(getSelectedHour().textContent).eql('3');
    await t.expect(getSelectedMinute().textContent).eql('23');
    await t.expect(getSelectedSeconds().textContent).eql('25');

    // open month menu
    await t.pressKey('down').pressKey('enter');
    // select month
    await t.pressKey('down down').pressKey('right').pressKey('enter');
    //select day
    await t.pressKey('down down down').pressKey('right right right').pressKey('enter');

    //select hour
    await t.pressKey('down down down').pressKey('enter');

    //select minute
    await t.pressKey('up up up').pressKey('enter');

    //select minute & apply
    await t.pressKey('up up up').pressKey('enter').pressKey('enter');

    await t.expect(calendar.exists).notOk('calendar is still present after selection');
    await t.expect(input.value).eql('24.05.2023, 06:20:22');
  },
);

// regress test
test.page(visit())('should not toggle droplist by many clicks', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const getCalendar = () => Selector(dataTestIdSelector(CALENDAR_TEST_ID));

  await t.expect(getCalendar().exists).notOk('calendar is present before first click');
  await t.click(wrapper);
  await t.expect(getCalendar().exists).ok('calendar is not present after click');
  await t.click(wrapper);
  await t.expect(getCalendar().exists).ok('calendar was hidden by second click');
});
