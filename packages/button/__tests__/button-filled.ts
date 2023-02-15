import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'button-filled';

fixture('ButtonFilled').page(
  getTestcafeUrl({
    name: 'buttonfilled',
    story: 'button-filled',
    props: {
      dataTestId: TEST_ID,
    },
    group: 'button',
    category: 'not-stable',
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
});
