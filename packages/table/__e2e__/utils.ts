import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS } from '../stories/constants';

export const DATA_ATTRIBUTES = {
  sortable: 'data-sortable',
  rowId: 'data-row-id',
  sortDirection: 'data-sort-direction',
  selected: 'data-selected',
  checked: 'data-checked',
  disabled: 'data-disabled',
  pinnedPosition: 'data-position',
};

export const selectors = {
  getRows: () => Selector(dataTestIdSelector(TEST_IDS.bodyRow)),
  getRow(index: number | 'all', disabled?: boolean) {
    let row = this.getRows();

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
      toolbarColumnSettingsButton: Selector(dataTestIdSelector('table__column-settings')),
      toolbarColumnSettingsDroplist: Selector(dataTestIdSelector('table__column-settings-droplist')),
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
      tableHeaderCells: Selector(dataTestIdSelector('table__header-cell')),
    };
  },
  getColumnHeaderSelectorByDataId(id: string) {
    return Selector(dataTestIdSelector(TEST_IDS.headerCell)).withAttribute('data-header-id', id);
  },
  getSelectedState() {
    return Selector(dataTestIdSelector(STORY_TEST_IDS.selected));
  },
};

type Selectors = typeof selectors;

export class RowsSelectionValidator {
  public rowsMap = {
    First: 0,
    Second: 1,
    Third: 2,
    Fourth: 3,
    Fifth: 4,
    Sixth: 5,
    Seventh: 6,
    Eighth: 7,
    Ninth: 8,
    Tenth: 9,
  };

  private t: TestController;
  private selectors: Selectors;

  constructor(t: TestController, selectors: Selectors) {
    this.t = t;
    this.selectors = selectors;
  }

  public getSelectorIndex(selector: keyof typeof this.rowsMap): number {
    return this.rowsMap[selector];
  }

  public getSelector(selector: keyof typeof this.rowsMap) {
    const rowIndex = this.getSelectorIndex(selector);
    return this.selectors.getRow(rowIndex);
  }

  private getBooleanAssertionFunction(comparedValue: 'true' | 'false') {
    return comparedValue === 'true' ? 'eql' : 'notEql';
  }

  public async validateRowSelectionStatus(selector: keyof typeof this.rowsMap, comparedValue: 'true' | 'false') {
    const rowSelector = this.getSelector(selector);
    const assertion = this.getBooleanAssertionFunction(comparedValue);

    await this.t.expect(rowSelector.rowSelectedAttribute)[assertion](comparedValue);
  }

  public async validateRangeSelectionStatus<T extends keyof typeof this.rowsMap>(
    [start, end]: [T, T],
    comparedValue: 'true' | 'false',
  ) {
    const startIndex = this.getSelectorIndex(start);
    const endIndex = this.getSelectorIndex(end);

    if (startIndex >= endIndex) {
      throw new Error('Invalid range: start cannot equal or be greater than end');
    }

    const assertion = this.getBooleanAssertionFunction(comparedValue);

    for (let i = startIndex; i <= endIndex; i++) {
      await this.t.expect(this.selectors.getRow(i).rowSelectedAttribute)[assertion](comparedValue);
    }
  }

  public async validateRowsConfigSelectionStatus<T extends keyof typeof this.rowsMap>(
    config: Array<[T, T] | T>,
    comparedValue: 'true' | 'false',
  ) {
    config.forEach(item => {
      if (Array.isArray(item)) {
        this.validateRangeSelectionStatus(item, comparedValue);
      } else {
        this.validateRowSelectionStatus(item, comparedValue);
      }
    });
  }
}

export const COLUMNS_SETTINGS_OPTIONS = ['Column №2', 'Column №3', 'Column №5', 'Price', 'Tags', 'Column №8'];
