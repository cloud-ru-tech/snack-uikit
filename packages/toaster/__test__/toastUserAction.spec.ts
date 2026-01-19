import { expect, test } from '../../../playwright/fixtures';
import { TOAST_USER_ACTION_TEST_IDS } from '../src/testIds';

const TEST_ID = TOAST_USER_ACTION_TEST_IDS.main;
const TOAST_TRIGGER = 'toast-trigger';
const TEST_LABEL = 'Test label';

test.describe('Toast UserAction', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-useraction',
      story: 'toast-user-action',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    const toastUserAction = getByTestId(TEST_ID);

    await expect(toastUserAction).toBeVisible();
  });

  test('Should disappear after 2s', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-useraction',
      story: 'toast-user-action',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    const toastUserAction = getByTestId(TEST_ID);

    await getByTestId(TOAST_TRIGGER).click();
    await expect(toastUserAction).toBeVisible();
    await page.waitForTimeout(2000);

    await expect(toastUserAction).not.toBeVisible();
  });

  test('Should not disappear after 2s when hovered', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-useraction',
      story: 'toast-user-action',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    const toastUserAction = getByTestId(TEST_ID);
    await toastUserAction.hover();
    await page.waitForTimeout(2000);
    await expect(toastUserAction).toBeVisible();
  });

  test(`Should render with label '${TEST_LABEL}'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-useraction',
      story: 'toast-user-action',
      props: {
        'data-test-id': TEST_ID,
        label: TEST_LABEL,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastUserActionLabel = getByTestId(TEST_ID).locator(`[data-test-id="${TOAST_USER_ACTION_TEST_IDS.label}"]`);

    await expect(toastUserActionLabel).toHaveText(TEST_LABEL);
  });

  test(`Should render with loader`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-useraction',
      story: 'toast-user-action',
      props: {
        'data-test-id': TEST_ID,
        loading: true,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastUserActionLoader = getByTestId(TEST_ID).locator(`[data-test-id="${TOAST_USER_ACTION_TEST_IDS.loader}"]`);

    await expect(toastUserActionLoader).toBeVisible();
  });
});
