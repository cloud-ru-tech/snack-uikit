import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TOAST_UPLOAD_TEST_IDS } from '../src/testIds';

const TEST_ID = TOAST_UPLOAD_TEST_IDS.main;
const TOAST_TRIGGER = 'toast-trigger';

const MOCK_UPLOAD = {
  title: 'Loading...',
  description: '3 minutes left',
};

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    group: 'toaster',
    name: 'toast-upload',
    story: 'toast-upload',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Toast Upload');

test.page(getPage())('Should be rendered', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  const toastUpload = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(toastUpload.exists).ok();
});

test.page(getPage())('Should disappear after click close', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  const toastUpload = Selector(dataTestIdSelector(TEST_ID));

  const closeBtn = Selector(`${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.close)}`);

  await t.click(closeBtn).expect(toastUpload.exists).notOk();
});

test.page(getPage({ closable: false }))(`Should render without buttonClose`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  const toastSystemEventButtonClose = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.close)}`,
  );

  await t.expect(toastSystemEventButtonClose.exists).notOk();
});

test.page(
  getPage({
    title: MOCK_UPLOAD.title,
    description: MOCK_UPLOAD.description,
  }),
)(`Should text fields of header correct render`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  const toastTitle = Selector(`${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.title)}`);
  await t.expect(toastTitle.innerText).eql(MOCK_UPLOAD.title);

  const toastDescription = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.description)}`,
  );
  await t.expect(toastDescription.innerText).eql(MOCK_UPLOAD.description);
});

test.page(getPage())(`Should show progress bar on non-collapse state`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  let progressBar = Selector(`${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.progressBar)}`);

  await t.expect(progressBar.exists).notOk();

  const collapseBtn = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.collapseButton)}`,
  );

  await t.click(collapseBtn);

  progressBar = Selector(`${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.progressBar)}`);

  await t.expect(progressBar.exists).ok();
});

test.page(getPage())(`Should list items always render`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  let list = Selector(`${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.list)}`);

  await t.expect(list.exists).ok();

  const collapseBtn = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.collapseButton)}`,
  );

  await t.click(collapseBtn);

  list = Selector(`${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_UPLOAD_TEST_IDS.list)}`);

  await t.expect(list.exists).ok();
});
