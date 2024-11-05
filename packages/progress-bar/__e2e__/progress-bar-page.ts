import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const PROGRESS_TEST_ID = 'progress-bar-page-test';
const START_BUTTON_TEST_ID = 'start-button-test';
const STOP_BUTTON_TEST_ID = 'stop-button-test';

fixture('ProgressBarPage').page(
  getTestcafeUrl({
    name: 'progress-bar-page',
    props: {
      'data-test-id': PROGRESS_TEST_ID,
    },
    group: 'progress-bar',
  }),
);

test('Rendered', async t => {
  const startButton = Selector(dataTestIdSelector(START_BUTTON_TEST_ID));
  const stopButton = Selector(dataTestIdSelector(STOP_BUTTON_TEST_ID));

  await t.click(startButton);
  await t.expect(Selector(dataTestIdSelector(PROGRESS_TEST_ID)).exists).ok();
  await t.click(stopButton);
  await t.expect(Selector(dataTestIdSelector(PROGRESS_TEST_ID)).exists).notOk();
});
