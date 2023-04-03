import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Family, Role, Size, Tag } from '../src/components/contants';

const TEST_ID = 'typography';
const family = Family.CrossedOut;
const role = Role.Label;
const size = Size.M;
const tag = Tag.h3;

fixture('Typography').page(
  getTestcafeUrl({
    name: 'typography',
    props: { family, role, size, tag, 'data-test-id': TEST_ID },
  }),
);

test('Rendered', async t => {
  const element = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(element.exists).ok();
  await t.expect(element.getAttribute('data-family')).eql(family);
  await t.expect(element.getAttribute('data-role')).eql(role);
  await t.expect(element.getAttribute('data-size')).eql(size);
  await t.expect(element.tagName).eql(tag);
});
