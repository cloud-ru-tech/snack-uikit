import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  skeleton: 'skeleton',
  children: 'children',
};

test.describe('SkeletonContext', () => {
  test('Show skeletons', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      story: 'with-skeleton',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: true,
      },
    });
    await expect(getByTestId(TEST_IDS.skeleton).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.children).first()).not.toBeVisible();
  });

  test('Show skeletons children', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      story: 'with-skeleton',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: false,
      },
    });
    await expect(getByTestId(TEST_IDS.skeleton).first()).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.children).first()).toBeVisible();
  });
});
