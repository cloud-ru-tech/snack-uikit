import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests, runTestsForOpenableFields } from './utils';

fixture('Field Time');

const TEST_ID = 'field-time-test';
const TIMEPICKER_TEST_ID = 'field-time__timepicker';
const COMPONENT_PREFIX = 'field-time';

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);
const getApplyButton = () => Selector(dataTestIdSelector('apply-button-' + TIMEPICKER_TEST_ID));

const getHour = () => Selector(`${dataTestIdSelector('hours-' + TIMEPICKER_TEST_ID)}`);
const getSelectedHour = () => Selector(`${dataTestIdSelector('hours-' + TIMEPICKER_TEST_ID)}[data-checked]`);

const getMinute = () => Selector(`${dataTestIdSelector('minutes-' + TIMEPICKER_TEST_ID)}`);
const getSelectedMinute = () => Selector(`${dataTestIdSelector('minutes-' + TIMEPICKER_TEST_ID)}[data-checked]`);

const getSeconds = () => Selector(`${dataTestIdSelector('seconds-' + TIMEPICKER_TEST_ID)}`);
const getSelectedSeconds = () => Selector(`${dataTestIdSelector('seconds-' + TIMEPICKER_TEST_ID)}[data-checked]`);

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-time',
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
  defaultValue: '02' /* 10.06.2023 */,
  expectedValue: '02:00:00',
  valuePropName: 'valueHours',
});

runTestsForOpenableFields(props => visit(props), TEST_ID, {
  iconTestId: 'icon-watch-xs',
  dropListTestId: TIMEPICKER_TEST_ID,
});

// format data
test.page(visit())('Should format value correctly', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '555555').expect(input.value).eql('05:55:05');
});

test.page(visit({ showSeconds: false }))('Should format value correctly, showSeconds=false', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '5555').expect(input.value).eql('05:05');
});

// select data
test.page(visit({ valueHours: 4, valueMinutes: 5, valueSeconds: 6 }))(
  'Should select value from timepicker with mouse',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const timepicker = Selector(dataTestIdSelector(TIMEPICKER_TEST_ID));

    await t.expect(input.value).eql('04:05:06');

    await t.click(input);

    await t.expect(getSelectedHour().textContent).eql('04');
    await t.expect(getSelectedMinute().textContent).eql('05');
    await t.expect(getSelectedSeconds().textContent).eql('06');

    await t.click(getHour().nth(10)).click(getMinute().nth(11)).click(getSeconds().nth(12)).click(getApplyButton());

    await t.expect(timepicker.exists).notOk('timepicker is still present after selection');
    await t.expect(input.value).eql('10:11:12');
  },
);

test.page(visit({ valueHours: 4, valueMinutes: 5, valueSeconds: 6 }))(
  'Should select value from timepicker with keyboard',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const timepicker = Selector(dataTestIdSelector(TIMEPICKER_TEST_ID));

    await t.expect(input.value).eql('04:05:06');

    await t.click(wrapper);

    await t.expect(getSelectedHour().textContent).eql('04');
    await t.expect(getSelectedMinute().textContent).eql('05');
    await t.expect(getSelectedSeconds().textContent).eql('06');

    // open menu & select hours
    await t.pressKey('down down down down').pressKey('enter');

    // select minutes
    await t.pressKey('down down down').pressKey('enter');

    // select seconds & apply
    await t.pressKey('down down down').pressKey('enter').pressKey('enter');

    await t.expect(timepicker.exists).notOk('timepicker is still present after selection');
    await t.expect(input.value).eql('07:08:09');
  },
);

test.page(visit())('should not toggle droplist by many clicks', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const getTimepicker = () => Selector(dataTestIdSelector(TIMEPICKER_TEST_ID));

  await t.expect(getTimepicker().exists).notOk('timepicker is present before first click');
  await t.click(wrapper);
  await t.expect(getTimepicker().exists).ok('timepicker is not present after click');
  await t.click(wrapper);
  await t.expect(getTimepicker().exists).ok('timepicker was hidden by second click');
});
