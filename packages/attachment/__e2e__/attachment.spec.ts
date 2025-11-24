import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/testIds';
import { DEFAULT_ARGS } from '../stories/constants';
import { STORY_TEST_IDS } from '../stories/testIds';

test.describe('Attachment', () => {
  test('Should render title/description/error', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        title: DEFAULT_ARGS?.title,
        description: DEFAULT_ARGS?.description,
        error: 'error',
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const title = getByTestId(TEST_IDS.title);
    const description = getByTestId(TEST_IDS.description);
    const error = getByTestId(TEST_IDS.error);

    await expect(attachment).toBeVisible();

    await expect(title).toBeVisible();
    await expect(title).toHaveText(DEFAULT_ARGS?.title ?? '');

    await expect(description).toBeVisible();
    await expect(description).toHaveText(DEFAULT_ARGS?.description ?? '');

    await expect(error).toBeVisible();
    await expect(error).toHaveText('error');
  });

  test('Should render actions delete/download', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: DEFAULT_ARGS?.showDownload,
        showDelete: true,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);

    await expect(attachment).toBeVisible();

    await expect(deleteAction).toBeVisible();
    await expect(downloadAction).toBeVisible();
  });

  test('Should render in loading state without download action', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: DEFAULT_ARGS?.showDownload,
        showDelete: true,
        loading: true,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const loading = getByTestId(TEST_IDS.loading);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);

    await expect(attachment).toBeVisible();

    await expect(loading).toBeVisible();
    await expect(deleteAction).toBeVisible();
    await expect(downloadAction).not.toBeVisible();
  });

  test('Should hide download button in loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        loading: true,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);
    const loading = getByTestId(TEST_IDS.loading);

    await expect(attachment).toBeVisible();
    await expect(loading).toBeVisible();
    await expect(downloadAction).not.toBeVisible();
  });

  test('Should hide download button in error state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        error: 'error',
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);
    const error = getByTestId(TEST_IDS.error);

    await expect(attachment).toBeVisible();
    await expect(error).toBeVisible();
    await expect(error).toHaveText('error');
    await expect(downloadAction).not.toBeVisible();
  });

  test('Should render retry button in error state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        showRetry: true,
        error: 'error',
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const retryAction = getByTestId(TEST_IDS.retryAction);
    const error = getByTestId(TEST_IDS.error);

    await expect(attachment).toBeVisible();
    await expect(error).toBeVisible();
    await expect(error).toHaveText('error');
    await expect(retryAction).toBeVisible();
  });

  test('Should render image when file is image', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        exampleFile: 'img',
        loading: false,
        disabled: false,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const icon = getByTestId(TEST_IDS.icon);
    const image = getByTestId(TEST_IDS.image);

    await expect(attachment).toBeVisible();

    await expect(icon).not.toBeVisible();
    await expect(image).toBeVisible();
  });

  test('Should render icon when file is not image', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        exampleFile: 'pdf',
        loading: false,
        disabled: false,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const icon = getByTestId(TEST_IDS.icon);
    const image = getByTestId(TEST_IDS.image);

    await expect(attachment).toBeVisible();

    await expect(icon).toBeVisible();
    await expect(image).not.toBeVisible();
  });

  test('Should not call onClick/onDownload callbacks in loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        loading: true,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);
    const deleteActionToast = getByTestId(STORY_TEST_IDS.DeleteAction);
    const clickActionToast = getByTestId(STORY_TEST_IDS.ClickAction);
    const loading = getByTestId(TEST_IDS.loading);

    await expect(attachment).toBeVisible();
    await expect(loading).toBeVisible();
    await expect(deleteAction).toBeVisible();
    await expect(downloadAction).not.toBeVisible();

    await expect(deleteActionToast).not.toBeVisible();
    await expect(clickActionToast).not.toBeVisible();

    await deleteAction.click();
    await expect(deleteActionToast).toBeVisible();
    await attachment.click({ force: true });
    await expect(clickActionToast).not.toBeVisible();
  });

  test('Should call onDelete/onRetry callbacks in error state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        showRetry: true,
        loading: false,
        error: 'error',
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const retryAction = getByTestId(TEST_IDS.retryAction);
    const retryActionToast = getByTestId(STORY_TEST_IDS.RetryAction);
    const deleteActionToast = getByTestId(STORY_TEST_IDS.DeleteAction);
    const error = getByTestId(TEST_IDS.error);

    await expect(attachment).toBeVisible();
    await expect(error).toBeVisible();
    await expect(deleteAction).toBeVisible();
    await expect(retryAction).toBeVisible();

    await expect(deleteActionToast).not.toBeVisible();
    await expect(retryActionToast).not.toBeVisible();

    await deleteAction.click();
    await expect(deleteActionToast).toBeVisible();
    await retryAction.click();
    await expect(retryActionToast).toBeVisible();
  });

  test('Should call onClick/onDelete/onDownload callbacks', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        loading: false,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);
    const deleteActionToast = getByTestId(STORY_TEST_IDS.DeleteAction);
    const clickActionToast = getByTestId(STORY_TEST_IDS.ClickAction);
    const downloadActionToast = getByTestId(STORY_TEST_IDS.DownloadAction);

    await expect(attachment).toBeVisible();

    await expect(deleteActionToast).not.toBeVisible();
    await expect(clickActionToast).not.toBeVisible();

    await deleteAction.click().then(async () => await page.waitForTimeout(100));
    await expect(deleteActionToast).toBeVisible();
    await expect(clickActionToast).not.toBeVisible();

    await page.waitForTimeout(2000);
    await expect(downloadActionToast).not.toBeVisible();
    await expect(clickActionToast).not.toBeVisible();

    await downloadAction.click().then(async () => await page.waitForTimeout(100));
    await expect(downloadActionToast).toBeVisible();
    await expect(clickActionToast).not.toBeVisible();

    await page.waitForTimeout(2000);
    await expect(clickActionToast).not.toBeVisible();

    await attachment.click().then(async () => await page.waitForTimeout(100));
    await expect(clickActionToast).toBeVisible();
  });

  test('Should not call onClick/onDelete/onDownload callbacks in disabled state', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        disabled: true,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);
    const deleteActionToast = getByTestId(STORY_TEST_IDS.DeleteAction);
    const clickActionToast = getByTestId(STORY_TEST_IDS.ClickAction);
    const downloadActionToast = getByTestId(STORY_TEST_IDS.DownloadAction);

    await expect(attachment).toBeVisible();

    await expect(deleteActionToast).not.toBeVisible();
    await expect(clickActionToast).not.toBeVisible();
    await expect(downloadActionToast).not.toBeVisible();

    await deleteAction.click({ force: true });
    await expect(deleteActionToast).not.toBeVisible();
    await downloadAction.click({ force: true });
    await expect(downloadActionToast).not.toBeVisible();
    await attachment.click({ force: true });
    await expect(clickActionToast).not.toBeVisible();
  });

  test('Should control by keyboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'attachment',
      story: 'attachment',
      group: 'attachment',
      props: {
        'data-test-id': STORY_TEST_IDS.Attachment,
        showDownload: true,
        showDelete: true,
        showClick: true,
        disabled: false,
        loading: false,
        error: undefined,
      },
    });

    const attachment = getByTestId(STORY_TEST_IDS.Attachment);
    const deleteAction = getByTestId(TEST_IDS.deleteAction);
    const downloadAction = getByTestId(TEST_IDS.downloadAction);
    const deleteActionToast = getByTestId(STORY_TEST_IDS.DeleteAction);
    const clickActionToast = getByTestId(STORY_TEST_IDS.ClickAction);
    const downloadActionToast = getByTestId(STORY_TEST_IDS.DownloadAction);

    await expect(attachment).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(attachment).toBeFocused();

    await page.keyboard.press('Space').then(async () => await page.waitForTimeout(100));
    await expect(clickActionToast).toBeVisible();

    await page.waitForTimeout(1000);
    await page.keyboard.press('Tab');
    await expect(downloadAction).toBeFocused();

    await page.keyboard.press('Enter').then(async () => await page.waitForTimeout(100));
    await expect(downloadActionToast).toBeVisible();

    await page.waitForTimeout(1000);
    await page.keyboard.press('Tab');
    await expect(deleteAction).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await expect(deleteActionToast).toBeVisible();
  });
});
