import { expect, test } from '../../../playwright/fixtures';
import { TOAST_UPLOAD_TEST_IDS } from '../src/testIds';

const TEST_ID = TOAST_UPLOAD_TEST_IDS.main;
const TOAST_TRIGGER = 'toast-trigger';

const MOCK_UPLOAD = {
  title: 'Loading...',
  description: '3 minutes left',
};

test.describe('Toast Upload', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-upload',
      story: 'toast-upload',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    const toastUpload = getByTestId(TEST_ID);

    await expect(toastUpload).toBeVisible();
  });

  test('Should disappear after click close', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-upload',
      story: 'toast-upload',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();
    const toastUpload = getByTestId(TEST_ID);

    const closeBtn = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.close}"]`);

    await closeBtn.click();
    await expect(toastUpload).not.toBeVisible();
  });

  test(`Should render without buttonClose`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-upload',
      story: 'toast-upload',
      props: {
        'data-test-id': TEST_ID,
        closable: false,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastSystemEventButtonClose = getByTestId(TEST_ID).locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.close}"]`);

    await expect(toastSystemEventButtonClose).not.toBeVisible();
  });

  test(`Should text fields of header correct render`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-upload',
      story: 'toast-upload',
      props: {
        'data-test-id': TEST_ID,
        title: MOCK_UPLOAD.title,
        description: MOCK_UPLOAD.description,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastTitle = getByTestId(TEST_ID).locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.title}"]`);
    await expect(toastTitle).toHaveText(MOCK_UPLOAD.title);

    const toastDescription = getByTestId(TEST_ID).locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.description}"]`);
    await expect(toastDescription).toHaveText(MOCK_UPLOAD.description);
  });

  test(`Should show progress bar on non-collapse state`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-upload',
      story: 'toast-upload',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastUpload = getByTestId(TEST_ID);
    let progressBar = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.progressBar}"]`);

    await expect(progressBar).not.toBeVisible();

    const collapseBtn = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.collapseButton}"]`);

    await collapseBtn.click();

    progressBar = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.progressBar}"]`);

    await expect(progressBar).toBeVisible();
  });

  test(`Should list items always render`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'toaster',
      name: 'toast-upload',
      story: 'toast-upload',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await getByTestId(TOAST_TRIGGER).click();

    const toastUpload = getByTestId(TEST_ID);
    let list = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.list}"]`);

    await expect(list).toBeVisible();

    const collapseBtn = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.collapseButton}"]`);

    await collapseBtn.click();

    list = toastUpload.locator(`[data-test-id="${TOAST_UPLOAD_TEST_IDS.list}"]`);

    await expect(list).toBeVisible();
  });
});
