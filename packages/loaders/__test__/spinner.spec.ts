import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'spinner-test';
const SIZE = 'l';

test.describe('Spinner', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'spinner',
      group: 'loaders',
      props: {
        'data-test-id': TEST_ID,
        size: SIZE,
      },
    });

    const spinner = getByTestId(TEST_ID);
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveAttribute('data-size', SIZE);
  });
});
