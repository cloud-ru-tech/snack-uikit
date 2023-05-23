import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'divider';

fixture('Divider').page(
  getTestcafeUrl({
    name: 'divider',
    props: {
      'data-test-id': TEST_ID,
    },
  }),
);

test('Rendered', async t => {
  const divider = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(divider.exists).ok();
});
