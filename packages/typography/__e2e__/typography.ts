import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { FAMILY, PURPOSE, SIZE, TAG } from '../src/components/constants';

const TEST_ID = 'typography';
const family = FAMILY.CrossedOut;
const purpose = PURPOSE.Label;
const size = SIZE.M;
const tag = TAG.h3;

fixture('Typography').page(
  getTestcafeUrl({
    name: 'typography',
    props: { family, purpose, size, tag, 'data-test-id': TEST_ID },
  }),
);

test('Rendered', async t => {
  const element = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(element.exists).ok();
  await t.expect(element.getAttribute('data-family')).eql(family);
  await t.expect(element.getAttribute('data-purpose')).eql(purpose);
  await t.expect(element.getAttribute('data-size')).eql(size);
  await t.expect(element.tagName).eql(tag);
});
