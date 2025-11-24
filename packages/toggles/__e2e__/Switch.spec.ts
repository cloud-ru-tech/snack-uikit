import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

test.describe('Switch', () => {
  const focus = async (getByTestId: (testId: string) => Locator) => {
    const nativeSwitch = getByTestId('switch-native-input');
    await nativeSwitch.focus();
  };

  const TEST_ID = 'switch';
  const TEST_ID_NATIVE = `${TEST_ID}-native-input`;

  test('Should be switched to checked by click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-switch',
      story: 'switch',
      props: {
        'data-test-id': 'switch',
      },
    });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
    await getByTestId(TEST_ID).click();
    await expect(getByTestId(TEST_ID_NATIVE)).toBeChecked();
  });

  test("Shouldn't be switched to checked by click if disabled", async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-switch',
      story: 'switch',
      props: {
        'data-test-id': 'switch',
        disabled: true,
      },
    });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
    await getByTestId(TEST_ID).click({ force: true });
    await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
  });

  // FIXME: этот падает в firefox, нужно починить
  // https://github.com/DevExpress/testcafe/issues/6969
  // eslint-disable-next-line vitest/no-commented-out-tests
  // test('Should be switched by keyboard', async ({ gotoStory, getByTestId, page }) => {
  //   await gotoStory({
  //     name: 'toggles-switch',
  //     story: 'switch',
  //     props: {
  //       'data-test-id': 'switch',
  //     },
  //   });
  //   await expect(getByTestId(TEST_ID_NATIVE)).not.toBeChecked();
  //   await focus(page, getByTestId);
  //   await page.keyboard.press('space');
  //   await expect(getByTestId(TEST_ID_NATIVE)).toBeChecked();
  // });

  test("Shouldn't be switched by keyboard if disabled", async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-switch',
      story: 'switch',
      props: {
        'data-test-id': 'switch',
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
      name: 'toggles-switch',
      story: 'switch',
      props: {
        'data-test-id': 'switch',
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
