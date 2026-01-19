import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'promo-tag';

test.describe('PromoTag', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promo-tag',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(TEST_ID).first()).toBeVisible();
  });

  test('Should has children text', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promo-tag',
      props: {
        'data-test-id': TEST_ID,
        text: 'Super promo tag',
      },
    });
    await expect(getByTestId(TEST_ID).first()).toHaveText('Super promo tag');
  });

  test('Should has before node', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promo-tag',
      props: {
        'data-test-id': TEST_ID,
        showBefore: true,
        size: 'xs',
      },
    });
    await expect(getByTestId('before-node').first()).toBeVisible();
  });

  test('Should has after node', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promo-tag',
      props: {
        'data-test-id': TEST_ID,
        showAfter: true,
        size: 'xs',
      },
    });
    await expect(getByTestId('after-node').first()).toBeVisible();
  });
});
