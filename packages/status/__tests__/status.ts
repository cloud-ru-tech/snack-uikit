import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'status';
const label = 'Success';

fixture('Status').page(
  getTestcafeUrl({
    group: 'status',
    name: 'status',
    props: {
      'data-test-id': TEST_ID,
      label,
    },
  }),
);

test('Rendered', async t => {
  const status = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(status.exists).ok();
  await t.expect(status.textContent).eql(label);
});
