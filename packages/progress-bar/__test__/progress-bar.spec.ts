import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'progress-bar-test';
const FILLER_TEST_ID = 'progress-bar-filler';

test.describe('ProgressBar', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'progress-bar',
      group: 'progress-bar',
      props: {
        'data-test-id': TEST_ID,
        progress: 50,
      },
    });
    const progressBar = getByTestId(TEST_ID);

    await expect(progressBar).toBeVisible();

    const filler = getByTestId(FILLER_TEST_ID);
    const progress = await filler.evaluate(el => getComputedStyle(el).getPropertyValue('--progress'));

    await expect(progress).toBe('50%');
  });

  test('Rendered as 0 progress for negative numbers', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'progress-bar',
      group: 'progress-bar',
      props: {
        'data-test-id': TEST_ID,
        progress: -5,
      },
    });
    const filler = getByTestId(FILLER_TEST_ID);
    const progress = await filler.evaluate(el => getComputedStyle(el).getPropertyValue('--progress'));

    await expect(progress).toBe('0%');
  });

  test('Rendered as totally filled progress bar for numbers > 100', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'progress-bar',
      group: 'progress-bar',
      props: {
        'data-test-id': TEST_ID,
        progress: 150,
      },
    });
    const filler = getByTestId(FILLER_TEST_ID);
    const progress = await filler.evaluate(el => getComputedStyle(el).getPropertyValue('--progress'));

    await expect(progress).toBe('100%');
  });
});
