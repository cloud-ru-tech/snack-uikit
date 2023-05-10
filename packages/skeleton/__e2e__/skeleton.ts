import { fixture, Selector, test } from 'testcafe';

import { SkeletonProps } from '@snack-ui/skeleton';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Skeleton');

const SKELETON_TEST_ID = 'skeleton';
const CHILDREN_TEST_ID = 'children';

const getPage = (props: Partial<SkeletonProps> = {}) =>
  getTestcafeUrl({
    name: 'skeleton',
    props: {
      'data-test-id': SKELETON_TEST_ID,
      ...props,
    },
  });

test.page(getPage({ loading: true }))('Show skeleton block', async t => {
  await t.expect(Selector(dataTestIdSelector(SKELETON_TEST_ID)).exists).ok('skeleton does not exist');
  await t
    .expect(Selector(dataTestIdSelector(CHILDREN_TEST_ID)).exists)
    .notOk('children of skeleton should not be rendered');
});

test.page(getPage({ loading: false }))('Show skeleton children', async t => {
  await t.expect(Selector(dataTestIdSelector(SKELETON_TEST_ID)).exists).notOk('skeleton should not be rendered');
  await t.expect(Selector(dataTestIdSelector(CHILDREN_TEST_ID)).exists).ok('children should be rendered');
});
