import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'drop-zone';

test.describe('Drop Zone', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'drop-zone',
      story: 'drop-zone',
      group: 'drop-zone',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId('description')).toBeVisible();
  });

  test('Rendered without description', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'drop-zone',
      story: 'drop-zone',
      group: 'drop-zone',
      props: {
        'data-test-id': TEST_ID,
        description: '',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId('description')).not.toBeVisible();
  });
});
