import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { TEST_ID_TOASTER } from '../stories/testIds';

const TEST_ID = 'toolbar-test';

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'toolbar',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Toolbar');

function getSelectors() {
  return {
    search: Selector(dataTestIdSelector(TEST_IDS.search)),
    checkbox: Selector(dataTestIdSelector(TEST_IDS.checkbox)),
    bulkActions: Selector(dataTestIdSelector(TEST_IDS.bulkActions)),
    confirmAction: Selector(dataTestIdSelector(TEST_IDS.confirmAction)),
    rejectAction: Selector(dataTestIdSelector(TEST_IDS.rejectAction)),
    deleteAction: Selector(dataTestIdSelector(TEST_IDS.deleteAction)),
    deactivateAction: Selector(dataTestIdSelector(TEST_IDS.deactivateAction)),
    disabledAction: Selector(dataTestIdSelector(TEST_IDS.disabledAction)),
    moreBulkActionsButton: Selector(dataTestIdSelector(TEST_IDS.moreBulkActionsButton)),
    refreshButton: Selector(dataTestIdSelector(TEST_IDS.refreshButton)),
    moreActionsButton: Selector(dataTestIdSelector(TEST_IDS.moreActionsButton)),
    droplist: Selector(dataTestIdSelector(TEST_IDS.droplist)),
    option: Selector(dataTestIdSelector(TEST_IDS.option)),
    submitToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.submit)),
    refreshToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.refresh)),
    optionToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.option)),
    confirmToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.confirm)),
    rejectToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.reject)),
    deleteToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.delete)),
    deactivateToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.deactivate)),
    disabledToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.disabled)),
    deleteActionTooltip: Selector(dataTestIdSelector(`${TEST_IDS.deleteAction}-tooltip`)),
    disabledActionTooltip: Selector(dataTestIdSelector(`${TEST_IDS.disabledAction}-tooltip`)),
    after: Selector(dataTestIdSelector(TEST_IDS.after)),
  };
}

test.page(
  getPage({
    showBulkActions: true,
    showOnRefresh: true,
    showAfterActions: true,
    showMoreActions: true,
  }),
)(`Should render all items`, async t => {
  const { search, checkbox, moreActionsButton, after, refreshButton } = getSelectors();

  await t.expect(search.exists).ok('Search should be rendered');
  await t.expect(after.exists).ok('After search should be rendered when applied');
  await t.expect(moreActionsButton.exists).ok('MoreActionsButton should be rendered when moreActions applied');
  await t.expect(refreshButton.exists).ok('RefreshButton should be rendered when onRefresh callback applied');
  await t.expect(checkbox.exists).ok('Checkbox should be rendered when checked & onCheck applied');
});

test.page(
  getPage({
    showBulkActions: false,
    showOnRefresh: false,
    showAfterActions: false,
    showMoreActions: false,
  }),
)(`Should render only search`, async t => {
  const { search, checkbox, moreActionsButton, after, refreshButton } = getSelectors();

  await t.expect(search.exists).ok('Search should be rendered');
  await t.expect(after.exists).notOk('Actions should not be rendered when actions not applied');
  await t
    .expect(moreActionsButton.exists)
    .notOk('MoreActionsButton should not be rendered when moreActions not applied');
  await t
    .expect(refreshButton.exists)
    .notOk('RefreshButton should not be rendered when onRefresh callback not applied');
  await t.expect(checkbox.exists).notOk('Checkbox should not be rendered when bulk actions not applied');
});

test.page(
  getPage({
    showBulkActions: false,
    showOnRefresh: false,
    showSearch: false,
    showAfterActions: false,
    showMoreActions: false,
  }),
)(`Should render without search`, async t => {
  const { search, checkbox, moreActionsButton, after, refreshButton } = getSelectors();

  await t.expect(search.exists).notOk('Search should not be rendered');
  await t.expect(after.exists).notOk('Actions should not be rendered when actions not applied');
  await t
    .expect(moreActionsButton.exists)
    .notOk('MoreActionsButton should not be rendered when moreActions not applied');
  await t
    .expect(refreshButton.exists)
    .notOk('RefreshButton should not be rendered when onRefresh callback not applied');
  await t.expect(checkbox.exists).notOk('Checkbox should not be rendered when bulk actions not applied');
});

test.page(
  getPage({
    showBulkActions: true,
    checked: true,
    showOnRefresh: true,
    showAfterActions: true,
    showMoreActions: true,
  }),
)(`Should control by keyboard`, async t => {
  const {
    search,
    checkbox,
    moreActionsButton,
    refreshButton,
    option,
    confirmAction,
    rejectAction,
    moreBulkActionsButton,
    deactivateAction,
  } = getSelectors();

  await t.expect(search.visible).ok();

  const searchInput = search.find('input');

  await t.pressKey('tab').expect(checkbox.focused).ok('Checkbox should be focused');
  await t.pressKey('tab').expect(confirmAction.focused).ok('ConfirmAction should be focused');
  await t.pressKey('tab').expect(rejectAction.focused).ok('RejectAction should be focused');
  await t.pressKey('tab').expect(moreBulkActionsButton.focused).ok('MoreBulkActionsButton should be focused');
  await t.pressKey('down').expect(deactivateAction.focused).ok('DeactivateAction should be focused');
  await t.pressKey('up up').expect(moreBulkActionsButton.focused).ok('MoreBulkActionsButton should be focused');

  await t.pressKey('tab').expect(refreshButton.focused).ok('RefreshButton should be focused');
  await t.pressKey('tab').expect(searchInput.focused).ok('Search should be focused');
  await t.pressKey('tab').expect(searchInput.focused).notOk('Search should not be focused');
  await t.pressKey('tab').expect(moreActionsButton.focused).notOk('MoreActionsButton should not be focused');
  await t.pressKey('tab').expect(moreActionsButton.focused).ok('MoreActionsButton should be focused');
  await t.pressKey('down').expect(option.focused).ok('Option should be focused');
  await t.pressKey('up up').expect(moreActionsButton.focused).ok('MoreActionsButton should be focused');
});

test.page(getPage({ value: '' }))(`Should change input value & call onSubmit callback by Enter`, async t => {
  const { search, submitToaster } = getSelectors();

  const searchInput = search.find('input');

  await t.click(searchInput).pressKey('O').expect(searchInput.value).eql('O');

  await t.pressKey('enter').expect(submitToaster.exists).ok('SubmitToaster not present after enter click');
});

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true, showManyBulkActions: false }))(
  `Should show all bulk actions without droplist `,
  async t => {
    const { confirmAction, rejectAction, deleteAction, moreBulkActionsButton } = getSelectors();

    await t.expect(confirmAction.exists).ok('ConfirmAction should be rendered when bulk actions present');
    await t.expect(rejectAction.exists).ok('RejectAction should be rendered when bulk actions present');
    await t.expect(deleteAction.exists).ok('DeleteAction should be rendered when bulk actions present');
    await t.expect(moreBulkActionsButton.exists).notOk('MoreActionsButton should not be rendered when <= 3 actions');
  },
);

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true, showManyBulkActions: false }))(
  `Should show all bulk actions without droplist`,
  async t => {
    const { confirmAction, rejectAction, deleteAction, moreBulkActionsButton } = getSelectors();

    await t.expect(confirmAction.exists).ok('ConfirmAction should be rendered when bulk actions present');
    await t.expect(rejectAction.exists).ok('RejectAction should be rendered when bulk actions present');
    await t.expect(deleteAction.exists).ok('DeleteAction should be rendered when bulk actions present');
    await t.expect(moreBulkActionsButton.exists).notOk('MoreActionsButton should not be rendered when <= 3 actions');
  },
);

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true, showManyBulkActions: true }))(
  `Should show bulk actions with droplist`,
  async t => {
    const { confirmAction, rejectAction, deleteAction, deactivateAction, disabledAction, moreBulkActionsButton } =
      getSelectors();

    await t.expect(confirmAction.exists).ok('ConfirmAction should be rendered when bulk actions present');
    await t.expect(rejectAction.exists).ok('RejectAction should be rendered when bulk actions present');
    await t.expect(deleteAction.exists).ok('DeleteAction should be rendered when bulk actions present');
    await t.expect(moreBulkActionsButton.exists).ok('MoreActionsButton should not be rendered when <= 3 actions');

    await t.click(moreBulkActionsButton);

    await t.expect(deactivateAction.exists).ok('DeactivateAction should be rendered when bulk actions present');
    await t.expect(disabledAction.exists).ok('DisabledAction should be rendered when bulk actions present');
  },
);

test.page(getPage({ indeterminate: false, checked: false, showBulkActions: true }))(
  `Should not show bulk actions when not checked`,
  async t => {
    await t.expect(getSelectors().bulkActions.exists).notOk('BulkActions should not be rendered when not checked');
  },
);

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true }))(
  `Should show bulk actions when checked`,
  async t => {
    await t.expect(getSelectors().bulkActions.exists).ok('BulkActions should be rendered when checked');
  },
);

test.page(getPage({ indeterminate: true, checked: false, showBulkActions: true }))(
  `Should show bulk actions when indeterminate`,
  async t => {
    await t.expect(getSelectors().bulkActions.exists).ok('BulkActions should be rendered when indeterminate');
  },
);

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true }))(
  `Should trigger active bulk actions`,
  async t => {
    const { confirmAction, confirmToaster, deactivateAction, deactivateToaster, moreBulkActionsButton } =
      getSelectors();

    await t.click(confirmAction).expect(confirmToaster.exists).ok('ConfirmToaster should be shown');

    await t
      .click(moreBulkActionsButton)
      .click(deactivateAction)
      .expect(deactivateToaster.exists)
      .ok('DeactivateToaster should be shown');
  },
);

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true }))(
  `Should not trigger disabled bulk actions`,
  async t => {
    const { deleteAction, deleteToaster, disabledAction, disabledToaster, moreBulkActionsButton } = getSelectors();

    await t.click(deleteAction).expect(deleteToaster.exists).notOk('DeleteToaster should not be shown');

    await t
      .click(moreBulkActionsButton)
      .click(disabledAction)
      .expect(disabledToaster.exists)
      .notOk('DisabledToaster should not be shown');
  },
);

test.page(getPage({ indeterminate: false, checked: true, showBulkActions: true }))(
  `Should show tooltip on bulk actions`,
  async t => {
    const { deleteAction, deleteActionTooltip, disabledAction, disabledActionTooltip, moreBulkActionsButton } =
      getSelectors();

    await t.hover(deleteAction).expect(deleteActionTooltip.exists).ok('DeleteActionTooltip should be shown');

    await t
      .click(moreBulkActionsButton)
      .hover(disabledAction)
      .expect(disabledActionTooltip.exists)
      .ok('DisabledActionTooltip should be shown');
  },
);
