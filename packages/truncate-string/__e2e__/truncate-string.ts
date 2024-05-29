import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { VARIANT } from '../src/components/constants';

const TRUNCATE_STRING_TEST_ID = 'truncate-string';
const FULL_TEXT = 'Very long text that should be truncated in the middle';
const TRUNCATED_TEXT = 'Very long text that ...uncated in the middle';

fixture('Truncate string').page(
  getTestcafeUrl({
    name: 'truncate-string',
    props: {
      'data-test-id': TRUNCATE_STRING_TEST_ID,
      text: FULL_TEXT,
      variant: VARIANT.Middle,
    },
  }),
);

test('Text should be cropped in the middle for variant = Variant.Middle', async t => {
  await t
    .expect(
      Selector(dataTestIdSelector(TRUNCATE_STRING_TEST_ID)).find(dataTestIdSelector('truncated-text')).textContent,
    )
    .eql(TRUNCATED_TEXT);
});
