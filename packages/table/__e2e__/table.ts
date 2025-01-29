import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from '../stories/constants';

const ROWS_AMOUNT = 30;
const SUB_ROWS_AMOUNT = 3;
const SUB_ROWS_LEVEL = 3;

const DATA_ATTRIBUTES = {
  sortable: 'data-sortable',
  rowId: 'data-row-id',
  sortDirection: 'data-sort-direction',
  selected: 'data-selected',
  checked: 'data-checked',
  disabled: 'data-disabled',
  pinnedPosition: 'data-position',
};

const selectors = {
  getRows: () => Selector(dataTestIdSelector(TEST_IDS.bodyRow)),
  getRow: (index: number | 'all', disabled?: boolean) => {
    let row = selectors.getRows();

    if (disabled) {
      row = row.withAttribute(DATA_ATTRIBUTES.disabled);
    }

    if (typeof index === 'number') {
      row = row.nth(index);
    }

    return {
      row,
      tree: {
        chevron: row.find(dataTestIdSelector(TEST_IDS.tree.chevron)),
        node: row.find(dataTestIdSelector(TEST_IDS.tree.node)),
        checkBox: row.find(dataTestIdSelector(TEST_IDS.tree.checkbox)),
        radio: row.find(dataTestIdSelector(TEST_IDS.tree.radio)),
      },
      selectToggle: row.find(dataTestIdSelector(TEST_IDS.rowSelect)),
      rowSelectedAttribute: row.getAttribute(DATA_ATTRIBUTES.selected),
      toolbar: Selector(dataTestIdSelector(TEST_IDS.toolbar)),
      toolbarSearch: Selector(dataTestIdSelector('toolbar__search')),
      toolbarFilterButton: Selector(dataTestIdSelector('toolbar__filter-button')),
      toolbarFilterRow: Selector(dataTestIdSelector('toolbar__filter-row')),
      statusIndicator: row.find(dataTestIdSelector(TEST_IDS.statusIndicator)),
      statusLabel: row.find(dataTestIdSelector(TEST_IDS.statusLabel)),
      rowActionsButton: row.find(dataTestIdSelector(TEST_IDS.rowActions.droplistTrigger)),
      rowActionsDropdown: Selector(dataTestIdSelector(TEST_IDS.rowActions.droplist)),
      rowActionsOption: Selector(dataTestIdSelector(TEST_IDS.rowActions.option)),
      pinnedCells: {
        left: row.find(dataTestIdSelector(TEST_IDS.pinnedCells)).withAttribute(DATA_ATTRIBUTES.pinnedPosition, 'left'),
        right: row
          .find(dataTestIdSelector(TEST_IDS.pinnedCells))
          .withAttribute(DATA_ATTRIBUTES.pinnedPosition, 'right'),
      },
    };
  },
};

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

    await t.click(toolbarFilterButton);

    await t.expect(toolbarFilterRow.exists).ok('ToolbarFilterRow should exist');
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

    await t.click(toolbarFilterButton);

    await t.expect(toolbarFilterRow.exists).ok('ToolbarFilterRow should exist');
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
  await t.wait(50);

  await t.click(tree.chevron).wait(50);
  await t.click(tree.checkBox).wait(50);
  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(SUB_ROWS_AMOUNT + 1, 'Count of selected rows incorrect');

  await t.click(tree.checkBox).wait(50);
  await t.expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count).eql(0, 'Count of selected rows incorrect1');

  const firstSubRow = selectors.getRow(1);
  await t.click(firstSubRow.tree.checkBox).wait(50);
  await t.click(tree.checkBox).wait(50);
  await t.expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count).eql(0, 'Count of selected rows incorrect2');

  for (let i = 1; i <= SUB_ROWS_AMOUNT; i++) {
    const row = selectors.getRow(i);
    await t.click(row.tree.checkBox).wait(50);
  }
  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(SUB_ROWS_AMOUNT + 1, 'Parent checkbox not select automatically, when selected all children');

  for (let i = 1; i <= SUB_ROWS_AMOUNT; i++) {
    const row = selectors.getRow(i);
    await t.click(row.tree.checkBox).wait(50);
  }
  await t
    .expect(rows.row.withAttribute(DATA_ATTRIBUTES.selected).count)
    .eql(0, 'Parent checkbox not unselect automatically, when unselected all children');
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

  await t.click(tree.chevron).wait(50);

  const firstSubRow = selectors.getRow(1);
  const secondSubRow = selectors.getRow(2);

  await t.click(firstSubRow.tree.radio).wait(50);

  await t.expect(firstSubRow.rowSelectedAttribute).ok('First sub row not selected by radio click');

  await t.click(secondSubRow.tree.radio).wait(50);

  await t.expect(secondSubRow.rowSelectedAttribute).ok('Second row not selected by radio click');
  await t.expect(firstSubRow.rowSelectedAttribute).notOk('First sub row should not be selected after click of first');

  await t.click(secondSubRow.tree.radio).wait(50);

  await t.expect(secondSubRow.rowSelectedAttribute).notOk('Second sub row should not be selected after second click');
});
