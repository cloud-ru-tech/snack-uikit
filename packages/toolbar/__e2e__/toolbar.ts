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
    deleteButton: Selector(dataTestIdSelector(TEST_IDS.deleteButton)),
    refreshButton: Selector(dataTestIdSelector(TEST_IDS.refreshButton)),
    moreActionsButton: Selector(dataTestIdSelector(TEST_IDS.moreActionsButton)),
    droplist: Selector(dataTestIdSelector(TEST_IDS.droplist)),
    option: Selector(dataTestIdSelector(TEST_IDS.option)),
    submitToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.submit)),
    deleteToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.delete)),
    refreshToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.refresh)),
    optionToaster: Selector(dataTestIdSelector(TEST_ID_TOASTER.option)),
    after: Selector(dataTestIdSelector(TEST_IDS.after)),
    before: Selector(dataTestIdSelector(TEST_IDS.before)),
  };
}

test.page(
  getPage({
    showCheckbox: true,
    showOnDelete: true,
    showOnRefresh: true,
    showAfterActions: true,
    showBeforeActions: true,
    showMoreActions: true,
  }),
)(`Should render all items`, async t => {
  const { search, checkbox, moreActionsButton, before, after, refreshButton, deleteButton } = getSelectors();

  await t.expect(search.exists).ok('Search should be render');
  await t.expect(checkbox.exists).ok('Checkbox should be render when checked & onCheck applied');
  await t.expect(after.exists).ok('After search should be rendered when applied');
  await t.expect(before.exists).ok('Before search should be rendered when not applied');
  await t.expect(moreActionsButton.exists).ok('MoreActionsButton should be render when moreActions applied');
  await t.expect(refreshButton.exists).ok('RefreshButton should be render when onRefresh callback applied');
  await t.expect(deleteButton.exists).ok('DeleteButton should be render when onDelete callback applied');
});

test.page(
  getPage({
    showCheckbox: false,
    showOnDelete: false,
    showOnRefresh: false,
    showAfterActions: false,
    showBeforeActions: false,
    showMoreActions: false,
  }),
)(`Should render only search`, async t => {
  const { search, checkbox, moreActionsButton, before, after, refreshButton, deleteButton } = getSelectors();

  await t.expect(search.exists).ok('Search should be render');
  await t.expect(checkbox.exists).notOk('Checkbox should not be render when checked & onCheck not applied');
  await t.expect(after.exists).notOk('Actions should be not render when actions not applied');
  await t.expect(before.exists).notOk('Actions should be not render when actions not applied');
  await t.expect(moreActionsButton.exists).notOk('MoreActionsButton should not be render when moreActions not applied');
  await t.expect(refreshButton.exists).notOk('RefreshButton should not be render when onRefresh callback not applied');
  await t.expect(deleteButton.exists).notOk('DeleteButton should not be render when onDelete callback not applied');
});

test.page(
  getPage({
    showCheckbox: false,
    showOnDelete: false,
    showOnRefresh: false,
    showSearch: false,
    showAfterActions: false,
    showBeforeActions: false,
    showMoreActions: false,
  }),
)(`Should render without search`, async t => {
  const { search, checkbox, moreActionsButton, before, after, refreshButton, deleteButton } = getSelectors();

  await t.expect(search.exists).notOk('Search should not be render');
  await t.expect(checkbox.exists).notOk('Checkbox should not be render when checked & onCheck not applied');
  await t.expect(after.exists).notOk('Actions should be not render when actions not applied');
  await t.expect(before.exists).notOk('Actions should be not render when actions not applied');
  await t.expect(moreActionsButton.exists).notOk('MoreActionsButton should not be render when moreActions not applied');
  await t.expect(refreshButton.exists).notOk('RefreshButton should not be render when onRefresh callback not applied');
  await t.expect(deleteButton.exists).notOk('DeleteButton should not be render when onDelete callback not applied');
});

test.page(
  getPage({
    checked: true,
    showCheckbox: true,
    showOnDelete: true,
    showOnRefresh: true,
    showAfterActions: true,
    showMoreActions: true,
  }),
)(`Should control by keyboard`, async t => {
  const { search, checkbox, moreActionsButton, refreshButton, deleteButton, option } = getSelectors();

  const searchInput = search.find('input');

  await t.pressKey('tab').expect(checkbox.focused).ok('Checkbox should be focused');
  await t.pressKey('tab').expect(deleteButton.focused).ok('DeleteButton should be focused');
  await t.pressKey('tab').expect(refreshButton.focused).ok('RefreshButton should be focused');
  await t.pressKey('tab').expect(searchInput.focused).ok('Search should be focused');
  await t.pressKey('tab').expect(searchInput.focused).notOk('Search should not be focused');
  await t.pressKey('tab').expect(moreActionsButton.focused).notOk('MoreActionsButton should not be focused');
  await t.pressKey('tab').expect(moreActionsButton.focused).ok('MoreActionsButton should be focused');
  await t.pressKey('down').expect(option.focused).ok('Option should be focused');
  await t.pressKey('up').expect(moreActionsButton.focused).ok('MoreActionsButton should be focused');
});

test.page(
  getPage({
    indeterminate: true,
    checked: false,
    showCheckbox: true,
    showOnDelete: true,
  }),
)(`DeleteButton should be available according to checked state`, async t => {
  const { checkbox, deleteButton, deleteToaster } = getSelectors();

  await t
    .click(deleteButton)
    .expect(deleteToaster.exists)
    .ok('DeleteButton should be available in indeterminate checkbox state');

  await t
    .click(checkbox)
    .click(deleteButton)
    .expect(deleteToaster.exists)
    .ok('DeleteButton should be available in checked checkbox state');

  await t
    .click(checkbox)
    .click(deleteButton)
    .expect(deleteToaster.exists)
    .notOk('DeleteButton should not be available in not checked checkbox state');
});

test.page(
  getPage({
    value: '',
  }),
)(`Should change input value & call onSubmit callback by Enter`, async t => {
  const { search, submitToaster } = getSelectors();

  const searchInput = search.find('input');

  await t.click(searchInput).pressKey('O').expect(searchInput.value).eql('O');

  await t.pressKey('enter').expect(submitToaster.exists).ok('SubmitToaster not present after enter click');
});
