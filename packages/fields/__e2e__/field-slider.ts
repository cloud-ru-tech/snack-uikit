import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests } from './utils';

fixture('Field Slider');

const TEST_ID = 'field-slider-test';
const COMPONENT_PREFIX = 'field-slider';

const DATA_ATTRIBUTES = {
  handle: {
    valueMin: 'aria-valuemin',
    valueMax: 'aria-valuemax',
    value: 'aria-valuenow',
    disabled: 'aria-disabled',
  },
};

type AttributesRecord = Record<string, string>;

const getAttributes = <T extends AttributesRecord>(
  element: Selector,
  attributesRecord: T,
): Record<keyof T, Promise<string | null>> =>
  Object.entries(attributesRecord).reduce(
    (accAttributesObj, [key, value]) => ({
      ...accAttributesObj,
      [key]: element.getAttribute(value),
    }),
    {} as Record<keyof T, Promise<string | null>>,
  );

const selectors = {
  getSliderHandle: (handle: Selector) => ({
    handle,
    ...getAttributes<typeof DATA_ATTRIBUTES.handle>(handle, DATA_ATTRIBUTES.handle),
  }),
};

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

const getSliderSingleModeHandle = (wrapper: Selector) => wrapper.find('.rc-slider-handle');
const getSliderMarks = (wrapper: Selector) => wrapper.find('.rc-slider-mark');

const getSliderRangeMinHandle = (wrapper: Selector) => wrapper.find('.rc-slider-handle-1');
const getSliderRangeMaxHandle = (wrapper: Selector) => wrapper.find('.rc-slider-handle-2');

const DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE = 15;

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-slider',
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
  hasValidationStates: false,
  emptyValue: '10',
});

test.page(visit({ value: 20 }))('Should not accept letters', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.click(input).pressKey('a').pressKey('Enter');

  await t.expect(input.value).eql('20');
});

test.page(visit({ value: 20, step: 1, moveByMarks: false }))(
  'Should allow changing value by editing text input field. Slider handle will not be affected unless "Enter" is clicked or outside click happens. Should support changing value by dragging slider handle',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const sliderHandle = selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await t.expect(sliderHandle.value).eql('20');

    await t.click(input).pressKey('backspace').pressKey('backspace').typeText(input, '40');

    await t.expect(sliderHandle.value).eql('20');
    await t.expect(input.value).eql('40').pressKey('Enter');
    await t.expect(sliderHandle.value).eql('40');

    await t.click(input).pressKey('backspace').pressKey('backspace').typeText(input, '30');

    await t.expect(sliderHandle.value).eql('40');
    await t.expect(input.value).eql('30');

    await t.click(Selector(dataTestIdSelector('field-decorator__hint'))); // Click somewhere outside input field to trigger the onBlur event
    await t.expect(sliderHandle.value).eql('30');

    await t.drag(sliderHandle.handle, DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, 0);
    await t.expect(input.value).eql('33');
    await t.expect(sliderHandle.value).eql('33');
  },
);

test.page(visit({ value: 20, step: 5, moveByMarks: false }))(
  'Should correct text input field value to closest valid value in case step does not equal 1. Should support only values separated by provided step when slider handle is dragged',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const sliderHandle = selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await t.expect(sliderHandle.value).eql('20');

    await t.click(input).pressKey('backspace').typeText(input, '4');

    await t.expect(sliderHandle.value).eql('20');
    await t.expect(input.value).eql('24').pressKey('Enter').expect(input.value).eql('25');
    await t.expect(sliderHandle.value).eql('25');

    await t.drag(sliderHandle.handle, DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, 0);
    await t.expect(input.value).eql('30');
    await t.expect(sliderHandle.value).eql('30');
  },
);

test.page(visit({ value: 20, min: 10, max: 50, moveByMarks: false }))(
  'Should correct text input field value to lowest minimum in case entered value is lower than minimum. Should also correct text input field value to highest maximum in case entered value is higher than maximum. Should support min and max values only when is dragged over the slider track limits',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const sliderHandle = selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await t.expect(sliderHandle.value).eql('20');

    await t.click(input).pressKey('backspace').pressKey('backspace').typeText(input, '1');

    await t.expect(sliderHandle.value).eql('20');
    await t.expect(input.value).eql('1').pressKey('Enter');

    await t.expect(input.value).eql('10');
    await t.expect(sliderHandle.value).eql('10');

    await t.click(input).pressKey('backspace').pressKey('backspace').typeText(input, '60');

    await t.expect(sliderHandle.value).eql('10');
    await t.expect(input.value).eql('60').pressKey('Enter');

    await t.expect(input.value).eql('50');
    await t.expect(sliderHandle.value).eql('50');

    await t.drag(sliderHandle.handle, -500, 0);
    await t.expect(input.value).eql('10');
    await t.expect(sliderHandle.value).eql('10');

    await t.drag(sliderHandle.handle, 500, 0);
    await t.expect(input.value).eql('50');
    await t.expect(sliderHandle.value).eql('50');
  },
);

test.page(visit({ value: 20, step: 1, moveByMarks: true }))(
  'Should automatically change value to closest mark if change value only by marks prop is enabled. Should support only marks when slider handle is dragged',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const sliderHandle = selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await t.expect(sliderHandle.value).eql('20');

    await t.click(input).pressKey('backspace').pressKey('backspace').typeText(input, '28');
    await t.expect(sliderHandle.value).eql('20');

    await t.expect(input.value).eql('28').pressKey('Enter').expect(input.value).eql('30');
    await t.expect(sliderHandle.value).eql('30');

    await t.drag(sliderHandle.handle, 50, 0);
    await t.expect(input.value).eql('40');
    await t.expect(sliderHandle.value).eql('40');
  },
);

test.page(visit({ value: 20, step: 1, showScaleBar: false }))(
  'Should not display scale bar in case it is turned off. Should still allow changing value by text input or dragging slider handle',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const marks = getSliderMarks(wrapper);
    const sliderHandle = selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await t.expect(marks.exists).notOk();

    await t.expect(sliderHandle.value).eql('20');

    await t.click(input).pressKey('backspace').pressKey('backspace').typeText(input, '21');
    await t.expect(sliderHandle.value).eql('20');

    await t.expect(input.value).eql('21').pressKey('Enter').expect(input.value).eql('21');
    await t.expect(sliderHandle.value).eql('21');

    await t.drag(sliderHandle.handle, 20, 0);
    await t.expect(input.value).eql('24');
    await t.expect(sliderHandle.value).eql('24');

    await t.drag(sliderHandle.handle, -500, 0);
    await t.expect(input.value).eql('10');
    await t.expect(sliderHandle.value).eql('10');

    await t.drag(sliderHandle.handle, 500, 0);
    await t.expect(input.value).eql('50');
    await t.expect(sliderHandle.value).eql('50');
  },
);

test.page(visit({ value: 10, storyMarks: 'non-linear' }))('Should support non-linear marks', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const sliderHandle = selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

  await t.expect(input.value).eql('1gb');
  await t.expect(sliderHandle.value).eql('10');

  await t.drag(sliderHandle.handle, 50, 0);
  await t.expect(input.value).eql('2gb');
  await t.expect(sliderHandle.value).eql('20');

  await t.drag(sliderHandle.handle, 100, 0);
  await t.expect(input.value).eql('4gb');
  await t.expect(sliderHandle.value).eql('30');

  await t.drag(sliderHandle.handle, 200, 0);
  await t.expect(input.value).eql('16gb');
  await t.expect(sliderHandle.value).eql('50');

  await t.click(input).pressKey('ctrl+a').pressKey('4').pressKey('Enter');
  await t.expect(input.value).eql('4gb');
  await t.expect(sliderHandle.value).eql('30');

  await t.click(input).pressKey('ctrl+a').pressKey('7').pressKey('Enter');
  await t.expect(input.value).eql('4gb');
  await t.expect(sliderHandle.value).eql('30');
});

test.page(visit({ value: [10, 30], step: 1, range: true, moveByMarks: false }))(
  'Should not allow changing value by editing text input field in range mode. Should support changing values only by dragging slider handles',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const sliderMinHandle = selectors.getSliderHandle(getSliderRangeMinHandle(wrapper));
    const sliderMaxHandle = selectors.getSliderHandle(getSliderRangeMaxHandle(wrapper));

    await t.expect(sliderMinHandle.value).eql('10');
    await t.expect(sliderMaxHandle.value).eql('30');

    await t.expect(input.value).eql('10 – 30');
    await t.expect(input.getAttribute('readonly')).eql('');

    await t.drag(sliderMaxHandle.handle, DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, 0);
    await t.expect(sliderMaxHandle.value).eql('33');
    await t.expect(input.value).eql('10 – 33');

    await t.drag(sliderMinHandle.handle, DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, 0);
    await t.expect(sliderMinHandle.value).eql('13');
    await t.expect(input.value).eql('13 – 33');
  },
);
