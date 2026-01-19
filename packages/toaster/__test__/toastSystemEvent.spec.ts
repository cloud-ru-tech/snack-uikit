import { expect, test } from '../../../playwright/fixtures';
import { TOAST_SYSTEM_EVENT_TEST_IDS } from '../src/testIds';

const TEST_ID = TOAST_SYSTEM_EVENT_TEST_IDS.main;
const TOAST_TRIGGER = 'toast-trigger';
const TEST_TITLE = 'Test title';
const TEST_DESCRIPTION = 'Test description';
const TEST_PRIMARY_BUTTON = 'Primary';
const TEST_SECONDARY_BUTTON = 'Secondary';

test.describe('Toast SystemEvent', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    const toastSystemEvent = getByTestId(TEST_ID);

    await expect(toastSystemEvent).toBeVisible();
  });

  test('Should disappear after 5s', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    const toastElementSelector = getByTestId(TEST_ID);

    await getByTestId(TOAST_TRIGGER).click();
    await expect(toastElementSelector).toBeVisible();
    await page.waitForTimeout(5000);

    await expect(toastElementSelector).not.toBeVisible();
  });

  test('Should not disappear after 5s when hovered', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    const toastSystemEvent = getByTestId(TEST_ID);
    await toastSystemEvent.hover();
    await page.waitForTimeout(5000);
    await expect(toastSystemEvent).toBeVisible();
  });

  test(`Should render with title '${TEST_TITLE}'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
        title: TEST_TITLE,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventTitle = getByTestId(TEST_ID).locator(`[data-test-id="${TOAST_SYSTEM_EVENT_TEST_IDS.title}"]`);

    await expect(toastSystemEventTitle).toHaveText(TEST_TITLE);
  });

  test(`Should render with description '${TEST_DESCRIPTION}'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
        description: TEST_DESCRIPTION,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventDescription = getByTestId(TEST_ID).locator(
      `[data-test-id="${TOAST_SYSTEM_EVENT_TEST_IDS.description}"]`,
    );

    await expect(toastSystemEventDescription).toHaveText(TEST_DESCRIPTION);
  });

  test(`Should render without progressbar`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
        progressBar: false,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventProgressBar = getByTestId(TEST_ID).locator(
      `[data-test-id="${TOAST_SYSTEM_EVENT_TEST_IDS.progressbar}"]`,
    );

    await expect(toastSystemEventProgressBar).not.toBeVisible();
  });

  test(`Should render without buttonClose`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
        closable: false,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventButtonClose = getByTestId(TEST_ID).locator(
      `[data-test-id="${TOAST_SYSTEM_EVENT_TEST_IDS.buttonClose}"]`,
    );

    await expect(toastSystemEventButtonClose).not.toBeVisible();
  });

  test(`Should render buttonCloseColumn when render more 2 toast`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    await getByTestId(TOAST_TRIGGER).click();
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventButtonCloseColumn = getByTestId(TOAST_SYSTEM_EVENT_TEST_IDS.buttonCloseColumn);

    await expect(toastSystemEventButtonCloseColumn).toBeVisible();
  });

  test(`Should disappear all toasts`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    await getByTestId(TOAST_TRIGGER).click();
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventButtonCloseColumn = getByTestId(TOAST_SYSTEM_EVENT_TEST_IDS.buttonCloseColumn);
    const toastElementSelector = getByTestId(TEST_ID);
    await toastSystemEventButtonCloseColumn.click();
    await expect(toastElementSelector).toHaveCount(0);
  });

  test(`Should render with action buttons`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-systemevent',
      story: 'toast-system-event',
      props: {
        'data-test-id': TEST_ID,
        showAction: true,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventButtonAction = getByTestId(TEST_ID).locator(
      `[data-test-id="${TOAST_SYSTEM_EVENT_TEST_IDS.buttonAction}"]`,
    );

    await expect(toastSystemEventButtonAction.nth(0)).toHaveText(TEST_PRIMARY_BUTTON);
    await expect(toastSystemEventButtonAction.nth(1)).toHaveText(TEST_SECONDARY_BUTTON);
  });
});
