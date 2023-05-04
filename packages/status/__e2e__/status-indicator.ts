import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'status-indicator';

fixture('Status Indicator').page(
  getTestcafeUrl({
    group: 'status',
    name: 'status-indicator',
    props: {
      'data-test-id': TEST_ID,
    },
  }),
);

test('Rendered', async t => {
  const statusIndicator = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(statusIndicator.exists).ok();
});
