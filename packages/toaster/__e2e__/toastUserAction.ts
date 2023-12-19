import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TOAST_USER_ACTION_TEST_IDS } from '../src/testIds';

const TEST_ID = TOAST_USER_ACTION_TEST_IDS.main;
const TOAST_TRIGGER = 'toast-trigger';
const TEST_LABEL = 'Test label';

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    group: 'toaster',
    name: 'toast-useraction',
    story: 'toast-user-action',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Toast UserAction');

test.page(getPageUrl())('Should be rendered', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  const toastUserAction = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(toastUserAction.exists).ok();
});

test.page(getPageUrl())('Should disappear after 2s', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  let toastUserAction = Selector(dataTestIdSelector(TEST_ID));

  await t.click(toastTrigger).expect(toastUserAction.exists).ok().wait(2000);

  toastUserAction = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(toastUserAction.exists).notOk();
});

test.page(getPageUrl())('Should not disappear after 2s when hovered', async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));
  await t.click(toastTrigger);
  const toastUserAction = Selector(dataTestIdSelector(TEST_ID));
  await t.hover(toastUserAction).wait(2000);
  await t.expect(toastUserAction.exists).ok();
});

test.page(getPageUrl({ label: TEST_LABEL }))(`Should render with label '${TEST_LABEL}'`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));

  await t.click(toastTrigger);

  const toastUserActionLabel = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_USER_ACTION_TEST_IDS.label)}`,
  );

  await t.expect(toastUserActionLabel.innerText).eql(TEST_LABEL);
});

test.page(getPageUrl({ loading: true }))(`Should render with loader`, async t => {
  const toastTrigger = Selector(dataTestIdSelector(TOAST_TRIGGER));

  await t.click(toastTrigger);

  const toastUserActionLoader = Selector(
    `${dataTestIdSelector(TEST_ID)} ${dataTestIdSelector(TOAST_USER_ACTION_TEST_IDS.loader)}`,
  );

  await t.expect(toastUserActionLoader.exists).ok();
});
