import { expect, test } from '../../../playwright/fixtures';
import { dataTestIdSelector } from '../../../playwright/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from '../stories/constants';
import { COLUMNS_SETTINGS_OPTIONS, DATA_ATTRIBUTES, RowsSelectionValidator, selectors } from './utils';

const ROWS_AMOUNT = 30;
const SUB_ROWS_AMOUNT = 3;
const SUB_ROWS_LEVEL = 3;

test.describe('Table', () => {
  test('Renders correctly with proper amount of rows, has pinnedCells and Status column with label', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        pageSize: ROWS_AMOUNT,
        showTableTree: false,
      },
    });
    await expect(getByTestId(STORY_TEST_IDS.table)).toBeVisible();

    const { row, statusIndicator, statusLabel, pinnedCells } = selectors.getRow(page, 'all');

    const rowCount = await row.count();
    expect(rowCount).toEqual(ROWS_AMOUNT);

    await expect(pinnedCells.left.first()).toBeVisible();
    await expect(pinnedCells.right.first()).toBeVisible();

    await expect(statusIndicator.first()).toBeVisible();
    await expect(statusLabel.first()).toBeVisible();
  });

  test('Renders correctly with search & filters', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        suppressToolbar: false,
        suppressSearch: false,
        showFilters: true,
      },
    });
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow(page, 'all');

    await expect(toolbar).toBeVisible();
    await expect(toolbarSearch).toBeVisible();
    await expect(toolbarFilterButton).toBeVisible();
    await expect(toolbarFilterRow).toBeVisible();

    await toolbarFilterButton.click();

    await expect(toolbarFilterRow).not.toBeVisible();
  });

  test('Renders correctly with search only', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        suppressToolbar: false,
        suppressSearch: false,
        showFilters: false,
      },
    });
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow(page, 'all');

    await expect(toolbar).toBeVisible();
    await expect(toolbarSearch).toBeVisible();
    await expect(toolbarFilterButton).not.toBeVisible();
    await expect(toolbarFilterRow).not.toBeVisible();
  });

  test('Renders correctly with filters only', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        suppressToolbar: false,
        suppressSearch: true,
        showFilters: true,
      },
    });
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow(page, 'all');

    await expect(toolbar).toBeVisible();
    await expect(toolbarSearch).not.toBeVisible();
    await expect(toolbarFilterButton).toBeVisible();
    await expect(toolbarFilterRow).toBeVisible();

    await toolbarFilterButton.click();

    await expect(toolbarFilterRow).not.toBeVisible();
  });

  test('Renders without search & filters', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        suppressToolbar: true,
        suppressSearch: false,
        showFilters: true,
      },
    });
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow(page, 'all');

    await expect(toolbar).not.toBeVisible();
    await expect(toolbarSearch).not.toBeVisible();
    await expect(toolbarFilterButton).not.toBeVisible();
    await expect(toolbarFilterRow).not.toBeVisible();
  });

  test('Render rows with Status indicator and without label', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        statusColumnViewMode: StoryStatusColumnViewMode.Small,
      },
    });
    const { statusIndicator, statusLabel } = selectors.getRow(page, 0);

    await expect(statusIndicator).toBeVisible();
    await expect(statusLabel).not.toBeVisible();
  });

  test('Render rows without Status', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        statusColumnViewMode: '!undefined',
      },
    });
    const { statusIndicator, statusLabel } = selectors.getRow(page, 0);

    await expect(statusIndicator).not.toBeVisible();
    await expect(statusLabel).not.toBeVisible();
  });

  test('Click on column header sorts data', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        statusColumnViewMode: '!undefined',
      },
    });
    const { row } = selectors.getRow(page, 0);
    const firstRowIdBeforeSort = await row.getAttribute(DATA_ATTRIBUTES.rowId);

    const sortableHeader = page
      .locator(`${dataTestIdSelector(TEST_IDS.headerCell)}[${DATA_ATTRIBUTES.sortable}]`)
      .first();

    await expect(sortableHeader).toBeVisible();

    await sortableHeader.click();

    const sortIndicator = sortableHeader.locator(dataTestIdSelector(TEST_IDS.headerSortIndicator));

    await expect(sortIndicator).toBeVisible();

    const sortDirection = await sortIndicator.getAttribute(DATA_ATTRIBUTES.sortDirection);
    const firstRowIdAfterSort = await row.getAttribute(DATA_ATTRIBUTES.rowId);

    expect(sortDirection).toEqual('desc');
    expect(firstRowIdBeforeSort).not.toEqual(firstRowIdAfterSort);

    await sortableHeader.click();

    const sortDirectionAfterClick = await sortIndicator.getAttribute(DATA_ATTRIBUTES.sortDirection);

    expect(sortDirection).not.toEqual(sortDirectionAfterClick);

    await sortableHeader.click();

    await expect(sortIndicator).not.toBeVisible();
  });

  test('Multi row selection', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
      },
    });
    const first = selectors.getRow(page, 0);
    const second = selectors.getRow(page, 1);

    await expect(first.selectToggle).toBeVisible();

    await first.selectToggle.click();
    await second.selectToggle.click();

    const firstSelected = await first.rowSelectedAttribute;
    const secondSelected = await second.rowSelectedAttribute;
    expect(firstSelected).toEqual('true');
    expect(secondSelected).toEqual('true');
  });

  test('Multi row rowSelection.onChange callback', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
      },
    });
    const first = selectors.getRow(page, 0);
    const second = selectors.getRow(page, 1);

    await first.selectToggle.click();
    const selectedState1 = await selectors.getSelectedState(page).textContent();
    expect(selectedState1).toEqual('{"0":true}');

    await second.selectToggle.click();
    const selectedState2 = await selectors.getSelectedState(page).textContent();
    expect(selectedState2).toEqual('{"0":true,"1":true}');

    await first.selectToggle.click();
    const selectedState3 = await selectors.getSelectedState(page).textContent();
    expect(selectedState3).toEqual('{"1":true}');
  });

  test('Multi row bulk selection and deselection with shift key applied', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
      },
    });
    const validator = new RowsSelectionValidator(page, selectors);

    // Select initial range
    await validator.getRow('First').selectToggle.click();
    await validator.getRow('Fifth').selectToggle.click({ modifiers: ['Shift'] });
    await validator.validateRangeSelectionStatus(['First', 'Fifth'], 'true');

    // Add more fields to selected range
    await validator.getRow('Seventh').selectToggle.click({ modifiers: ['Shift'] });
    await validator.validateRangeSelectionStatus(['First', 'Seventh'], 'true');

    // Decrease amount of selected fields
    await validator.getRow('Fourth').selectToggle.click({ modifiers: ['Shift'] });
    await validator.validateRangeSelectionStatus(['First', 'Third'], 'true');
    await validator.validateRangeSelectionStatus(['Fourth', 'Seventh'], 'false');

    // Add more fields to selected range
    await validator.getRow('Ninth').selectToggle.click({ modifiers: ['Shift'] });
    await validator.validateRangeSelectionStatus(['First', 'Ninth'], 'true');

    // Select all fields
    await validator.validateRowSelectionStatus('Tenth', 'false');
    await getByTestId('toolbar__checkbox').click();
    await validator.validateRangeSelectionStatus(['First', 'Tenth'], 'true');

    // Deselect single field (5)
    await validator.getRow('Fifth').selectToggle.click();
    await validator.validateRowSelectionStatus('Fifth', 'false');
    await validator.validateRowsConfigSelectionStatus(
      [
        ['First', 'Fourth'],
        ['Sixth', 'Tenth'],
      ],
      'true',
    );

    // Deselect range while holding shift key
    await validator.getRow('Eighth').selectToggle.click();
    await validator.getRow('Tenth').selectToggle.click({ modifiers: ['Shift'] });
    await validator.validateRowsConfigSelectionStatus([['First', 'Fourth'], 'Sixth', 'Seventh'], 'true');
    await validator.validateRowsConfigSelectionStatus(['Fifth', ['Eighth', 'Tenth']], 'false');
  });

  test('Single row selection', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        rowSelectionMode: 'single',
      },
    });
    const first = selectors.getRow(page, 0);
    const second = selectors.getRow(page, 1);

    await expect(first.selectToggle).toBeVisible();

    await first.selectToggle.click();
    const firstSelected = await first.rowSelectedAttribute;
    expect(firstSelected).toEqual('true');

    await second.selectToggle.click();

    const secondSelected = await second.rowSelectedAttribute;
    const firstSelectedAfter = await first.rowSelectedAttribute;
    expect(secondSelected).toEqual('true');
    expect(firstSelectedAfter).toEqual(null);
  });

  test('Single row rowSelection.onChange callback', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        rowSelectionMode: 'single',
      },
    });
    const first = selectors.getRow(page, 0);
    const second = selectors.getRow(page, 1);

    await first.selectToggle.click();
    const selectedState1 = await selectors.getSelectedState(page).textContent();
    expect(selectedState1).toEqual('{"0":true}');

    await second.selectToggle.click();
    const selectedState2 = await selectors.getSelectedState(page).textContent();
    expect(selectedState2).toEqual('{"1":true}');

    await first.selectToggle.click();
    const selectedState3 = await selectors.getSelectedState(page).textContent();
    expect(selectedState3).toEqual('{"0":true}');
  });

  test('Disabled rows cannot be selected and have no RowActions button', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        disableSomeRows: true,
        disabledRowAppearance: 'disabled',
      },
    });
    const { row, selectToggle, rowSelectedAttribute, rowActionsButton } = selectors.getRow(page, 0, true);

    await expect(row).toBeVisible();

    const selectedAttr = await rowSelectedAttribute;
    expect(selectedAttr).toEqual(null);
    await expect(selectToggle.first()).not.toBeVisible();
    await expect(rowActionsButton.first()).not.toBeVisible();
  });

  test('Row actions exists and opens dropdown on click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
      },
    });
    const { rowActionsButton, rowActionsDropdown, rowActionsOption } = selectors.getRow(page, 0);

    await expect(rowActionsButton.first()).toBeVisible();
    await expect(rowActionsDropdown.first()).not.toBeVisible();

    await rowActionsButton.first().click();

    await expect(rowActionsDropdown.first()).toBeVisible();
    await expect(rowActionsOption.first()).toBeVisible();

    const firstOption = rowActionsOption.nth(0);
    await firstOption.click();
    await page.waitForTimeout(50);

    const toaster = getByTestId(STORY_TEST_IDS.toaster);
    await expect(toaster).toBeVisible();

    await expect(rowActionsDropdown).not.toBeVisible();
  });

  test('Row toggles on chevron click', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        showTableTree: 'default',
        expandRowsCount: SUB_ROWS_AMOUNT,
        expandRowsLevel: SUB_ROWS_LEVEL,
      },
    });
    const { tree } = selectors.getRow(page, 0);

    await expect(tree.chevron).toBeVisible();

    const rows = selectors.getRow(page, 'all');
    const initialRowsCount = await rows.tree.node.count();

    await tree.chevron.click();
    await page.waitForTimeout(250);

    const rowsCountAfterExpand = await rows.tree.node.count();
    expect(rowsCountAfterExpand).toBeGreaterThan(initialRowsCount);

    await tree.chevron.click();
    await page.waitForTimeout(250);

    const rowsCountAfterCollapse = await rows.tree.node.count();
    expect(rowsCountAfterCollapse).toEqual(initialRowsCount);
  });

  test('Tree cell with custom render', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        showTableTree: 'custom-render',
      },
    });
    const { tree } = selectors.getRow(page, 0);

    const nodeText = await tree.node.textContent();
    expect(nodeText).toContain('custom');
  });

  test('MultiSelect: parent checkbox works correctly', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        showTableTree: 'default',
        expandRowsCount: SUB_ROWS_AMOUNT,
        expandRowsLevel: SUB_ROWS_LEVEL,
      },
    });
    const rows = selectors.getRow(page, 'all');
    const { tree } = selectors.getRow(page, 0);

    await tree.chevron.click();
    await tree.checkBox.click();

    const selectedRowsCount1 = await rows.row.filter({ has: page.locator(`[${DATA_ATTRIBUTES.selected}]`) }).count();
    expect(selectedRowsCount1).toEqual(SUB_ROWS_AMOUNT + 1);

    await tree.checkBox.click();
    const selectedRowsCount2 = await rows.row.filter({ has: page.locator(`[${DATA_ATTRIBUTES.selected}]`) }).count();
    expect(selectedRowsCount2).toEqual(0);

    const firstSubRow = selectors.getRow(page, 1);
    await firstSubRow.tree.checkBox.click();
    const selectedRowsCount3 = await rows.row.filter({ has: page.locator(`[${DATA_ATTRIBUTES.selected}]`) }).count();
    expect(selectedRowsCount3).toEqual(1);
    const indeterminate = await tree.checkBox
      .locator('[data-indeterminate]')
      .first()
      .getAttribute('data-indeterminate');
    expect(indeterminate).toEqual('true');

    await firstSubRow.tree.checkBox.first().click();
    const selectedRowsCount4 = await rows.row.filter({ has: page.locator(`[${DATA_ATTRIBUTES.selected}]`) }).count();
    expect(selectedRowsCount4).toEqual(0);

    for (let i = 1; i <= SUB_ROWS_AMOUNT; i++) {
      const row = selectors.getRow(page, i);
      await row.tree.checkBox.click();
    }

    const selectedRowsCount5 = await rows.row.filter({ has: page.locator(`[${DATA_ATTRIBUTES.selected}]`) }).count();
    expect(selectedRowsCount5).toEqual(SUB_ROWS_AMOUNT + 1);
  });

  test('SingleSelect: works correctly', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        showTableTree: 'default',
        expandRowsCount: SUB_ROWS_AMOUNT,
        expandRowsLevel: 1,
        rowSelectionMode: 'single',
      },
    });
    const { tree } = selectors.getRow(page, 0);

    await tree.chevron.click();

    const firstSubRow = selectors.getRow(page, 1);
    const secondSubRow = selectors.getRow(page, 2);

    await firstSubRow.tree.radio.click();

    const firstSelected = await firstSubRow.rowSelectedAttribute;
    expect(firstSelected).toEqual('true');

    await secondSubRow.tree.radio.click();

    const secondSelected = await secondSubRow.rowSelectedAttribute;
    const firstSelectedAfter = await firstSubRow.rowSelectedAttribute;
    expect(secondSelected).toEqual('true');
    expect(firstSelectedAfter).toEqual(null);

    await secondSubRow.tree.radio.click();

    const secondSelectedAfter = await secondSubRow.rowSelectedAttribute;
    expect(secondSelectedAfter).toEqual(null);
  });

  test('Column settings: correct amount of items, their initial state and behavior on click', async ({
    page,
    gotoStory,
  }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        rowsAmount: ROWS_AMOUNT,
        showTableTree: 'default',
        expandRowsCount: SUB_ROWS_AMOUNT,
        expandRowsLevel: 1,
      },
    });
    const { toolbarColumnSettingsButton, toolbarColumnSettingsDroplist, tableHeaderCells } = selectors.getRow(
      page,
      'all',
    );

    await toolbarColumnSettingsButton.click();
    await expect(toolbarColumnSettingsDroplist).toBeVisible();

    const settingsOptions = toolbarColumnSettingsDroplist.locator(dataTestIdSelector('list__base-item-option'));

    // Validate amount of columns and settings items
    const headerCellsCount = await tableHeaderCells.count();
    expect(headerCellsCount).toEqual(9); // Columns #2 and #5 are set to defaultFalse, therefore hidden
    const optionsCount = await toolbarColumnSettingsDroplist
      .locator(dataTestIdSelector('list__base-item-option'))
      .count();
    expect(optionsCount).toEqual(6); // Columns #1 and #4 is hidden from columns settings, while checkbox, status and actions columns are not configurable: 11 - (2 hidden + 3 default) = 6

    // Validate correct columns order in settings
    for (let i = 0; i < COLUMNS_SETTINGS_OPTIONS.length; i++) {
      const optionText = await settingsOptions.nth(i).textContent();
      expect(optionText).toEqual(COLUMNS_SETTINGS_OPTIONS[i]);
    }

    // column 1 with columnSettings.mode: 'hide'
    await expect(toolbarColumnSettingsDroplist.locator(dataTestIdSelector('list__base-item_1'))).not.toBeVisible();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '1')).toBeVisible();

    // column 2 with columnSettings.mode: 'defaultFalse'
    const secondColumn = toolbarColumnSettingsDroplist.locator(dataTestIdSelector('list__base-item_2'));
    await expect(secondColumn).toBeVisible();
    const secondColumnChecked = await secondColumn
      .locator(dataTestIdSelector('list__base-item-switch-native-input'))
      .getAttribute('checked');
    expect(secondColumnChecked).toBeNull();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '2')).not.toBeVisible();

    // column 3 with columnSettings.mode: 'defaultTrue'
    const thirdColumn = toolbarColumnSettingsDroplist.locator(dataTestIdSelector('list__base-item_3'));
    await expect(thirdColumn).toBeVisible();
    const thirdColumnChecked = await thirdColumn
      .locator(dataTestIdSelector('list__base-item-switch-native-input'))
      .getAttribute('checked');
    expect(thirdColumnChecked).not.toBeNull();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '3')).toBeVisible();

    const fifthColumn = toolbarColumnSettingsDroplist.locator(dataTestIdSelector('list__base-item_5'));
    const fifthColumnChecked = await fifthColumn
      .locator(dataTestIdSelector('list__base-item-switch-native-input'))
      .getAttribute('checked');
    expect(fifthColumnChecked).toBeNull();
    await expect(fifthColumn).toBeVisible();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '5')).not.toBeVisible();
    await fifthColumn.click();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '5')).toBeVisible();

    await fifthColumn.click();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '5')).not.toBeVisible();

    // check local storage
    await fifthColumn.click();
    await page.waitForTimeout(1000);
    await page.evaluate(() => location.reload());
    await page.waitForTimeout(1000);
    await toolbarColumnSettingsButton.click();

    await expect(selectors.getColumnHeaderSelectorByDataId(page, '5')).toBeVisible();
    await expect(selectors.getColumnHeaderSelectorByDataId(page, '2')).not.toBeVisible();
  });

  test('All rows toolbar checkbox strategy', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'table',
      props: {
        'data-test-id': STORY_TEST_IDS.table,
        toolbarCheckBoxMode: 'allRows',
      },
    });

    const checkboxState = selectors.getToolbarCheckboxState(page);
    await checkboxState.click();

    const selectedState = await selectors.getSelectedState(page).textContent();
    expect(selectedState).toEqual(
      '{"0":true,"1":true,"2":true,"3":true,"4":true,"5":true,"6":true,"7":true,"8":true,"9":true,"10":true,"11":true,"12":true,"13":true,"14":true,"15":true,"16":true,"17":true,"18":true,"19":true,"20":true,"21":true,"22":true,"23":true,"24":true,"25":true,"26":true,"27":true,"28":true,"29":true,"30":true,"31":true,"32":true,"33":true,"34":true}',
    );

    await checkboxState.click();

    const selectedState2 = await selectors.getSelectedState(page).textContent();
    expect(selectedState2).toEqual('{}');
  });
});
