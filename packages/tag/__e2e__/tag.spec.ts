import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'tag-test';
const CLOSE_BUTTON_DATA_TEST_ID = 'tag-remove-button';

test.describe('Tag', () => {
  test('Without remove button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag',
      props: {
        'data-test-id': TEST_ID,
        storyMode: 'default',
      },
    });

    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(TEST_ID).locator(`[data-test-id="${CLOSE_BUTTON_DATA_TEST_ID}"]`)).not.toBeVisible();
  });

  test('With remove button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag',
      props: {
        'data-test-id': TEST_ID,
        storyMode: 'removable',
      },
    });

    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(CLOSE_BUTTON_DATA_TEST_ID)).toBeVisible();
    await getByTestId(CLOSE_BUTTON_DATA_TEST_ID).click();
    await expect(getByTestId(TEST_ID)).not.toBeVisible();
  });
});
