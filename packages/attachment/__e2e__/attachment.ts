import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/testIds';
import { DEFAULT_ARGS } from '../stories/constants';
import { STORY_TEST_IDS } from '../stories/testIds';

function getSelectors() {
  return {
    attachment: Selector(dataTestIdSelector(STORY_TEST_IDS.Attachment)),
    clickActionToast: Selector(dataTestIdSelector(STORY_TEST_IDS.ClickAction)),
    deleteActionToast: Selector(dataTestIdSelector(STORY_TEST_IDS.DeleteAction)),
    downloadActionToast: Selector(dataTestIdSelector(STORY_TEST_IDS.DownloadAction)),
    retryActionToast: Selector(dataTestIdSelector(STORY_TEST_IDS.RetryAction)),
    title: Selector(dataTestIdSelector(TEST_IDS.title)),
    description: Selector(dataTestIdSelector(TEST_IDS.description)),
    error: Selector(dataTestIdSelector(TEST_IDS.error)),
    icon: Selector(dataTestIdSelector(TEST_IDS.icon)),
    image: Selector(dataTestIdSelector(TEST_IDS.image)),
    loading: Selector(dataTestIdSelector(TEST_IDS.loading)),
    deleteAction: Selector(dataTestIdSelector(TEST_IDS.deleteAction)),
    downloadAction: Selector(dataTestIdSelector(TEST_IDS.downloadAction)),
    retryAction: Selector(dataTestIdSelector(TEST_IDS.retryAction)),
  };
}

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'attachment',
    story: 'attachment',
    props: {
      'data-test-id': STORY_TEST_IDS.Attachment,
      ...props,
    },
    group: 'attachment',
  });

fixture('Attachment');

test.page(
  getPageUrl({
    title: DEFAULT_ARGS?.title,
    description: DEFAULT_ARGS?.description,
    error: 'error',
  }),
)('Should render title/description/error', async t => {
  const { title, description, error, attachment } = getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(title.exists).ok();
  await t.expect(title.innerText).eql(DEFAULT_ARGS?.title ?? '');

  await t.expect(description.exists).ok();
  await t.expect(description.innerText).eql(DEFAULT_ARGS?.description ?? '');

  await t.expect(error.exists).ok();
  await t.expect(error.innerText).eql('error');
});

test.page(
  getPageUrl({
    showDownload: DEFAULT_ARGS?.showDownload,
    showDelete: true,
    error: undefined,
  }),
)('Should render actions delete/download', async t => {
  const { deleteAction, downloadAction, attachment } = getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(deleteAction.exists).ok();
  await t.expect(downloadAction.exists).ok();
});

test.page(
  getPageUrl({
    showDownload: DEFAULT_ARGS?.showDownload,
    showDelete: true,
    loading: true,
    error: undefined,
  }),
)('Should render in loading state without download action', async t => {
  const { loading, deleteAction, downloadAction, attachment } = getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(loading.exists).ok();
  await t.expect(deleteAction.exists).ok();
  await t.expect(downloadAction.exists).notOk();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    loading: true,
    error: undefined,
  }),
)('Should hide download button in loading state', async t => {
  const { downloadAction, loading, attachment } = getSelectors();

  await t.expect(attachment.exists).ok();
  await t.expect(loading.exists).ok();
  await t.expect(downloadAction.exists).notOk();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    error: 'error',
  }),
)('Should hide download button in error state', async t => {
  const { downloadAction, attachment, error } = getSelectors();

  await t.expect(attachment.exists).ok();
  await t.expect(error.exists).ok();
  await t.expect(error.innerText).eql('error');
  await t.expect(downloadAction.exists).notOk();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    showRetry: true,
    error: 'error',
  }),
)('Should render retry button in error state', async t => {
  const { retryAction, attachment, error } = getSelectors();

  await t.expect(attachment.exists).ok();
  await t.expect(error.exists).ok();
  await t.expect(error.innerText).eql('error');
  await t.expect(retryAction.exists).ok();
});

test.page(
  getPageUrl({
    exampleFile: 'img',
    loading: false,
    disabled: false,
  }),
)('Should render image when file is image', async t => {
  const { attachment, icon, image } = getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(icon.exists).notOk();
  await t.expect(image.exists).ok();
});

test.page(
  getPageUrl({
    exampleFile: 'pdf',
    loading: false,
    disabled: false,
  }),
)('Should render icon when file is not image', async t => {
  const { attachment, icon, image } = getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(icon.exists).ok();
  await t.expect(image.exists).notOk();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    loading: true,
    error: undefined,
  }),
)('Should not call onClick/onDownload callbacks in loading state', async t => {
  const { deleteAction, downloadAction, attachment, deleteActionToast, clickActionToast, loading } = getSelectors();

  await t.expect(attachment.exists).ok();
  await t.expect(loading.exists).ok();
  await t.expect(deleteAction.exists).ok();
  await t.expect(downloadAction.exists).notOk();

  await t.expect(deleteActionToast.exists).notOk();
  await t.expect(clickActionToast.exists).notOk();

  await t.click(deleteAction).expect(deleteActionToast.exists).ok();
  await t.click(attachment).expect(clickActionToast.exists).notOk();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    showRetry: true,
    loading: false,
    error: 'error',
  }),
)('Should call onDelete/onRetry callbacks in error state', async t => {
  const { deleteAction, retryAction, retryActionToast, attachment, deleteActionToast, error } = getSelectors();

  await t.expect(attachment.exists).ok();
  await t.expect(error.exists).ok();
  await t.expect(deleteAction.exists).ok();
  await t.expect(retryAction.exists).ok();

  await t.expect(deleteActionToast.exists).notOk();
  await t.expect(retryActionToast.exists).notOk();

  await t.click(deleteAction).expect(deleteActionToast.exists).ok();
  await t.click(retryAction).expect(retryActionToast.exists).ok();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    loading: false,
    error: undefined,
  }),
)('Should call onClick/onDelete/onDownload callbacks', async t => {
  const { deleteAction, downloadAction, attachment, deleteActionToast, clickActionToast, downloadActionToast } =
    getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(deleteActionToast.exists).notOk();
  await t.expect(clickActionToast.exists).notOk();

  await t.click(deleteAction).wait(100);
  await t.expect(deleteActionToast.exists).ok();
  await t.expect(clickActionToast.exists).notOk();

  await t.wait(2000);
  await t.expect(downloadActionToast.exists).notOk();
  await t.expect(clickActionToast.exists).notOk();

  await t.click(downloadAction).wait(100);
  await t.expect(downloadActionToast.exists).ok();
  await t.expect(clickActionToast.exists).notOk();

  await t.wait(2000);
  await t.expect(clickActionToast.exists).notOk();

  await t.click(attachment).wait(100);
  await t.expect(clickActionToast.exists).ok();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    disabled: true,
    error: undefined,
  }),
)('Should not call onClick/onDelete/onDownload callbacks in disabled state', async t => {
  const { deleteAction, downloadAction, attachment, deleteActionToast, clickActionToast, downloadActionToast } =
    getSelectors();

  await t.expect(attachment.exists).ok();

  await t.expect(deleteActionToast.exists).notOk();
  await t.expect(clickActionToast.exists).notOk();
  await t.expect(downloadActionToast.exists).notOk();

  await t.click(deleteAction).expect(deleteActionToast.exists).notOk();
  await t.click(downloadAction).expect(downloadActionToast.exists).notOk();
  await t.click(attachment).expect(clickActionToast.exists).notOk();
});

test.page(
  getPageUrl({
    showDownload: true,
    showDelete: true,
    showClick: true,
    disabled: false,
    loading: false,
    error: undefined,
  }),
)('Should control by keyboard', async t => {
  const { deleteAction, downloadAction, attachment, deleteActionToast, clickActionToast, downloadActionToast } =
    getSelectors();

  await t.expect(attachment.exists).ok();
  await t.pressKey('tab');
  await t.expect(attachment.focused).ok();

  await t.pressKey('space').wait(100);
  await t.expect(clickActionToast.exists).ok();

  await t.wait(1000);
  await t.pressKey('tab');
  await t.expect(downloadAction.focused).ok();

  await t.pressKey('enter').wait(100);
  await t.expect(downloadActionToast.exists).ok();

  await t.wait(1000);
  await t.pressKey('tab');
  await t.expect(deleteAction.focused).ok();

  await t.pressKey('enter').wait(100);
  await t.expect(deleteActionToast.exists).ok();
});
