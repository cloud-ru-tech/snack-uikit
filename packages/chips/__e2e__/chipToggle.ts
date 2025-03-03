import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { CHIP_TOGGLE_TEST_IDS } from '../src/constants';
import { runCommonTests } from './utils/commonTests';

const BASE_TEST_ID = 'toggleChip';

const LABEL_TEXT = 'Test text';

const getPage = (props: Record<string, unknown> & { icon?: string } = {}) =>
  getTestcafeUrl({
    name: 'chiptoggle',
    story: 'chip-toggle',
    group: 'chips',
    props: {
      'data-test-id': BASE_TEST_ID,
      ...props,
    },
  });

function getComponent() {
  const chip = Selector(dataTestIdSelector(BASE_TEST_ID));

  return {
    chip,
    input: chip.find(dataTestIdSelector(CHIP_TOGGLE_TEST_IDS.input)),
    label: chip.find(dataTestIdSelector(CHIP_TOGGLE_TEST_IDS.label)).find(dataTestIdSelector('full-text')),
    icon: chip.find(dataTestIdSelector(CHIP_TOGGLE_TEST_IDS.icon)).find('svg'),
    spinner: chip.find(dataTestIdSelector(CHIP_TOGGLE_TEST_IDS.spinner)).find('svg'),
  };
}

fixture('ChipToggle');

test.page(getPage({ label: LABEL_TEXT }))(`should render with label "${LABEL_TEXT}" and click is working`, async t => {
  const { chip, input, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(label.innerText).eql(LABEL_TEXT);

  await t.click(chip);

  await t.expect(input.checked).eql(true);
  await t.expect(chip.hasAttribute('data-checked')).ok();
});

test.page(getPage({ disabled: true }))('should be disabled and click is ignored', async t => {
  const { chip, input } = getComponent();

  await t.expect(input.hasAttribute('disabled')).ok();

  await t.expect(chip.hasAttribute('data-disabled')).ok();

  await t.click(chip);

  await t.expect(input.checked).eql(false);
  await t.expect(chip.hasAttribute('data-checked')).notOk();
});

test.page(getPage({ checked: true }))('should be checked and click should deselect', async t => {
  const { chip, input } = getComponent();

  await t.expect(chip.hasAttribute('data-checked')).ok();
  await t.expect(input.checked).eql(true);

  await t.click(chip);

  await t.expect(input.checked).eql(false);
  await t.expect(chip.hasAttribute('data-checked')).notOk();
});

runCommonTests(getPage, getComponent);
