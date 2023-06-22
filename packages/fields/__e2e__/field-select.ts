import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests, runTestsForOpenableFields } from './utils';

fixture('Field Select').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

const TEST_ID = 'field-select-test';
const COMPONENT_PREFIX = 'field-select';
const LIST_TEST_ID = 'field-select__list';

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-select',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

runCommonTests(props => visit(props), TEST_ID, {
  componentPrefix: COMPONENT_PREFIX,
  hasCounter: false,
  hasPlaceholder: true,
  hasPrefixIcon: true,
  hasClearButton: true,
  defaultValue: 'Option 1',
});

runTestsForOpenableFields(props => visit({ ...props, searchable: false }), TEST_ID, {
  dropListTestId: LIST_TEST_ID,
  iconTestId: 'icon-chevron-down-xs',
});

// searchable = false
test.page(visit({ value: '', searchable: false }))("Shouldn't allow to input text when searchable = false", async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, 'Option').expect(input.value).eql('');
});

// open/close & searchable = true
test.page(visit({ value: '', searchable: true }))('Should open list when typing', async t => {
  const list = Selector(dataTestIdSelector(LIST_TEST_ID));

  await t.pressKey('tab');
  await t.expect(list.exists).notOk("list is present although shouldn't");

  await t.pressKey('o');
  await t.expect(list.exists).ok('list is not present after input');
});

// Should select item by mouse

// TODO: access list from keyboard
