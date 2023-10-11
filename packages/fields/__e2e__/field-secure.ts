import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonHideValue, getInput, runCommonTests } from './utils';

fixture('Field Secure').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

const TEST_ID = 'field-secure-test';
const COMPONENT_PREFIX = 'field-secure';
const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-secure',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

runCommonTests(props => visit(props), TEST_ID, {
  componentPrefix: COMPONENT_PREFIX,
  hasCounter: true,
  hasPlaceholder: true,
  hasPrefixIcon: true,
  hasClearButton: false,
});

// hide button
test.page(visit({ value: 'Test value' }))('Should toggle value visibility by clicking the button', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const hideButton = getButtonHideValue(wrapper);

  await t.expect(input.getAttribute('type')).eql('password');

  await t.click(hideButton);

  await t.expect(input.getAttribute('type')).eql('text');

  await t.click(hideButton);

  await t.expect(input.getAttribute('type')).eql('password');
});

// hide with keyboard
test.page(visit({ value: 'Test value' }))('Should toggle value visibility with keyboard', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.expect(input.getAttribute('type')).eql('password');

  await t.pressKey('tab').pressKey('right').pressKey('right').pressKey('enter');
  await t.expect(input.getAttribute('type')).eql('text');
  await t.pressKey('right').pressKey('enter');
  await t.expect(input.getAttribute('type')).eql('password');

  // not working in FF
  if (t.browser.name === 'Chrome') {
    await t.pressKey('right').pressKey('space');
    await t.expect(input.getAttribute('type')).eql('text');
    await t.pressKey('right').pressKey('space');
    await t.expect(input.getAttribute('type')).eql('password');
  }
});
