import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { CHIP_ASSIST_TEST_IDS } from '../src/constants';
import { runCommonTests, validateClicks } from './utils/commonTests';

const BASE_TEST_ID = 'chipAssist';

const LABEL_TEXT = 'Test text';

const getPage = (props: Record<string, unknown> & { icon?: string } = {}) =>
  getTestcafeUrl({
    name: 'chipassist',
    story: 'chip-assist',
    group: 'chips',
    props: {
      'data-test-id': BASE_TEST_ID,
      ...props,
      showClickCounter: true,
    },
  });

function getComponent() {
  const chip = Selector(dataTestIdSelector(BASE_TEST_ID));

  return {
    chip,
    label: chip.find(dataTestIdSelector(CHIP_ASSIST_TEST_IDS.label)),
    icon: chip.find(dataTestIdSelector(CHIP_ASSIST_TEST_IDS.icon)).find('svg'),
    spinner: chip.find(dataTestIdSelector(CHIP_ASSIST_TEST_IDS.spinner)).find('svg'),
  };
}

fixture('ChipAssist');

test.page(getPage({ label: LABEL_TEXT }))(`should render with label "${LABEL_TEXT}"`, async t => {
  const { chip, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(label.innerText).eql(LABEL_TEXT);
});

validateClicks(getPage, getComponent);

runCommonTests(getPage, getComponent);
