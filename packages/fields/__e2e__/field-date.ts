import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getInput, runCommonTests, runTestsForOpenableFields } from './utils';

fixture('Field Date').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

const TEST_ID = 'field-date-test';
const COMPONENT_PREFIX = 'field-date';
const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

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
  defaultValue: '10102010',
  expectedValue: '10.10.2010',
});

runTestsForOpenableFields(props => visit(props), TEST_ID, {
  iconTestId: 'icon-calendar-xs',
  dropListTestId: 'field-date__calendar',
});

// format data
test.page(visit({ value: '' }))('Should format value correctly', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, '11111111').expect(input.value).eql('11.11.1111');
});

// TODO: access calendar from keyboard
