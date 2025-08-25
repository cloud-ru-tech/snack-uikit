import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS, TEST_ID_TOASTER } from '../stories/testIds';

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
    filterRow: Selector(dataTestIdSelector(TEST_IDS.filterRow)),
    filterButton: Selector(dataTestIdSelector(TEST_IDS.filterButton)),
    filterButtonCounter: Selector(dataTestIdSelector(`${TEST_IDS.filterButton}__counter`)),
    filterRowAddButton: Selector(dataTestIdSelector('chip-choice-row__add-button')),
    filterRowPinnedSingleFilter: Selector(dataTestIdSelector(STORY_TEST_IDS.pinnedSingleFilter)),
    filterRowPinnedMultiFilter: Selector(dataTestIdSelector(STORY_TEST_IDS.pinnedMultiFilter)),
    filterRowSingleFilter: Selector(dataTestIdSelector(STORY_TEST_IDS.singleFilter)),
    filterRowValue: (selector: Selector) =>
      selector.find(dataTestIdSelector('chip-choice__value')).find(dataTestIdSelector('full-text')),
    filterRowAddListSingleFilter: Selector(
      dataTestIdSelector(`chip-choice-row__add-button-option-${STORY_TEST_IDS.singleFilter}`),
    ),
    filterRowDateFilter: Selector(dataTestIdSelector(STORY_TEST_IDS.dateFilter)),
    filterRowAddListDateFilter: Selector(
      dataTestIdSelector(`chip-choice-row__add-button-option-${STORY_TEST_IDS.dateFilter}`),
    ),
    singleFilterItem: (optionId: string) => Selector(dataTestIdSelector(`list__base-item_${optionId}`)),
    singleFilterApplyButton: Selector(dataTestIdSelector(`chip-choice__approve-button`)),
  };
}

function verifyElementRender(
  message: string,
  pageProps: {
    showCheckbox?: boolean;
    showOnRefresh?: boolean;
    showSearch?: boolean;
    showAfterActions?: boolean;
    showFilters?: boolean;
    filterRowOpened?: boolean;
    showMoreActions?: boolean;
  },
) {
  test.page(
    getPage({
      showBulkActions: false,
      showOnRefresh: false,
      showSearch: false,
      showAfterActions: false,
      showFilters: false,
      filterRowOpened: false,
      showMoreActions: false,
      ...pageProps,
      selectionMode: pageProps.showCheckbox ? 'multiple' : 'single',
    }),
  )(message, async t => {
    const { search, checkbox, moreActionsButton, after, refreshButton, filterButton, filterRow } = getSelectors();
    const { showCheckbox, showOnRefresh, showSearch, showAfterActions, showFilters, filterRowOpened, showMoreActions } =
      pageProps;

    const checkItem = async (element: Selector, elementName: string, condition?: boolean) => {
      const not = condition ? 'not ' : '';
      await t
        .expect(element.exists)
        [condition ? 'ok' : 'notOk'](`${elementName} should ${not}be rendered when ${not}applied`);
    };

    await checkItem(checkbox, 'Checkbox', showCheckbox);
    await checkItem(refreshButton, 'RefreshButton', showOnRefresh);
    await checkItem(search, 'Search', showSearch);
    await checkItem(after, 'After', showAfterActions);
    await checkItem(filterButton, 'FilterButton', showFilters);
    await checkItem(filterRow, 'FilterRow', filterRowOpened);
    await checkItem(moreActionsButton, 'MoreActionsButton', showMoreActions);
  });
}

verifyElementRender('Should render all items', {
  showCheckbox: true,
  showOnRefresh: true,
  showSearch: true,
  showAfterActions: true,
  showFilters: true,
  filterRowOpened: true,
  showMoreActions: true,
});

verifyElementRender('Should render checkbox only', { showCheckbox: true });
verifyElementRender('Should render refresh button only', { showOnRefresh: true });
verifyElementRender('Should render search only', { showSearch: true });
verifyElementRender('Should render after actions only', { showAfterActions: true });
verifyElementRender('Should render filter button only', { showFilters: true });
verifyElementRender('Should render filter button & filter row', { showFilters: true, filterRowOpened: true });
verifyElementRender('Should render more actions only', { showMoreActions: true });

test.page(
  getPage({
    showCheckbox: true,
    checked: true,
    showOnRefresh: true,
    showAfterActions: true,
    showMoreActions: true,
    showFilters: true,
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
    filterButton,
    filterRow,
    filterRowAddButton,
    filterRowAddListSingleFilter,
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
  await t.pressKey('tab').expect(filterButton.focused).ok('FilterButton should be focused');
  await t.pressKey('enter').expect(filterRow.exists).ok('Filter row not rendered');
  await t.pressKey('enter').expect(filterRow.exists).notOk("Filter row rendered although shouldn't");
  await t.pressKey('enter tab').expect(moreActionsButton.focused).ok('MoreActionsButton should be focused');
  await t.pressKey('down').expect(option.focused).ok('Option should be focused');
  await t.pressKey('up up').expect(moreActionsButton.focused).ok('MoreActionsButton should be focused');
  await t.pressKey('tab tab tab').expect(filterRowAddButton.focused).ok('FilterRowAddButton should be focused');
  await t.expect(filterRowAddListSingleFilter.exists).ok('FilterRowAddButtonList should be visible');
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

test.page(getPage({ showFilters: true }))('Should show active filter number in filter button', async t => {
  const {
    filterButton,
    filterRow,
    filterRowAddButton,
    filterRowAddListDateFilter,
    filterRowAddListSingleFilter,
    singleFilterItem,
    singleFilterApplyButton,
    filterRowPinnedSingleFilter,
    filterButtonCounter,
  } = getSelectors();

  await t.click(filterButton).expect(filterRow.exists).ok('Filter row not rendered');
  await t.click(filterButton).expect(filterRow.exists).notOk("Filter row rendered although shouldn't");

  await t.click(filterButton);

  await t.click(filterRowAddButton).click(filterRowAddListDateFilter);
  await t
    .click(filterRowAddButton)
    .click(filterRowAddListSingleFilter)
    .click(singleFilterItem('1'))
    .click(singleFilterApplyButton);
  await t.click(filterRowPinnedSingleFilter).click(singleFilterItem('1'));

  await t.expect(filterButtonCounter.textContent).eql('2');
});

test.page(getPage({ showFilters: true }))('Should keep added chips after toggling filter button', async t => {
  const {
    filterButton,
    filterRowAddButton,
    filterRowDateFilter,
    filterRowAddListDateFilter,
    filterRowSingleFilter,
    filterRowAddListSingleFilter,
    singleFilterItem,
    singleFilterApplyButton,
  } = getSelectors();

  await t.click(filterButton);
  await t.click(filterRowAddButton).click(filterRowAddListDateFilter);
  await t
    .click(filterRowAddButton)
    .click(filterRowAddListSingleFilter)
    .click(singleFilterItem('1'))
    .click(singleFilterApplyButton);

  await t.click(filterButton).click(filterButton);

  await t.expect(filterRowSingleFilter.exists).ok('Single filter chip should exist');
  await t.expect(filterRowDateFilter.exists).ok('Date filter chip should exist');
});

test.page(getPage({ enablePersist: true, showSearch: true, showFilters: true }))(
  'Should persist and restore filter and search state',
  async t => {
    const {
      search,
      filterButton,
      filterButtonCounter,
      filterRow,
      singleFilterItem,
      filterRowPinnedSingleFilter,
      filterRowPinnedMultiFilter,
      filterRowAddButton,
      filterRowAddListSingleFilter,
      singleFilterApplyButton,
      filterRowSingleFilter,
      filterRowValue,
    } = getSelectors();

    const searchText = 'test search value';
    const localStorageKey = 'toolbar_filters_story_filter';

    const searchInput = search.find('input');

    // Очищаем localStorage перед началом теста
    await t.eval(() => localStorage.removeItem(localStorageKey), { dependencies: { localStorageKey } });

    await t.click(filterButton).expect(filterRow.exists).ok('Filter row should be visible');

    await t.typeText(searchInput, searchText, { replace: true });

    // Выбираем айтемы в существующих фильтрах
    await t.click(filterRowPinnedSingleFilter).click(singleFilterItem('2'));
    await t.click(filterRowPinnedMultiFilter).click(singleFilterItem('3')).click(filterRowPinnedMultiFilter);

    // Добавляем фильтр новый single-фильтр
    await t
      .click(filterRowAddButton)
      .click(filterRowAddListSingleFilter)
      .click(singleFilterItem('1'))
      .click(singleFilterApplyButton);

    // Проверяем, что данные сохранились в localStorage
    const localStorageData = await t.eval(() => localStorage.getItem(localStorageKey), {
      dependencies: { localStorageKey },
    });
    await t.expect(localStorageData).notEql(null, 'Data should be saved to localStorage');

    // Перезагружаем страницу и открываем фильтр
    await t.navigateTo(getPage({ enablePersist: true, showSearch: true, showFilters: true }));
    await t.click(filterButton).expect(filterRow.exists).ok('Filter row should be visible');

    // Проверяем счетчик на кнопке фильтра
    await t.expect(filterButtonCounter.textContent).eql('3', 'Filter counter should show 2 active filters');

    // Проверяем, что состояние восстановлено
    const restoredSearchValue = await searchInput.value;
    await t.expect(restoredSearchValue).eql(searchText, 'Search value should be restored');

    await t.expect(filterRowValue(filterRowPinnedSingleFilter).textContent).contains('2');
    await t.expect(filterRowValue(filterRowPinnedMultiFilter).textContent).contains('3');

    await t.expect(filterRowSingleFilter.exists).ok('Single filter should be restored');
    await t.expect(filterRowValue(filterRowSingleFilter).textContent).contains('1');
  },
);
