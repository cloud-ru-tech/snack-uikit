import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'sun-test';
const SIZE = 'l';

test.describe('Sun', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'sun',
      group: 'loaders',
      props: {
        'data-test-id': TEST_ID,
        size: SIZE,
      },
    });

    const sun = getByTestId(TEST_ID);
    await expect(sun).toBeVisible();
    await expect(sun).toHaveAttribute('data-size', SIZE);
  });
});
