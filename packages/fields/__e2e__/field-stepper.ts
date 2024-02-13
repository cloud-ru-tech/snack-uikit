import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests } from './utils';

fixture('Field Stepper');

const TEST_ID = 'field-stepper-test';
const COMPONENT_PREFIX = 'field-stepper';
const MINUS_BUTTON_TEST_ID = 'field-stepper__minus-button';
const PLUS_BUTTON_TEST_ID = 'field-stepper__plus-button';
const LIMIT_TOOLTIP_TEST_ID = 'field-stepper__limit-tooltip';
const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-stepper',
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
  hasClearButton: false,
  hasCopyButton: false,
  hasValidationStates: true,
  emptyValue: '0',
});

test.page(visit({ value: 6 }))('Should not accept letters', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.click(input).pressKey('ctrl+a').pressKey('a');

  await t.expect(input.value).eql('0');
});

test.page(visit({ value: 4, step: 2, min: 0, max: 6 }))('Should increase/decrease by buttons', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const minusButton = Selector(dataTestIdSelector(MINUS_BUTTON_TEST_ID));
  const plusButton = Selector(dataTestIdSelector(PLUS_BUTTON_TEST_ID));

  await t.click(minusButton).expect(input.value).eql('2');
  await t.click(plusButton).expect(input.value).eql('4');

  // min
  await t.click(minusButton).click(minusButton).click(minusButton).expect(input.value).eql('0');

  // max
  await t.click(plusButton).click(plusButton).click(plusButton).click(plusButton).expect(input.value).eql('6');
});

test.page(visit({ value: 4, step: 2, min: 0, max: 6 }))('Should increase/decrease from keyboard', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.pressKey('tab').pressKey('left').pressKey('enter').expect(input.value).eql('2');
  await t.pressKey('right').pressKey('right').pressKey('enter').expect(input.value).eql('4');

  // min
  await t
    .pressKey('left')
    .pressKey('left')
    .pressKey('enter')
    .pressKey('enter')
    .pressKey('enter')
    .expect(input.value)
    .eql('0');

  // max
  await t
    .pressKey('right')
    .pressKey('enter')
    .pressKey('enter')
    .pressKey('enter')
    .pressKey('enter')
    .expect(input.value)
    .eql('6');
});

test.page(visit({ value: 6, disabled: true }))('Should not click buttons in disabled state', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const minusButton = Selector(dataTestIdSelector(MINUS_BUTTON_TEST_ID));
  const plusButton = Selector(dataTestIdSelector(PLUS_BUTTON_TEST_ID));

  await t.click(minusButton).expect(input.value).eql('6');
  await t.click(plusButton).expect(input.value).eql('6');
});

test.page(visit({ value: 6, readonly: true }))('Should not click buttons in readonly state', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const minusButton = Selector(dataTestIdSelector(MINUS_BUTTON_TEST_ID));
  const plusButton = Selector(dataTestIdSelector(PLUS_BUTTON_TEST_ID));

  await t.click(minusButton).expect(input.value).eql('6');
  await t.click(plusButton).expect(input.value).eql('6');
});

test.page(visit({ value: 8, min: 5, max: 15, allowMoreThanLimits: true }))('Can enter value out of limits', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.click(input).typeText(input, '0').click(Selector('body')).expect(input.value).eql('80');

  await t.click(input).pressKey('ctrl+a').typeText(input, '1').click(Selector('body')).expect(input.value).eql('1');
});

test.page(visit({ value: 8, min: 5, max: 15, allowMoreThanLimits: false }))(
  'Should not enter value out of limits if not allowed',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);

    await t.click(input).typeText(input, '0').click(Selector('body'));

    await t
      .expect(input.value)
      .eql('15')
      .expect(Selector(dataTestIdSelector(LIMIT_TOOLTIP_TEST_ID)).textContent)
      .eql('Value should be less or equal 15');

    await t.click(input).pressKey('ctrl+a').typeText(input, '1').click(Selector('body'));

    await t
      .expect(input.value)
      .eql('5')
      .expect(Selector(dataTestIdSelector(LIMIT_TOOLTIP_TEST_ID)).textContent)
      .eql('Value should be greater or equal 5');
  },
);
