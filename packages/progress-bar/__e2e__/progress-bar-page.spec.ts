import { expect, test } from '../../../playwright/fixtures';

const PROGRESS_TEST_ID = 'progress-bar-page-test';
const START_BUTTON_TEST_ID = 'start-button-test';
const STOP_BUTTON_TEST_ID = 'stop-button-test';

test.describe('ProgressBarPage', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      name: 'progress-bar-page',
      group: 'progress-bar',
      props: {
        'data-test-id': PROGRESS_TEST_ID,
      },
    });
  });

  test('Rendered', async ({ getByTestId }) => {
    const startButton = getByTestId(START_BUTTON_TEST_ID);
    const stopButton = getByTestId(STOP_BUTTON_TEST_ID);

    await startButton.click();
    await expect(getByTestId(PROGRESS_TEST_ID)).toBeVisible();
    await stopButton.click();
    await expect(getByTestId(PROGRESS_TEST_ID)).not.toBeVisible();
  });
});
