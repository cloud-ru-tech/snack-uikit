import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'progress-bar-test';

fixture('ProgressBar').page(
  getTestcafeUrl({
    name: 'progress-bar',
    props: {
      'data-test-id': TEST_ID,
    },
    group: 'loaders',
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
});
