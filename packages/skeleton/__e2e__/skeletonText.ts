import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('SkeletonText');

const SKELETON_TEST_ID = 'skeleton';
const CHILDREN_TEST_ID = 'children';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'skeleton',
    story: 'skeleton-text',
    props: {
      'data-test-id': SKELETON_TEST_ID,
      ...props,
    },
  });

test.page(getPage({ loading: true }))('Show skeleton text', async t => {
  await t.expect(Selector(dataTestIdSelector(SKELETON_TEST_ID)).exists).ok('skeleton does not exist');
  await t
    .expect(Selector(dataTestIdSelector(CHILDREN_TEST_ID)).exists)
    .notOk('children of skeleton should not be rendered');
});

test.page(getPage({ loading: false }))('Show skeleton children', async t => {
  await t.expect(Selector(dataTestIdSelector(SKELETON_TEST_ID)).exists).notOk('skeleton should not be rendered');
  await t.expect(Selector(dataTestIdSelector(CHILDREN_TEST_ID)).exists).ok('children should be rendered');
});

test.page(getPage({ loading: true, lines: 5 }))('Show 5 skeleton text lines', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`${SKELETON_TEST_ID}_line`)).count)
    .eql(5, 'skeleton should render 5 lines');
});
