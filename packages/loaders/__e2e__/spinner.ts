import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'spinner-test';
const SIZE = 'l';

fixture('Spinner').page(
  getTestcafeUrl({
    name: 'spinner',
    props: {
      'data-test-id': TEST_ID,
      size: SIZE,
    },
    group: 'loaders',
  }),
);

test('Rendered', async t => {
  const spinner = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(spinner.exists).ok();
  await t.expect(spinner.withAttribute('data-size', SIZE).exists).ok();
});
