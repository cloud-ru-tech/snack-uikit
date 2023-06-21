import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests, validateClicks } from './utils/commonTests';

const TEST_IDS = {
  chip: 'assistChip',
  label: 'assist-chip__label',
  icon: 'assist-chip__icon',
  spinner: 'assist-chip__spinner',
};

const LABEL_TEXT = 'Test text';

const getPage = (props: Record<string, unknown> & { icon?: string } = {}) =>
  getTestcafeUrl({
    name: 'assistchip',
    story: 'assist-chip',
    group: 'chips',
    props: {
      'data-test-id': TEST_IDS.chip,
      ...props,
      showClickCounter: true,
    },
  });

function getComponent() {
  const chip = Selector(dataTestIdSelector(TEST_IDS.chip));

  return {
    chip,
    label: chip.find(dataTestIdSelector(TEST_IDS.label)),
    icon: chip.find(dataTestIdSelector(TEST_IDS.icon)).find('svg'),
    spinner: chip.find(dataTestIdSelector(TEST_IDS.spinner)).find('svg'),
  };
}

fixture('AssistChip');

test.page(getPage({ label: LABEL_TEXT }))(`should render with label "${LABEL_TEXT}"`, async t => {
  const { chip, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(label.innerText).eql(LABEL_TEXT);
});

validateClicks(getPage, getComponent);

runCommonTests(getPage, getComponent);
