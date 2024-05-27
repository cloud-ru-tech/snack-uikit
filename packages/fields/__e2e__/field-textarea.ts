import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests } from './utils';

fixture('Field TextArea').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

const TEST_ID = 'field-textarea-test';
const COMPONENT_PREFIX = 'field-textarea';
const RESIZER = '.os-scrollbar-corner-resize';

const getScrollArea = (wrapper: Selector) => wrapper.find(dataTestIdSelector('field-textarea__scroll-area'));

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-text-area',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

runCommonTests(props => visit(props), TEST_ID, {
  componentPrefix: COMPONENT_PREFIX,
  hasCounter: true,
  hasPlaceholder: true,
  hasPrefixIcon: false,
  hasClearButton: true,
  hasValidationStates: true,
  hasCopyButton: true,
});

// maxRows
test.page(visit({ value: '', maxRows: 4 }))("Shouldn't get bigger than maxRows param", async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '1\n2\n3\n4');

  const height1 = await getScrollArea(wrapper).offsetHeight;
  await t.expect(input.offsetHeight).lt(height1);

  await t.typeText(input, '\n5');

  const height2 = await getScrollArea(wrapper).offsetHeight;
  await t.expect(input.offsetHeight).gt(height2);
});

// TODO: TestCafe cannot interact with the <div data-overlayscrollbars-contents=""
// resizable
// eslint-disable-next-line testcafe-community/no-disabled-tests
test.skip.page(visit({ value: '', resizable: true }))('Should be resizable', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '1\n2\n3\n4\n5\n6');

  const height1 = await getScrollArea(wrapper).offsetHeight;
  await t.expect(input.offsetHeight).gt(height1);

  await t.drag(Selector(RESIZER), 0, 100);

  const height2 = await getScrollArea(wrapper).offsetHeight;
  await t.expect(input.offsetHeight).lt(height2);
});

// readonly & resizable
// eslint-disable-next-line testcafe-community/no-disabled-tests
test.skip.page(visit({ resizable: true, readonly: true }))('Should not be resizable when readonly = true', async t => {
  await t.expect(Selector(RESIZER).exists).notOk("resizer is present although shouldn't");
});

// disabled & resizable
// eslint-disable-next-line testcafe-community/no-disabled-tests
test.skip.page(visit({ resizable: true, disabled: true }))('Should not be resizable when disabled = true', async t => {
  await t.expect(Selector(RESIZER).exists).notOk("resizer is present although shouldn't");
});
