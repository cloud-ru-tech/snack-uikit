import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TOAST_SYSTEM_EVENT_TEST_IDS } from '../src/testIds';

const TEST_ID = TOAST_SYSTEM_EVENT_TEST_IDS.main;
const TOAST_TRIGGER = 'toast-trigger';
const TEST_TITLE = 'Test title';
const TEST_DESCRIPTION = 'Test description';
const TEST_PRIMARY_BUTTON = 'Primary';
const TEST_SECONDARY_BUTTON = 'Secondary';

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    group: 'toaster',
    name: 'toast-systemevent',
    story: 'toast-system-event',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

const toastElementSelector = Selector(dataTestIdSelector(TEST_ID));

fixture('Toast SystemEvent');

test.page(getPageUrl())('Should be rendered', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  const toastSystemEvent = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(toastSystemEvent.exists).ok();
});

test.page(getPageUrl())('Should disappear after 5s', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));

  await t.click(toastTrigger).expect(toastElementSelector.exists).ok().wait(5000);

  await t.expect(toastElementSelector.exists).notOk();
});

test.page(getPageUrl())('Should not disappear after 5s when hovered', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  const toastSystemEvent = toastElementSelector;
  await t.hover(toastSystemEvent).wait(5000);
  await t.expect(toastSystemEvent.exists).ok();
});

test.page(getPageUrl({ title: TEST_TITLE }))(`Should render with title '${TEST_TITLE}'`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));

  await t.click(toastTrigger);

  const toastSystemEventTitle = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.title)}`,
  );

  await t.expect(toastSystemEventTitle.innerText).eql(TEST_TITLE);
});

test.page(getPageUrl({ description: TEST_DESCRIPTION }))(
  `Should render with description '${TEST_DESCRIPTION}'`,
  async t => {
    const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
    await t.click(toastTrigger);

    const toastSystemEventDescription = Selector(
      `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.description)}`,
    );

    await t.expect(toastSystemEventDescription.innerText).eql(TEST_DESCRIPTION);
  },
);

test.page(getPageUrl({ progressBar: false }))(`Should render without progressbar`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  const toastSystemEventProgressBar = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.progressbar)}`,
  );

  await t.expect(toastSystemEventProgressBar.exists).notOk();
});

test.page(getPageUrl({ closable: false }))(`Should render without buttonClose`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  const toastSystemEventButtonClose = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.buttonClose)}`,
  );

  await t.expect(toastSystemEventButtonClose.exists).notOk();
});

test.page(getPageUrl())(`Should render buttonCloseColumn when render more 2 toast`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  await t.click(toastTrigger);
  await t.click(toastTrigger);

  const toastSystemEventButtonCloseColumn = Selector(dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.buttonCloseColumn));

  await t.expect(toastSystemEventButtonCloseColumn.exists).ok();
});

test.page(getPageUrl())(`Should disappear all toasts`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  await t.click(toastTrigger);
  await t.click(toastTrigger);

  const toastSystemEventButtonCloseColumn = Selector(dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.buttonCloseColumn));
  await t.click(toastSystemEventButtonCloseColumn);
  await t.expect(toastElementSelector.exists).notOk();
});

test.page(getPageUrl({ showAction: true }))(`Should render with action buttons`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);

  const toastSystemEventButtonAction = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_SYSTEM_EVENT_TEST_IDS.buttonAction)}`,
  );

  await t.expect(toastSystemEventButtonAction.nth(0).innerText).eql(TEST_PRIMARY_BUTTON);
  await t.expect(toastSystemEventButtonAction.nth(1).innerText).eql(TEST_SECONDARY_BUTTON);
});
