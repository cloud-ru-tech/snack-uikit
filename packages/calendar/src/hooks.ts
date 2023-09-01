import { useContext, useMemo } from 'react';

import { CalendarContext } from './helperComponents/CalendarContext';
import { stringifyAddress } from './helperComponents/Item/utils';
import { BaseGrid, BuildCellProps, Cell } from './types';
import { getInRangePosition, isWeekend } from './utils';

export type UseGridParams = {
  buildGrid(viewDate: Date): BaseGrid;
  isTheSameItem(date1: Date, date2: Date): boolean;
  isInPeriod(viewDate: Date, date: Date): boolean;
  getItemLabel(date: Date): string;
  onSelect?(date: Date): void;
  onPreselect?(date: Date): void;
  onLeave?(): void;
};

export function useGrid({
  onSelect,
  onPreselect,
  onLeave,
  buildGrid,
  isTheSameItem,
  getItemLabel,
  isInPeriod,
}: UseGridParams) {
  const {
    today,
    showHolidays,
    preselectedRange,
    value,
    viewDate,
    viewMode,
    focus,
    buildCellProps,
    firstNotDisableCell,
  } = useContext(CalendarContext);

  return useMemo(() => {
    let hasFocusInGrid = false;
    let currentItem: Cell | undefined;
    let hasFoundFirstNotDisableCell = false;
    const result = buildGrid(viewDate).map(row =>
      row.map<Cell>(({ date, address }) => {
        let isDisabled = false;
        let isHoliday: boolean | undefined = undefined;
        let cellProps: BuildCellProps = { isDisabled, isHoliday };
        if (buildCellProps) {
          cellProps = buildCellProps(date, viewMode);
          isDisabled = cellProps?.isDisabled ?? false;
          isHoliday = cellProps.isHoliday;
        }

        if (isHoliday === undefined) {
          isHoliday = showHolidays && isWeekend(date, viewMode);
        }

        if (!isDisabled) {
          if (firstNotDisableCell && !hasFoundFirstNotDisableCell) {
            firstNotDisableCell.current = address;
            hasFoundFirstNotDisableCell = true;
          }
        }

        const inRangePosition = getInRangePosition(date, viewMode, preselectedRange || value);
        const isSelectedValue =
          value && !preselectedRange ? isTheSameItem(value[0], date) || isTheSameItem(value[1], date) : false;
        const isPreselected = preselectedRange ? isTheSameItem(preselectedRange[0], date) : false;

        const tabIndex = focus && stringifyAddress(address) === focus ? 0 : -1;
        hasFocusInGrid = tabIndex === 0 || hasFocusInGrid;

        const isCurrent = isTheSameItem(today, date);

        const cell: Cell = {
          date,
          onLeave,
          address,
          tabIndex,
          onSelect,
          isCurrent,
          isDisabled,
          isHoliday,
          onPreselect,
          inRangePosition,
          label: getItemLabel(date),
          isSelected: isSelectedValue || isPreselected,
          isInCurrentLevelPeriod: isInPeriod(viewDate, date),
        };

        if (isCurrent) {
          currentItem = cell;
        }

        return cell;
      }),
    );

    if (!hasFocusInGrid) {
      (currentItem || result[0][0]).tabIndex = 0;
    }

    return result;
  }, [
    buildCellProps,
    buildGrid,
    firstNotDisableCell,
    focus,
    getItemLabel,
    isInPeriod,
    isTheSameItem,
    onLeave,
    onPreselect,
    onSelect,
    preselectedRange,
    showHolidays,
    today,
    value,
    viewDate,
    viewMode,
  ]);
}
