import { expect, test } from '../../../playwright/fixtures';
import { VARIANT } from '../src/components/constants';

const TEST_ID = 'counter-test';

test.describe('Counter', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      props: {
        'data-test-id': TEST_ID,
        value: 9,
      },
    });
    const counter = getByTestId(TEST_ID);
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText('9');
  });

  test('Rendered with variant = plus', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      props: {
        'data-test-id': TEST_ID,
        value: 10,
        variant: VARIANT.CountPlus,
      },
    });
    const counter = getByTestId(TEST_ID);
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText('9+');
  });

  test('Rendered with variant = key', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      props: {
        'data-test-id': TEST_ID,
        value: 8500,
        variant: VARIANT.CountK,
      },
    });
    const counter = getByTestId(TEST_ID);
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText('9K');
  });

  test('Should change the plus limit', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'counter',
      props: {
        'data-test-id': TEST_ID,
        value: 150,
        plusLimit: 100,
        variant: VARIANT.CountPlus,
      },
    });
    const counter = getByTestId(TEST_ID);
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText('99+');
  });
});
