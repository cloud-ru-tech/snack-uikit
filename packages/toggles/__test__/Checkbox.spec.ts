import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

test.describe('Checkbox', () => {
  const focus = async (getByTestId: (testId: string) => Locator) => {
    const nativeCheckbox = getByTestId('checkbox-native-input');
    await nativeCheckbox.focus();
  };

  const TEST_ID = 'checkbox';
  const TEST_ID_NATIVE = `${TEST_ID}-native-input`;

  test('Should be switched to checked by click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-checkbox',
      story: 'checkbox',
      props: {
        'data-test-id': 'checkbox',
      },
    });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
    await getByTestId(TEST_ID).click();
    await expect(getByTestId(TEST_ID_NATIVE)).toBeChecked();
  });

  test("Shouldn't be switched to checked by click if disabled", async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-checkbox',
      story: 'checkbox',
      props: {
        'data-test-id': 'checkbox',
        disabled: true,
      },
    });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
    await getByTestId(TEST_ID).click({ force: true });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
  });

  test('Should be switched by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-checkbox',
      story: 'checkbox',
      props: {
        'data-test-id': 'checkbox',
      },
    });
    await expect(getByTestId(TEST_ID_NATIVE)).toBeVisible();

    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
    await focus(getByTestId);
    await page.keyboard.press('Space');
    await expect(getByTestId(TEST_ID_NATIVE)).toBeChecked();
  });

  test("Shouldn't be switched by keyboard if disabled", async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-checkbox',
      story: 'checkbox',
      props: {
        'data-test-id': 'checkbox',
        disabled: true,
      },
    });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
    await focus(getByTestId);
    await page.keyboard.press('Space');
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
  });

  test('Should set id and name to native checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-checkbox',
      story: 'checkbox',
      props: {
        'data-test-id': 'checkbox',
        id: 'test-id',
        name: 'test-name',
      },
    });
    const id = await getByTestId(TEST_ID_NATIVE).getAttribute('id');
    const name = await getByTestId(TEST_ID_NATIVE).getAttribute('name');
    await expect(id).toBe('test-id');
    await expect(name).toBe('test-name');
  });
});
