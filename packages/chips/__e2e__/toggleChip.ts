import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils/commonTests';

const TEST_IDS = {
  chip: 'toggleChip',
  input: 'toggle-chip__input',
  label: 'toggle-chip__label',
  icon: 'toggle-chip__icon',
  spinner: 'toggle-chip__spinner',
};

const LABEL_TEXT = 'Test text';

const getPage = (props: Record<string, unknown> & { icon?: string } = {}) =>
  getTestcafeUrl({
    name: 'togglechip',
    story: 'toggle-chip',
    group: 'chips',
    props: {
      'data-test-id': TEST_IDS.chip,
      ...props,
    },
  });

function getComponent() {
  const chip = Selector(dataTestIdSelector(TEST_IDS.chip));

  return {
    chip,
    input: chip.find(dataTestIdSelector(TEST_IDS.input)),
    label: chip.find(dataTestIdSelector(TEST_IDS.label)),
    icon: chip.find(dataTestIdSelector(TEST_IDS.icon)).find('svg'),
    spinner: chip.find(dataTestIdSelector(TEST_IDS.spinner)).find('svg'),
  };
}

fixture('ToggleChip');

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
