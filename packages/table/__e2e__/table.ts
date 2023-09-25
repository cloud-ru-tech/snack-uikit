import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from '../stories/constants';

const ROWS_AMOUNT = 30;

const DATA_ATTRIBUTES = {
  sortable: 'data-sortable',
  rowId: 'data-row-id',
  sortDirection: 'data-sort-direction',
  selected: 'data-selected',
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
      selectToggle: row.find(dataTestIdSelector(TEST_IDS.rowSelect)),
      rowSelectedAttribute: row.getAttribute(DATA_ATTRIBUTES.selected),
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

async function getElementPosition(element: Selector, position: 'left' | 'top') {
  const pos = await element.getBoundingClientRectProperty(position);

  // .toFixed() is needed to fix miscalculation in < 1px
  return pos.toFixed();
}

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

fixture('Table').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

function getScrollableElement() {
  // TODO: need to find solution to detect scrollable div not by classname
  return Selector(dataTestIdSelector(STORY_TEST_IDS.table)).find('.os-viewport');
}

test.page(
  getPage({
    rowsAmount: ROWS_AMOUNT,
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

test
  .page(getPage())
  .before(async t => {
    await t.resizeWindow(1000, 800);
  })
  .after(async t => {
    await t.resizeWindow(1200, 900);
  })('Scroll is working correctly, header is always on top, pinned cells not scrolling', async t => {
  const header = Selector(dataTestIdSelector(TEST_IDS.headerRow));
  const { row, pinnedCells } = selectors.getRow(0);

  const content = getScrollableElement();

  await t.expect(content.scrollTop).eql(0, 'Scroll should be in 0 position');
  await t.expect(content.scrollLeft).eql(0, 'Scroll should be in 0 position');

  const positionsBeforeScroll = {
    header: await getElementPosition(header, 'top'),
    row: await getElementPosition(row, 'top'),
    pinnedCells: {
      left: await getElementPosition(pinnedCells.left, 'left'),
      right: await getElementPosition(pinnedCells.right, 'left'),
    },
  };

  await t.scroll(content, 'bottomRight');

  const positionsAfterScroll = {
    header: await getElementPosition(header, 'top'),
    row: await getElementPosition(row, 'top'),
    pinnedCells: {
      left: await getElementPosition(pinnedCells.left, 'left'),
      right: await getElementPosition(pinnedCells.right, 'left'),
    },
  };

  await t.expect(content.scrollTop).notEql(0);
  await t.expect(content.scrollLeft).notEql(0);
  await t.expect(positionsAfterScroll.header).eql(positionsBeforeScroll.header, 'Header position has changed');
  await t.expect(positionsAfterScroll.row).notEql(positionsBeforeScroll.row, 'Row position has not changed');
  await t
    .expect(positionsAfterScroll.pinnedCells.left)
    .eql(positionsBeforeScroll.pinnedCells.left, 'Left pinned cells position has changed');
  await t
    .expect(positionsAfterScroll.pinnedCells.right)
    .eql(positionsBeforeScroll.pinnedCells.right, 'Right pinned cells position has changed');
});

test.page(
  getPage({
    statusColumnViewMode: StoryStatusColumnViewMode.Small,
  }),
)('Render rows with Status indicator and without label', async t => {
  const { statusIndicator, statusLabel } = selectors.getRow(0);

  await t.expect(statusIndicator.exists).ok('No status indicator found');
  await t.expect(statusLabel.exists).notOk("Status label shouldn't exist");
});

test.page(
  getPage({
    statusColumnViewMode: '!undefined',
  }),
)('Render rows without Status', async t => {
  const { statusIndicator, statusLabel } = selectors.getRow(0);

  await t.expect(statusIndicator.exists).notOk("Status indicator shouldn't exist");
  await t.expect(statusLabel.exists).notOk("Status label shouldn't exist");
});

test.page(
  getPage({
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

test.page(getPage())('Multi row selection', async t => {
  const first = selectors.getRow(0);
  const second = selectors.getRow(1);

  await t.expect(first.selectToggle.exists).ok('No selection cell found');

  await t.click(first.selectToggle);
  await t.click(second.selectToggle);

  await t.expect(first.rowSelectedAttribute).eql('true');
  await t.expect(second.rowSelectedAttribute).eql('true');
});

test.page(getPage({ rowSelectionMode: 'single' }))('Single row selection', async t => {
  const first = selectors.getRow(0);
  const second = selectors.getRow(1);

  await t.expect(first.selectToggle.exists).ok('No selection cell found');

  await t.click(first.selectToggle);
  await t.expect(first.rowSelectedAttribute).eql('true');

  await t.click(second.selectToggle);

  await t.expect(second.rowSelectedAttribute).eql('true');
  await t.expect(first.rowSelectedAttribute).eql(null);
});

test.page(getPage({ disableSomeRows: true }))(
  'Disabled rows cannot be selected and have no RowActions button',
  async t => {
    const { row, selectToggle, rowSelectedAttribute, rowActionsButton } = selectors.getRow(0, true);

    await t.expect(row.exists).ok('No disabled rows found');

    await t.expect(rowSelectedAttribute).eql(null);
    await t.expect(selectToggle.exists).notOk('Selection cell exists in disabled row');
    await t.expect(rowActionsButton.exists).notOk('Action button exists in disabled row');
  },
);

test.page(getPage())('Row actions exists and opens dropdown on click', async t => {
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
