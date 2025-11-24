import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'status';
const label = 'Success';

test.describe('Status', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'status',
      name: 'status',
      props: {
        'data-test-id': TEST_ID,
        label,
      },
    });

    const status = getByTestId(TEST_ID);
    await expect(status).toBeVisible();
    await expect(status).toHaveText(label);
  });
});
