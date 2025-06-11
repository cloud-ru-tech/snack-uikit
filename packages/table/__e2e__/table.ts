import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from '../stories/constants';
import { COLUMNS_SETTINGS_OPTIONS, DATA_ATTRIBUTES, RowsSelectionValidator, selectors } from './utils';

const ROWS_AMOUNT = 30;
const SUB_ROWS_AMOUNT = 3;
const SUB_ROWS_LEVEL = 3;

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'table',
    props: {
      'data-test-id': STORY_TEST_IDS.table,
      rowsAmount: ROWS_AMOUNT,
      ...props,
    },
  });
}

fixture('Table');

test.page(
  getPage({
    rowsAmount: ROWS_AMOUNT,
    pageSize: ROWS_AMOUNT,
    showTableTree: false,
  }),
)('Renders correctly with proper amount of rows, has pinnedCells and Status column with label', async t => {
  await t.expect(Selector(dataTestIdSelector(STORY_TEST_IDS.table)).exists).ok('Table is not rendered');

  const { row, statusIndicator, statusLabel, pinnedCells } = selectors.getRow('all');

  await t.expect(row.count).eql(ROWS_AMOUNT);

  await t.expect(pinnedCells.left.exists).ok('Left pinned cells not exists');
  await t.expect(pinnedCells.right.exists).ok('Right pinned cells not exists');

  await t.expect(statusIndicator.exists).ok('No status indicator found');
  await t.expect(statusLabel.exists).ok('No status label found');
});

test.page(getPage({ suppressToolbar: false, suppressSearch: false, showFilters: true }))(
  'Renders correctly with search & filters',
  async t => {
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow('all');

    await t.expect(toolbar.exists).ok('Toolbar should exist');
    await t.expect(toolbarSearch.exists).ok('ToolbarSearch should exist');
    await t.expect(toolbarFilterButton.exists).ok('ToolbarFilterButton should exist');
    await t.expect(toolbarFilterRow.exists).ok('ToolbarFilterRow should exist');

    await t.click(toolbarFilterButton);

    await t.expect(toolbarFilterRow.exists).notOk('ToolbarFilterRow should be hidden');
  },
);

test.page(getPage({ suppressToolbar: false, suppressSearch: false, showFilters: false }))(
  'Renders correctly with search only',
  async t => {
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow('all');

    await t.expect(toolbar.exists).ok('Toolbar should exist');
    await t.expect(toolbarSearch.exists).ok('ToolbarSearch should exist');
    await t.expect(toolbarFilterButton.exists).notOk('ToolbarFilterButton should not exist');
    await t.expect(toolbarFilterRow.exists).notOk('ToolbarFilterRow should not exist');
  },
);

test.page(getPage({ suppressToolbar: false, suppressSearch: true, showFilters: true }))(
  'Renders correctly with filters only',
  async t => {
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow('all');

    await t.expect(toolbar.exists).ok('Toolbar should exist');
    await t.expect(toolbarSearch.exists).notOk('ToolbarSearch should not exist');
    await t.expect(toolbarFilterButton.exists).ok('ToolbarFilterButton should exist');
    await t.expect(toolbarFilterRow.exists).ok('ToolbarFilterRow should exist');

    await t.click(toolbarFilterButton);

    await t.expect(toolbarFilterRow.exists).notOk('ToolbarFilterRow should not exist');
  },
);

test.page(getPage({ suppressToolbar: true, suppressSearch: false, showFilters: true }))(
  'Renders without search & filters',
  async t => {
    const { toolbar, toolbarSearch, toolbarFilterButton, toolbarFilterRow } = selectors.getRow('all');

    await t.expect(toolbar.exists).notOk('Toolbar should not exist');
    await t.expect(toolbarSearch.exists).notOk('ToolbarSearch should not exist');
    await t.expect(toolbarFilterButton.exists).notOk('ToolbarFilterButton should not exist');
    await t.expect(toolbarFilterRow.exists).notOk('ToolbarFilterRow should not exist');
  },
);

test.page(
  getPage({
    showTableTree: false,
    statusColumnViewMode: StoryStatusColumnViewMode.Small,
  }),
)('Render rows with Status indicator and without label', async t => {
  const { statusIndicator, statusLabel } = selectors.getRow(0);

  await t.expect(statusIndicator.exists).ok('No status indicator found');
  await t.expect(statusLabel.exists).notOk("Status label shouldn't exist");
});

test.page(
  getPage({
    showTableTree: false,
    statusColumnViewMode: '!undefined',
  }),
)('Render rows without Status', async t => {
  const { statusIndicator, statusLabel } = selectors.getRow(0);

  await t.expect(statusIndicator.exists).notOk("Status indicator shouldn't exist");
  await t.expect(statusLabel.exists).notOk("Status label shouldn't exist");
});

test.page(
  getPage({
    showTableTree: false,
    statusColumnViewMode: '!undefined',
  }),
)('Click on column header sorts data', async t => {
  const { row } = selectors.getRow(0);
  const firstRowIdBeforeSort = await row.getAttribute(DATA_ATTRIBUTES.rowId);

  const sortableHeader = Selector(dataTestIdSelector(TEST_IDS.headerCell)).withAttribute(DATA_ATTRIBUTES.sortable);

  await t.expect(sortableHeader.exists).ok('No sortable header exists');

  await t.click(sortableHeader);

  const sortIndicator = sortableHeader.find(dataTestIdSelector(TEST_IDS.headerSortIndicator));

  await t.expect(sortIndicator.exists).ok('No sort indicator after click');

  const sortDirection = await sortIndicator.getAttribute(DATA_ATTRIBUTES.sortDirection);
  const firstRowIdAfterSort = await row.getAttribute(DATA_ATTRIBUTES.rowId);

  await t.expect(sortDirection).eql('desc');
  await t.expect(firstRowIdBeforeSort).notEql(firstRowIdAfterSort);

  await t.click(sortableHeader);

  const sortDirectionAfterClick = await sortIndicator.getAttribute(DATA_ATTRIBUTES.sortDirection);

  await t.expect(sortDirection).notEql(sortDirectionAfterClick);

  await t.click(sortableHeader);

  await t.expect(sortIndicator.exists).notOk("Sort indicator shouldn't exist");
});

test.page(
  getPage({
    showTableTree: false,
  }),
)('Multi row selection', async t => {
  const first = selectors.getRow(0);
  const second = selectors.getRow(1);

  await t.expect(first.selectToggle.exists).ok('No selection cell found');

  await t.click(first.selectToggle);
  await t.click(second.selectToggle);

  await t.expect(first.rowSelectedAttribute).eql('true');
  await t.expect(second.rowSelectedAttribute).eql('true');
});

test.page(
  getPage({
    showTableTree: false,
  }),
)('Multi row rowSelection.onChange callback', async t => {
  const first = selectors.getRow(0);
  const second = selectors.getRow(1);

  await t.click(first.selectToggle);
  await t.expect(selectors.getSelectedState().innerText).eql('{"0":true}');

  await t.click(second.selectToggle);
  await t.expect(selectors.getSelectedState().innerText).eql('{"0":true,"1":true}');

  await t.click(first.selectToggle);
  await t.expect(selectors.getSelectedState().innerText).eql('{"1":true}');
});

test.page(
  getPage({
    showTableTree: false,
  }),
)('Multi row bulk selection and deselection with shift key applied', async t => {
  const validator = new RowsSelectionValidator(t, selectors);

  // Select initial range
  await t.click(validator.getSelector('First').selectToggle);
  await t.click(validator.getSelector('Fifth').selectToggle, {
    modifiers: {
      shift: true,
    },
  });
  await validator.validateRangeSelectionStatus(['First', 'Fifth'], 'true');

  // Add more fields to selected range
  await t.click(validator.getSelector('Seventh').selectToggle, {
    modifiers: {
      shift: true,
    },
  });
  await validator.validateRangeSelectionStatus(['First', 'Seventh'], 'true');

  // Decrease amount of selected fields
  await t.click(validator.getSelector('Fourth').selectToggle, {
    modifiers: {
      shift: true,
    },
  });
  await validator.validateRangeSelectionStatus(['First', 'Third'], 'true');
  await validator.validateRangeSelectionStatus(['Fourth', 'Seventh'], 'false');

  // Add more fields to selected range
  await t.click(validator.getSelector('Ninth').selectToggle, {
    modifiers: {
      shift: true,
    },
  });
  await validator.validateRangeSelectionStatus(['First', 'Ninth'], 'true');

  // Select all fields
  await validator.validateRowSelectionStatus('Tenth', 'false');
  await t.click(Selector(dataTestIdSelector('toolbar__checkbox')));
  await validator.validateRangeSelectionStatus(['First', 'Tenth'], 'true');

  // Deselect single field (5)
  await t.click(validator.getSelector('Fifth').selectToggle);
  await validator.validateRowSelectionStatus('Fifth', 'false');
  await validator.validateRowsConfigSelectionStatus(
    [
      ['First', 'Fourth'],
      ['Sixth', 'Tenth'],
    ],
    'true',
  );

  // Deselect range while holding shift key
  await t.click(validator.getSelector('Eighth').selectToggle);
  await t.click(validator.getSelector('Tenth').selectToggle, {
    modifiers: {
      shift: true,
    },
  });
  await validator.validateRowsConfigSelectionStatus([['First', 'Fourth'], 'Sixth', 'Seventh'], 'true');
  await validator.validateRowsConfigSelectionStatus(['Fifth', ['Eighth', 'Tenth']], 'false');
});

test.page(
  getPage({
    showTableTree: false,
    rowSelectionMode: 'single',
  }),
)('Single row selection', async t => {
  const first = selectors.getRow(0);
  const second = selectors.getRow(1);

  await t.expect(first.selectToggle.exists).ok('No selection cell found');

  await t.click(first.selectToggle);
  await t.expect(first.rowSelectedAttribute).eql('true');

  await t.click(second.selectToggle);

  await t.expect(second.rowSelectedAttribute).eql('true');
  await t.expect(first.rowSelectedAttribute).eql(null);
});

test.page(
  getPage({
    showTableTree: false,
    rowSelectionMode: 'single',
  }),
)('Single row rowSelection.onChange callback', async t => {
  const first = selectors.getRow(0);
  const second = selectors.getRow(1);

  await t.click(first.selectToggle);
  await t.expect(selectors.getSelectedState().innerText).eql('{"0":true}');

  await t.click(second.selectToggle);
  await t.expect(selectors.getSelectedState().innerText).eql('{"1":true}');

  await t.click(first.selectToggle);
  await t.expect(selectors.getSelectedState().innerText).eql('{"0":true}');
});

test.page(getPage({ disableSomeRows: true, showTableTree: false }))(
  'Disabled rows cannot be selected and have no RowActions button',
  async t => {
    const { row, selectToggle, rowSelectedAttribute, rowActionsButton } = selectors.getRow(0, true);

    await t.expect(row.exists).ok('No disabled rows found');

    await t.expect(rowSelectedAttribute).eql(null);
    await t.expect(selectToggle.exists).notOk('Selection cell exists in disabled row');
    await t.expect(rowActionsButton.exists).notOk('Action button exists in disabled row');
  },
);

test.page(getPage({ showTableTree: false }))('Row actions exists and opens dropdown on click', async t => {
  const { rowActionsButton, rowActionsDropdown, rowActionsOption } = selectors.getRow(0);

  await t.expect(rowActionsButton.exists).ok('No RowAction button found');
  await t.expect(rowActionsDropdown.exists).notOk("Dropdown shouldn't exist");

  await t.click(rowActionsButton);

  await t.expect(rowActionsDropdown.exists).ok('Dropdown should exist');
  await t.expect(rowActionsOption.exists).ok('Dropdown option not exists');

  const firstOption = rowActionsOption.nth(0);
  await t.click(firstOption).wait(50);

  const toaster = Selector(dataTestIdSelector(STORY_TEST_IDS.toaster));
  await t.expect(toaster.exists).ok('Toast not present after option click');

  await t.expect(rowActionsDropdown.exists).notOk('Dropdown should be closed after click');
});

test.page(getPage({ showTableTree: true, expandRowsCount: SUB_ROWS_AMOUNT, expandRowsLevel: SUB_ROWS_LEVEL }))(
  'Row toggles on chevron click',
  async t => {
    const { tree } = selectors.getRow(0);

    await t.expect(tree.chevron.exists).ok('Chevron should exists');

    const rows = selectors.getRow('all');
    const initialRowsCount = await rows.tree.node.count;

    await t.click(tree.chevron).wait(250);

    const rowsCountAfterExpand = await rows.tree.node.count;
    await t.expect(rowsCountAfterExpand).gt(initialRowsCount, 'Chevron not Opened');

    await t.click(tree.chevron).wait(250);

    const rowsCountAfterCollapse = await rows.tree.node.count;
    await t.expect(rowsCountAfterCollapse).eql(initialRowsCount, 'Chevron not closed');
  },
);

test.page(
  getPage({
    showTableTree: true,
    expandRowsCount: SUB_ROWS_AMOUNT,
    expandRowsLevel: SUB_ROWS_LEVEL,
  }),
)('MultiSelect: parent checkbox works correctly', async t => {
  const rows = selectors.getRow('all');
  const { tree } = selectors.getRow(0);

  await t.click(tree.chevron);
  await t.click(tree.checkBox);

  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(SUB_ROWS_AMOUNT + 1, 'All sub rows should be checked when parent checkbox is checked');

  await t.click(tree.checkBox);
  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(0, 'No rows should be checked when parent is unchecked');

  const firstSubRow = selectors.getRow(1);
  await t.click(firstSubRow.tree.checkBox);
  await t.expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count).eql(1, 'First sub row should be checked');
  await t
    .expect(tree.checkBox.find('[data-indeterminate]').getAttribute('data-indeterminate'))
    .eql('true', 'Parent should become indeterminate checked when some of sub rows is checked');

  await t.click(firstSubRow.tree.checkBox);
  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(0, 'Parent checkbox has failed to become unchecked, once all children got unchecked');

  for (let i = 1; i <= SUB_ROWS_AMOUNT; i++) {
    const row = selectors.getRow(i);
    await t.click(row.tree.checkBox);
  }

  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(SUB_ROWS_AMOUNT + 1, 'Parent checkbox should become checked, once all children got checked');
});

test.page(
  getPage({
    showTableTree: true,
    expandRowsCount: SUB_ROWS_AMOUNT,
    expandRowsLevel: 1,
    rowSelectionMode: 'single',
  }),
)('SingleSelect: works correctly', async t => {
  const { tree } = selectors.getRow(0);

  await t.click(tree.chevron);

  const firstSubRow = selectors.getRow(1);
  const secondSubRow = selectors.getRow(2);

  await t.click(firstSubRow.tree.radio);

  await t.expect(firstSubRow.rowSelectedAttribute).ok('First sub row not selected by radio click');

  await t.click(secondSubRow.tree.radio);

  await t.expect(secondSubRow.rowSelectedAttribute).ok('Second row not selected by radio click');
  await t.expect(firstSubRow.rowSelectedAttribute).notOk('First sub row should not be selected after click of first');

  await t.click(secondSubRow.tree.radio);

  await t.expect(secondSubRow.rowSelectedAttribute).notOk('Second sub row should not be selected after second click');
});

test.page(
  getPage({
    showTableTree: true,
    expandRowsCount: SUB_ROWS_AMOUNT,
    expandRowsLevel: 1,
  }),
)('Column settings: correct amount of items, their initial state and behavior on click', async t => {
  const { toolbarColumnSettingsButton, toolbarColumnSettingsDroplist, tableHeaderCells } = selectors.getRow('all');

  await t.click(toolbarColumnSettingsButton);
  await t.expect(toolbarColumnSettingsDroplist.exists).ok('Droplist should exist');

  const settingsOptions = toolbarColumnSettingsDroplist.find(dataTestIdSelector('list__base-item-option'));

  // Validate amount of columns and settings items
  await t.expect(tableHeaderCells.count).eql(9, 'Only 9 out of 11 columns should be visible'); // Columns #2 and #5 are set to defaultFalse, therefore hidden
  await t
    .expect(toolbarColumnSettingsDroplist.find(dataTestIdSelector('list__base-item-option')).count)
    .eql(6, 'Only 6 out of 9 configurable columns should be visible'); // Columns #1 and #4 is hidden from columns settings, while checkbox, status and actions columns are not configurable: 11 - (2 hidden + 3 default) = 6

  // Validate correct columns order in settings
  for (let i = 0; i < COLUMNS_SETTINGS_OPTIONS.length; i++) {
    await t.expect(settingsOptions.nth(i).textContent).eql(COLUMNS_SETTINGS_OPTIONS[i]);
  }

  // column 1 with columnSettings.mode: 'hide'
  await t
    .expect(toolbarColumnSettingsDroplist.find(dataTestIdSelector('list__base-item_1')).exists)
    .notOk('Droplist item Column #1 shouldn`t exist, because is expected to be hidden due to hide mode');
  await t.expect(selectors.getColumnHeaderSelectorByDataId('1').exists).ok('Column #1 should be shown');

  // column 2 with columnSettings.mode: 'defaultFalse'
  const secondColumn = toolbarColumnSettingsDroplist.find(dataTestIdSelector('list__base-item_2'));
  await t.expect(secondColumn.exists).ok('Droplist item Column #2 should exist');
  await t
    .expect(secondColumn.find(dataTestIdSelector('list__base-item-switch-native-input')).hasAttribute('checked'))
    .notOk('Droplist toggle Column #2 should be unchecked');
  await t.expect(selectors.getColumnHeaderSelectorByDataId('2').exists).notOk('Column #2 should be hidden');

  // column 3 with columnSettings.mode: 'defaultTrue'
  const thirdColumn = toolbarColumnSettingsDroplist.find(dataTestIdSelector('list__base-item_3'));
  await t.expect(thirdColumn.exists).ok('Droplist item Column #3 should exist');
  await t
    .expect(thirdColumn.find(dataTestIdSelector('list__base-item-switch-native-input')).hasAttribute('checked'))
    .ok('Droplist toggle Column #3 should be checked');
  await t.expect(selectors.getColumnHeaderSelectorByDataId('3').exists).ok('Column #3 should be shown');

  const fifthColumn = toolbarColumnSettingsDroplist.find(dataTestIdSelector('list__base-item_5'));
  await t
    .expect(fifthColumn.find(dataTestIdSelector('list__base-item-switch-native-input')).hasAttribute('checked'))
    .notOk('Droplist toggle Column #3 should be unchecked due to defaultFalse mode');
  await t.expect(fifthColumn.exists).ok('Column #5 should exist but disabled due to defaultFalse mode');
  await t
    .expect(selectors.getColumnHeaderSelectorByDataId('5').exists)
    .notOk('Column #5 should be hidden due to defaultFalse mode');
  await t.click(fifthColumn);
  await t.expect(selectors.getColumnHeaderSelectorByDataId('5').exists).ok('Column #5 should be visible');

  await t.click(fifthColumn);
  await t.expect(selectors.getColumnHeaderSelectorByDataId('5').exists).notOk('Column #5 should be hidden');

  // check local storage
  await t.click(fifthColumn);
  await t.wait(1000);
  await t.eval(() => location.reload());
  await t.wait(1000);
  await t.click(toolbarColumnSettingsButton);

  await t
    .expect(Selector(dataTestIdSelector(TEST_IDS.headerCell)).withAttribute('data-header-id', '5').exists)
    .ok('Column #5 should be visible after reload');
  await t
    .expect(Selector(dataTestIdSelector(TEST_IDS.headerCell)).withAttribute('data-header-id', '2').exists)
    .notOk('Column #2 should be shown after reload');
});
