import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonField, getButtonFieldList, getInput, runCommonTests } from './utils';

fixture('Field Text');

const TEST_ID = 'field-text-test';
const COMPONENT_PREFIX = 'field-text';

const wrapper = Selector(dataTestIdSelector(TEST_ID));

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-text',
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
  hasPrefix: true,
  hasPostfix: true,
  hasClearButton: true,
  hasCopyButton: true,
  hasValidationStates: true,
});

test.page(visit({ buttonContent: 'DaySVG', prefixIcon: 'PlaceholderSVG', buttonVariant: 'before' }))(
  'Should show prefix button',
  async t => {
    const buttonField = getButtonField(wrapper);

    await t.expect(buttonField.exists).ok('button field is not present');
    await t
      .expect(wrapper.find(dataTestIdSelector('icon-placeholder-xs')).exists)
      .notOk("prefix icon is present although shouldn't");
  },
);

test.page(visit({ buttonContent: 'DaySVG', prefixIcon: 'PlaceholderSVG', buttonVariant: 'after' }))(
  'Should show postfix button',
  async t => {
    const buttonField = getButtonField(wrapper);

    await t.expect(buttonField.exists).ok('button field is not present');
    await t
      .expect(wrapper.find(dataTestIdSelector('icon-placeholder-xs')).exists)
      .notOk("prefix icon is present although shouldn't");
  },
);

test.page(
  visit({
    buttonContent: 'DaySVG',
    prefixIcon: 'PlaceholderSVG',
    buttonVariant: 'before',
    showButtonItems: true,
  }),
)('Should show button field list', async t => {
  const buttonField = getButtonField(wrapper);
  const buttonFieldList = getButtonFieldList();

  await t.expect(buttonField.exists).ok('button field is not present');
  await t
    .expect(buttonField.find(dataTestIdSelector('icon-chevron-down-xs')).exists)
    .ok('button chevron is not present');

  await t.click(buttonField);

  await t.expect(buttonFieldList.exists).ok('button field list is not present');

  await t.click(buttonFieldList.find(dataTestIdSelector('list__base-item_1')));

  await t.expect(buttonFieldList.exists).notOk("button field list is present although shouldn't");
  await t.expect(Selector(dataTestIdSelector('toast-user-action__icon')).exists).ok('toaster is not present');
});

test.page(
  visit({
    buttonContent: 'DaySVG',
    prefixIcon: 'PlaceholderSVG',
    buttonVariant: 'before',
    showButtonItems: true,
  }),
)('Should navigate to button field via keyboard', async t => {
  await t.expect(wrapper.visible).ok('field is not present');

  await t.pressKey('tab').pressKey('down');

  const buttonFieldList = getButtonFieldList();

  await t.expect(buttonFieldList.exists).ok('button field list is not present');

  await t.pressKey('up').pressKey('up').pressKey('tab').pressKey('a');

  await t.expect(buttonFieldList.exists).notOk("button field list is present although shouldn't");
  await t.expect(getInput(wrapper, COMPONENT_PREFIX).value).eql('a');
});
