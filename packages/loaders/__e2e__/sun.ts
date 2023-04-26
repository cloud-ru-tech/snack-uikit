import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'sun-test';
const SIZE = 'l';

fixture('Sun').page(
  getTestcafeUrl({
    name: 'sun',
    props: {
      'data-test-id': TEST_ID,
      size: SIZE,
    },
    group: 'loaders',
  }),
);

test('Rendered', async t => {
  const sun = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(sun.exists).ok();
  await t.expect(sun.withAttribute('data-size', SIZE).exists).ok();
});
