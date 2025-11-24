import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  skeleton: 'skeleton',
  children: 'children',
  skeletonLine: 'skeleton_line',
};

test.describe('SkeletonText', () => {
  test('Show skeleton text', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      story: 'skeleton-text',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: true,
      },
    });
    await expect(getByTestId(TEST_IDS.skeleton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.children)).not.toBeVisible();
  });

  test('Show skeleton children', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      story: 'skeleton-text',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: false,
      },
    });
    await expect(getByTestId(TEST_IDS.skeleton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.children)).toBeVisible();
  });

  test('Show 5 skeleton text lines', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      story: 'skeleton-text',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: true,
        lines: 5,
      },
    });
    await expect(getByTestId(TEST_IDS.skeletonLine)).toHaveCount(5);
  });
});
