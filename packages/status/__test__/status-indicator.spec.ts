import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'status-indicator';

test.describe('Status Indicator', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'status',
      name: 'status-indicator',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const statusIndicator = getByTestId(TEST_ID);
    await expect(statusIndicator).toBeVisible();
  });
});
