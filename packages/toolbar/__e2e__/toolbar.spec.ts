import { expect, Locator, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS, TEST_ID_TOASTER } from '../stories/testIds';

const TEST_ID = 'toolbar-test';

test.describe('Toolbar', () => {
  function getSelectors(getByTestId: (testId: string) => Locator) {
    return {
      search: getByTestId(TEST_IDS.search),
      checkbox: getByTestId(TEST_IDS.checkbox),
      bulkActions: getByTestId(TEST_IDS.bulkActions),
      confirmAction: getByTestId(TEST_IDS.confirmAction),
      rejectAction: getByTestId(TEST_IDS.rejectAction),
      deleteAction: getByTestId(TEST_IDS.deleteAction),
      deactivateAction: getByTestId(TEST_IDS.deactivateAction),
      disabledAction: getByTestId(TEST_IDS.disabledAction),
      moreBulkActionsButton: getByTestId(TEST_IDS.moreBulkActionsButton),
      refreshButton: getByTestId(TEST_IDS.refreshButton),
      moreActionsButton: getByTestId(TEST_IDS.moreActionsButton),
      droplist: getByTestId(TEST_IDS.droplist),
      option: getByTestId(TEST_IDS.option),
      submitToaster: getByTestId(TEST_ID_TOASTER.submit),
      refreshToaster: getByTestId(TEST_ID_TOASTER.refresh),
      optionToaster: getByTestId(TEST_ID_TOASTER.option),
      confirmToaster: getByTestId(TEST_ID_TOASTER.confirm),
      rejectToaster: getByTestId(TEST_ID_TOASTER.reject),
      deleteToaster: getByTestId(TEST_ID_TOASTER.delete),
      deactivateToaster: getByTestId(TEST_ID_TOASTER.deactivate),
      disabledToaster: getByTestId(TEST_ID_TOASTER.disabled),
      deleteActionTooltip: getByTestId(`${TEST_IDS.deleteAction}-tooltip`),
      disabledActionTooltip: getByTestId(`${TEST_IDS.disabledAction}-tooltip`),
      after: getByTestId(TEST_IDS.after),
      filterRow: getByTestId(TEST_IDS.filterRow),
      filterButton: getByTestId(TEST_IDS.filterButton),
      filterButtonCounter: getByTestId(`${TEST_IDS.filterButton}__counter`),
      filterRowAddButton: getByTestId('chip-choice-row__add-button'),
      filterRowPinnedSingleFilter: getByTestId(STORY_TEST_IDS.pinnedSingleFilter),
      filterRowPinnedMultiFilter: getByTestId(STORY_TEST_IDS.pinnedMultiFilter),
      filterRowSingleFilter: getByTestId(STORY_TEST_IDS.singleFilter),
      filterRowValue: (selector: Locator) =>
        selector.locator(`[data-test-id="chip-choice__value"]`).locator(`[data-test-id="full-text"]`),
      filterRowAddListSingleFilter: getByTestId(`chip-choice-row__add-button-option-${STORY_TEST_IDS.singleFilter}`),
      filterRowDateFilter: getByTestId(STORY_TEST_IDS.dateFilter),
      filterRowAddListDateFilter: getByTestId(`chip-choice-row__add-button-option-${STORY_TEST_IDS.dateFilter}`),
      singleFilterItem: (optionId: string) => getByTestId(`list__base-item_${optionId}`),
      singleFilterApplyButton: getByTestId(`chip-choice__approve-button`),
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
    test(message, async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'toolbar',
        props: {
          'data-test-id': TEST_ID,
          showBulkActions: false,
          showOnRefresh: false,
          showSearch: false,
          showAfterActions: false,
          showFilters: false,
          filterRowOpened: false,
          showMoreActions: false,
          ...pageProps,
          selectionMode: pageProps.showCheckbox ? 'multiple' : 'single',
        },
      });
      const { search, checkbox, moreActionsButton, after, refreshButton, filterButton, filterRow } =
        getSelectors(getByTestId);
      const {
        showCheckbox,
        showOnRefresh,
        showSearch,
        showAfterActions,
        showFilters,
        filterRowOpened,
        showMoreActions,
      } = pageProps;

      const checkItem = async (element: Locator, elementName: string, condition?: boolean) => {
        if (condition) {
          await expect(element, `${elementName} should be rendered when applied`).toBeVisible();
        } else {
          await expect(element, `${elementName} should not be rendered when not applied`).not.toBeVisible();
        }
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

  test(`Should control by keyboard`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        showCheckbox: true,
        checked: true,
        showOnRefresh: true,
        showAfterActions: true,
        showMoreActions: true,
        showFilters: true,
      },
    });
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
    } = getSelectors(getByTestId);

    await expect(search).toBeVisible();

    const searchInput = search.locator('input');

    await page.keyboard.press('Tab');
    await expect(checkbox).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(confirmAction).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(rejectAction).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(moreBulkActionsButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(deactivateAction).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await expect(moreBulkActionsButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(refreshButton).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(searchInput).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(searchInput).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(moreActionsButton).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(filterButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(filterRow, 'Filter row should be visible').toBeVisible();
    await page.keyboard.press('Enter');
    await expect(filterRow).not.toBeVisible();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(moreActionsButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(option.first()).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await expect(moreActionsButton).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(filterRowAddButton).toBeFocused();
    await expect(filterRowAddListSingleFilter, 'FilterRowAddButtonList should be visible').toBeVisible();
  });

  test(`Should change input value & call onSubmit callback by Enter`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        value: '',
      },
    });
    const { search, submitToaster } = getSelectors(getByTestId);

    const searchInput = search.locator('input');

    await searchInput.click();
    await searchInput.press('O');
    await expect(searchInput).toHaveValue('O');

    await page.keyboard.press('Enter');
    await expect(submitToaster, 'SubmitToaster not present after enter click').toBeVisible();
  });

  test(`Should show all bulk actions without droplist `, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
        showManyBulkActions: false,
      },
    });
    const { confirmAction, rejectAction, deleteAction, moreBulkActionsButton } = getSelectors(getByTestId);

    await expect(confirmAction, 'ConfirmAction should be rendered when bulk actions present').toBeVisible();
    await expect(rejectAction, 'RejectAction should be rendered when bulk actions present').toBeVisible();
    await expect(deleteAction, 'DeleteAction should be rendered when bulk actions present').toBeVisible();
    await expect(moreBulkActionsButton, 'MoreActionsButton should not be rendered when <= 3 actions').not.toBeVisible();
  });

  test(`Should show all bulk actions without droplist`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
        showManyBulkActions: false,
      },
    });
    const { confirmAction, rejectAction, deleteAction, moreBulkActionsButton } = getSelectors(getByTestId);

    await expect(confirmAction, 'ConfirmAction should be rendered when bulk actions present').toBeVisible();
    await expect(rejectAction, 'RejectAction should be rendered when bulk actions present').toBeVisible();
    await expect(deleteAction, 'DeleteAction should be rendered when bulk actions present').toBeVisible();
    await expect(moreBulkActionsButton, 'MoreActionsButton should not be rendered when <= 3 actions').not.toBeVisible();
  });

  test(`Should show bulk actions with droplist`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
        showManyBulkActions: true,
      },
    });
    const { confirmAction, rejectAction, deleteAction, deactivateAction, disabledAction, moreBulkActionsButton } =
      getSelectors(getByTestId);

    await expect(confirmAction).toBeVisible();
    await expect(rejectAction).toBeVisible();
    await expect(deleteAction).toBeVisible();
    await expect(moreBulkActionsButton, 'MoreActionsButton should be rendered when > 3 actions').toBeVisible();

    await moreBulkActionsButton.click();

    await expect(deactivateAction, 'DeactivateAction should be rendered when bulk actions present').toBeVisible();
    await expect(disabledAction, 'DisabledAction should be rendered when bulk actions present').toBeVisible();
  });

  test(`Should not show bulk actions when not checked`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: false,
        showBulkActions: true,
      },
    });
    await expect(
      getSelectors(getByTestId).bulkActions,
      'BulkActions should not be rendered when not checked',
    ).not.toBeVisible();
  });

  test(`Should show bulk actions when checked`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
      },
    });
    await expect(getSelectors(getByTestId).bulkActions).toBeVisible();
  });

  test(`Should show bulk actions when indeterminate`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: true,
        checked: false,
        showBulkActions: true,
      },
    });
    await expect(getSelectors(getByTestId).bulkActions).toBeVisible();
  });

  test(`Should trigger active bulk actions`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
      },
    });
    const { confirmAction, confirmToaster, deactivateAction, deactivateToaster, moreBulkActionsButton } =
      getSelectors(getByTestId);

    await confirmAction.click();
    await expect(confirmToaster, 'ConfirmToaster should be shown').toBeVisible();

    await moreBulkActionsButton.click();
    await deactivateAction.click();
    await expect(deactivateToaster, 'DeactivateToaster should be shown').toBeVisible();
  });

  test(`Should not trigger disabled bulk actions`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
      },
    });
    const { deleteAction, deleteToaster, disabledAction, disabledToaster, moreBulkActionsButton } =
      getSelectors(getByTestId);

    await deleteAction.click({ force: true });
    await expect(deleteToaster, 'DeleteToaster should not be shown').not.toBeVisible();

    await moreBulkActionsButton.click();
    await disabledAction.click({ force: true });
    await expect(disabledToaster, 'DisabledToaster should not be shown').not.toBeVisible();
  });

  test(`Should show tooltip on bulk actions`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        indeterminate: false,
        checked: true,
        showBulkActions: true,
      },
    });
    const { deleteAction, deleteActionTooltip, disabledAction, disabledActionTooltip, moreBulkActionsButton } =
      getSelectors(getByTestId);

    await deleteAction.hover();
    await expect(deleteActionTooltip, 'DeleteActionTooltip should be shown').toBeVisible();

    await moreBulkActionsButton.click();
    await disabledAction.hover();
    await expect(disabledActionTooltip, 'DisabledActionTooltip should be shown').toBeVisible();
  });

  test('Should show active filter number in filter button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        showFilters: true,
      },
    });
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
    } = getSelectors(getByTestId);

    await filterButton.click();
    await expect(filterRow, 'Filter row not rendered').toBeVisible();
    await filterButton.click();
    await expect(filterRow, "Filter row rendered although shouldn't").not.toBeVisible();

    await filterButton.click();

    await filterRowAddButton.click();
    await filterRowAddListDateFilter.click();
    await filterRowAddButton.click();
    await filterRowAddListSingleFilter.click();
    await singleFilterItem('1').click();
    await singleFilterApplyButton.click();
    await filterRowPinnedSingleFilter.click();
    await singleFilterItem('1').click();

    await expect(filterButtonCounter).toHaveText('2');
  });

  test('Should keep added chips after toggling filter button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        showFilters: true,
      },
    });
    const {
      filterButton,
      filterRowAddButton,
      filterRowDateFilter,
      filterRowAddListDateFilter,
      filterRowSingleFilter,
      filterRowAddListSingleFilter,
      singleFilterItem,
      singleFilterApplyButton,
    } = getSelectors(getByTestId);

    await filterButton.click();
    await filterRowAddButton.click();
    await filterRowAddListDateFilter.click();
    await filterRowAddButton.click();
    await filterRowAddListSingleFilter.click();
    await singleFilterItem('1').click();
    await singleFilterApplyButton.click();

    await filterButton.click();
    await filterButton.click();

    await expect(filterRowSingleFilter, 'Single filter chip should exist').toBeVisible();
    await expect(filterRowDateFilter, 'Date filter chip should exist').toBeVisible();
  });

  test('Should persist and restore filter and search state', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        enablePersist: true,
        showSearch: true,
        showFilters: true,
      },
    });
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
    } = getSelectors(getByTestId);

    const searchText = 'test search value';
    const localStorageKey = 'toolbar_filters_story_filter';

    const searchInput = search.locator('input');

    // Очищаем localStorage перед началом теста
    await page.evaluate(key => localStorage.removeItem(key), localStorageKey);

    await filterButton.click();
    await expect(filterRow, 'Filter row should be visible').toBeVisible();

    await searchInput.fill(searchText);

    // Выбираем айтемы в существующих фильтрах
    await filterRowPinnedSingleFilter.click();
    await singleFilterItem('2').click();
    await filterRowPinnedMultiFilter.click();
    await singleFilterItem('3').click();
    await filterRowPinnedMultiFilter.click();

    // Добавляем фильтр новый single-фильтр
    await filterRowAddButton.click();
    await filterRowAddListSingleFilter.click();
    await singleFilterItem('1').click();
    await singleFilterApplyButton.click();

    // Проверяем, что данные сохранились в localStorage
    const localStorageData = await page.evaluate(key => localStorage.getItem(key), localStorageKey);
    expect(localStorageData).not.toEqual(null);

    // Перезагружаем страницу и открываем фильтр
    await gotoStory({
      name: 'toolbar',
      props: {
        'data-test-id': TEST_ID,
        enablePersist: true,
        showSearch: true,
        showFilters: true,
      },
    });
    await filterButton.click();
    await expect(filterRow, 'Filter row should be visible').toBeVisible();

    // Проверяем счетчик на кнопке фильтра
    await expect(filterButtonCounter).toHaveText('3');

    // Проверяем, что состояние восстановлено
    const restoredSearchValue = await searchInput.inputValue();
    expect(restoredSearchValue).toEqual(searchText);

    const pinnedSingleFilterText = await filterRowValue(filterRowPinnedSingleFilter).textContent();
    expect(pinnedSingleFilterText).toContain('2');
    const pinnedMultiFilterText = await filterRowValue(filterRowPinnedMultiFilter).textContent();
    expect(pinnedMultiFilterText).toContain('3');

    await expect(filterRowSingleFilter, 'Single filter should be restored').toBeVisible();
    const singleFilterText = await filterRowValue(filterRowSingleFilter).textContent();
    expect(singleFilterText).toContain('1');
  });
});
