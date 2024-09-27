import { KeyboardEventHandler, useContext, useMemo } from 'react';

import { CALENDAR_MODE, IN_RANGE_POSITION } from './constants';
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
  onKeyDown?: KeyboardEventHandler;
};

export function useGrid({
  onSelect,
  onPreselect,
  onLeave,
  buildGrid,
  isTheSameItem,
  getItemLabel,
  isInPeriod,
  onKeyDown,
}: UseGridParams) {
  const {
    today,
    showHolidays,
    preselectedRange,
    value,
    dateAndTime,
    mode,
    viewDate,
    viewMode,
    focus,
    buildCellProps,
    firstNotDisableCell,
    isDateFilled,
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

        const intermediateValue = isDateFilled()
          ? new Date(dateAndTime?.year ?? 0, dateAndTime?.month ?? 0, dateAndTime?.day)
          : undefined;

        const inRangePosition =
          mode === CALENDAR_MODE.Range
            ? getInRangePosition(date, viewMode, preselectedRange || value)
            : IN_RANGE_POSITION.Out;

        const isSelectedValue =
          (value && !preselectedRange ? isTheSameItem(value[0], date) || isTheSameItem(value[1], date) : false) ||
          (intermediateValue && isTheSameItem(intermediateValue, date));

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
          onKeyDown,
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
    dateAndTime?.day,
    dateAndTime?.month,
    dateAndTime?.year,
    firstNotDisableCell,
    focus,
    getItemLabel,
    isDateFilled,
    isInPeriod,
    isTheSameItem,
    mode,
    onKeyDown,
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
