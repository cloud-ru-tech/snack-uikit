import { expect, test } from '../../../playwright/fixtures';
import { DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../src/constants';

const TEST_ID = 'rating-test';

test.describe('Rating', () => {
  test('Renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'rating',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    if (!DEFAULT_RATING_VALUE) {
      await expect(getByTestId(TEST_ID).locator('[aria-checked="true"]')).toHaveCount(0);
    } else {
      await expect(getByTestId(TEST_ID).locator('[aria-checked="true"]')).toHaveCount(DEFAULT_RATING_VALUE);
    }

    await expect(getByTestId(TEST_ID).locator('[role="radio"]')).toHaveCount(DEFAULT_STAR_COUNT);
  });

  test('Renders with custom number of stars checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'rating',
      props: {
        'data-test-id': TEST_ID,
        defaultValue: 3,
      },
    });
    await expect(getByTestId(TEST_ID).locator('[aria-checked="true"]')).toHaveCount(3);
  });

  test('Renders with custom stars number', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'rating',
      story: 'rating',
      props: {
        'data-test-id': TEST_ID,
        count: 10,
      },
    });
    await expect(getByTestId(TEST_ID).locator('[role="radio"]')).toHaveCount(10);
  });
});
