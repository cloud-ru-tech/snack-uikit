import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'divider';

test.describe('Divider', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'divider',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    const divider = getByTestId(TEST_ID);
    await expect(divider).toBeVisible();
  });
});
