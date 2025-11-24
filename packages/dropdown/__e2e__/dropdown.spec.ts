import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  dropdown: 'dropdown',
  buttonWithDropdown: 'button-with-dropdown',
};

test.describe('Dropdown', () => {
  const getElementWidth = async (locator: Locator): Promise<number> => {
    const box = await locator.boundingBox();
    return box?.width ?? 0;
  };

  test('Should be rendered by click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'dropdown',
      story: 'dropdown',
      props: {
        'data-test-id': TEST_IDS.dropdown,
      },
    });

    await expect(getByTestId(TEST_IDS.dropdown)).not.toBeVisible();
    await getByTestId(TEST_IDS.buttonWithDropdown).click();
    await expect(getByTestId(TEST_IDS.dropdown)).toBeVisible();
  });

  [60, 300, 600].forEach(width => {
    test(`Should render with width equals button width when content = ${width}px`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'dropdown',
        story: 'dropdown',
        props: {
          'data-test-id': TEST_IDS.dropdown,
          widthStrategy: 'eq',
          storySkeletonWidth: width,
        },
      });

      await getByTestId(TEST_IDS.buttonWithDropdown).click();
      const dropdownWidth = await getElementWidth(getByTestId(TEST_IDS.dropdown));
      const buttonWidth = await getElementWidth(getByTestId(TEST_IDS.buttonWithDropdown));
      await expect(dropdownWidth).toBe(buttonWidth);
    });
  });

  [60, 300, 600].forEach(width => {
    test(`Should render with width equals or great button width when content = ${width}px`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'dropdown',
        story: 'dropdown',
        props: {
          'data-test-id': TEST_IDS.dropdown,
          widthStrategy: 'gte',
          storySkeletonWidth: width,
        },
      });

      await getByTestId(TEST_IDS.buttonWithDropdown).click();
      const dropdownWidth = await getElementWidth(getByTestId(TEST_IDS.dropdown));
      const buttonWidth = await getElementWidth(getByTestId(TEST_IDS.buttonWithDropdown));
      await expect(dropdownWidth).toBeGreaterThanOrEqual(buttonWidth);
    });
  });

  test('Should close by "esc" button', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'dropdown',
      story: 'dropdown',
      props: {
        'data-test-id': TEST_IDS.dropdown,
      },
    });

    await expect(getByTestId(TEST_IDS.dropdown)).not.toBeVisible();
    await getByTestId(TEST_IDS.buttonWithDropdown).click();
    await expect(getByTestId(TEST_IDS.dropdown)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.dropdown)).not.toBeVisible();
  });
});
