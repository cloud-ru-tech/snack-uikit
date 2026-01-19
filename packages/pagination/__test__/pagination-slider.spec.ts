import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'pagination-slider';
const TOTAL = 7;
const PAGE = 3;

test.describe('Pagination Slider', () => {
  test('should render', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination-slider',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: TOTAL,
        page: PAGE,
      },
    });
    const pagination = getByTestId(TEST_ID);

    await expect(pagination).toBeVisible();

    for (let i = 1; i <= TOTAL; i++) {
      const item = getByTestId(`page-button-slider-${i}`);

      await expect(item).toBeVisible();
      if (i === PAGE) {
        await expect(item).toHaveAttribute('data-activated', 'true');
      } else {
        await expect(item).not.toHaveAttribute('data-activated', 'true');
      }
    }

    await expect(pagination.locator(`[data-test-id="page-button-slider-${TOTAL + 1}"]`)).not.toBeVisible();
  });

  test('should select page by click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination-slider',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: TOTAL,
        page: PAGE,
      },
    });
    const prevItem = getByTestId(`page-button-slider-${PAGE}`);
    const newItem = getByTestId('page-button-slider-5');

    await newItem.click();

    await expect(prevItem).not.toHaveAttribute('data-activated', 'true');
    await expect(newItem).toHaveAttribute('data-activated', 'true');
  });
});
