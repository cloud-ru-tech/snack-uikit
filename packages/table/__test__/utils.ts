import { expect, type Page } from '@playwright/test';

import { dataTestIdSelector } from '../../../playwright/utils';
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
  getRows: (page: Page) => page.locator(dataTestIdSelector(TEST_IDS.bodyRow)),
  getRow(page: Page, index: number | 'all', disabled?: boolean) {
    const rowSelector = disabled
      ? `${dataTestIdSelector(TEST_IDS.bodyRow)}[${DATA_ATTRIBUTES.disabled}="true"]`
      : dataTestIdSelector(TEST_IDS.bodyRow);

    let row = page.locator(rowSelector);

    if (typeof index === 'number') {
      row = row.nth(index);
    }

    return {
      row,
      tree: {
        chevron: row.locator(dataTestIdSelector(TEST_IDS.tree.chevron)),
        node: row.locator(dataTestIdSelector(TEST_IDS.tree.node)),
        checkBox: row.locator(dataTestIdSelector(TEST_IDS.tree.checkbox)),
        radio: row.locator(dataTestIdSelector(TEST_IDS.tree.radio)),
      },
      selectToggle: row.locator(dataTestIdSelector(TEST_IDS.rowSelect)).first(),
      get rowSelectedAttribute() {
        return row.getAttribute(DATA_ATTRIBUTES.selected);
      },
      toolbar: page.locator(dataTestIdSelector(TEST_IDS.toolbar)),
      toolbarSearch: page.locator(dataTestIdSelector('toolbar__search')),
      toolbarFilterButton: page.locator(dataTestIdSelector('toolbar__filter-button')),
      toolbarColumnSettingsButton: page.locator(dataTestIdSelector('table__column-settings')),
      toolbarColumnSettingsDroplist: page.locator(dataTestIdSelector('table__column-settings-droplist')),
      toolbarFilterRow: page.locator(dataTestIdSelector('toolbar__filter-row')),
      statusIndicator: row.locator(dataTestIdSelector(TEST_IDS.statusIndicator)),
      statusLabel: row.locator(dataTestIdSelector(TEST_IDS.statusLabel)),
      rowActionsButton: row.locator(dataTestIdSelector(TEST_IDS.rowActions.droplistTrigger)),
      rowActionsDropdown: page.locator(dataTestIdSelector(TEST_IDS.rowActions.droplist)),
      rowActionsOption: page.locator(dataTestIdSelector(TEST_IDS.rowActions.option)),
      pinnedCells: {
        left: row.locator(`${dataTestIdSelector(TEST_IDS.pinnedCells)}[${DATA_ATTRIBUTES.pinnedPosition}="left"]`),
        right: row.locator(`${dataTestIdSelector(TEST_IDS.pinnedCells)}[${DATA_ATTRIBUTES.pinnedPosition}="right"]`),
      },
      tableHeaderCells: page.locator(dataTestIdSelector('table__header-cell')),
    };
  },
  getColumnHeaderSelectorByDataId(page: Page, id: string) {
    const headerSelector = `${dataTestIdSelector(TEST_IDS.headerCell)}[data-header-id="${id}"]`;
    return page.locator(headerSelector);
  },
  getSelectedState(page: Page) {
    return page.locator(dataTestIdSelector(STORY_TEST_IDS.selected));
  },
  getToolbarCheckboxState(page: Page) {
    return page.locator(dataTestIdSelector('toolbar__checkbox'));
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

  private page: Page;
  private selectors: Selectors;

  constructor(page: Page, selectors: Selectors) {
    this.page = page;
    this.selectors = selectors;
  }

  public getSelectorIndex(selector: keyof typeof this.rowsMap): number {
    return this.rowsMap[selector];
  }

  public getRow(selector: keyof typeof this.rowsMap) {
    const rowIndex = this.getSelectorIndex(selector);
    return this.selectors.getRow(this.page, rowIndex);
  }

  public async validateRowSelectionStatus(selector: keyof typeof this.rowsMap, comparedValue: 'true' | 'false') {
    const rowSelector = this.getRow(selector);
    const selectedAttr = await rowSelector.rowSelectedAttribute;

    if (comparedValue === 'true') {
      expect(selectedAttr).toEqual('true');
    } else {
      expect(selectedAttr).not.toEqual('true');
    }
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

    for (let i = startIndex; i <= endIndex; i++) {
      const row = this.selectors.getRow(this.page, i);
      const selectedAttr = await row.rowSelectedAttribute;
      if (comparedValue === 'true') {
        expect(selectedAttr).toEqual('true');
      } else {
        expect(selectedAttr).not.toEqual('true');
      }
    }
  }

  public async validateRowsConfigSelectionStatus<T extends keyof typeof this.rowsMap>(
    config: Array<[T, T] | T>,
    comparedValue: 'true' | 'false',
  ) {
    for (const item of config) {
      if (Array.isArray(item)) {
        await this.validateRangeSelectionStatus(item, comparedValue);
      } else {
        await this.validateRowSelectionStatus(item, comparedValue);
      }
    }
  }
}

export const COLUMNS_SETTINGS_OPTIONS = ['Column №2', 'Column №3', 'Column №5', 'Price', 'Tags', 'Column №8'];
