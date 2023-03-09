import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'drop-zone';

fixture('Drop Zone').page(
  getTestcafeUrl({
    name: 'drop-zone',
    props: {
      'data-test-id': TEST_ID,
    },
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
});
