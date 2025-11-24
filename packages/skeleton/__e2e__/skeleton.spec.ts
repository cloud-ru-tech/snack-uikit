import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  skeleton: 'skeleton',
  children: 'children',
};

test.describe('Skeleton', () => {
  test('Show skeleton block', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: true,
      },
    });
    await expect(getByTestId(TEST_IDS.skeleton).first()).toBeAttached();
    await expect(getByTestId(TEST_IDS.children).first()).not.toBeAttached();
  });

  test('Show skeleton children', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'skeleton',
      props: {
        'data-test-id': TEST_IDS.skeleton,
        loading: false,
      },
    });

    await expect(getByTestId(TEST_IDS.skeleton).first()).not.toBeAttached();
    await expect(getByTestId(TEST_IDS.children).first()).toBeAttached();
  });
});
