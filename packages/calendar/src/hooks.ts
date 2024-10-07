import { KeyboardEventHandler, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CALENDAR_MODE, IN_RANGE_POSITION } from './constants';
import { CalendarContext } from './helperComponents/CalendarContext';
import { stringifyAddress } from './helperComponents/Item/utils';
import { BaseGrid, BuildCellProps, Cell, DateAndTime, Range, TimeValue } from './types';
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

        const dateTimeSelectedValue = isDateFilled()
          ? new Date(dateAndTime?.year ?? 0, dateAndTime?.month ?? 0, dateAndTime?.day ?? 0)
          : undefined;

        const inRangePosition =
          mode === CALENDAR_MODE.Range
            ? getInRangePosition(date, viewMode, preselectedRange || value)
            : IN_RANGE_POSITION.Out;

        const isSelectedValue =
          value && !preselectedRange && !dateTimeSelectedValue
            ? isTheSameItem(value[0], date) || isTheSameItem(value[1], date)
            : false;
        const isPreselected = preselectedRange ? isTheSameItem(preselectedRange[0], date) : false;
        const isDateTimeValueSelected = dateTimeSelectedValue ? isTheSameItem(dateTimeSelectedValue, date) : false;

        const tabIndex = focus && stringifyAddress(address) === focus ? 0 : -1;
        hasFocusInGrid = tabIndex === 0 || hasFocusInGrid;

        const isCurrent = isTheSameItem(today || new Date(), date);

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
          isSelected: isSelectedValue || isPreselected || isDateTimeValueSelected,
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

export function useDateAndTime({
  showSeconds,
  value,
}: {
  showSeconds?: boolean;
  value: Range | TimeValue | undefined;
}) {
  const [dateAndTime, setDateAndTime] = useState<DateAndTime>(() => {
    if (Array.isArray(value)) {
      const initialValue = value[0];

      return {
        year: initialValue.getFullYear(),
        month: initialValue.getMonth(),
        day: initialValue.getDate(),
        hours: initialValue.getHours(),
        minutes: initialValue.getMinutes(),
        seconds: initialValue.getSeconds(),
      };
    }

    return {
      year: undefined,
      month: undefined,
      day: undefined,
      hours: value?.hours,
      minutes: value?.minutes,
      seconds: value?.seconds,
    };
  });

  const isDateFilled = useCallback(() => {
    const { year, month, day } = dateAndTime;
    return [year, month, day].every(value => value !== undefined);
  }, [dateAndTime]);

  const isTimeFilled = useCallback(() => {
    const { hours, minutes, seconds } = dateAndTime;
    return [hours, minutes, ...(showSeconds ? [seconds] : [])].every(value => value !== undefined);
  }, [dateAndTime, showSeconds]);

  const isDateAndTimeFilled = useCallback(() => isTimeFilled() && isDateFilled(), [isDateFilled, isTimeFilled]);

  const onDateChange = useCallback((value: Pick<DateAndTime, 'year' | 'month' | 'day'> | Date) => {
    if (value instanceof Date) {
      setDateAndTime(prevDate => ({
        ...prevDate,
        year: value.getFullYear(),
        month: value.getMonth(),
        day: value.getDate(),
      }));
    } else {
      setDateAndTime(prevDate => ({ ...prevDate, ...value }));
    }
  }, []);

  const onTimeChange = useCallback((value: TimeValue | Date) => {
    if (value instanceof Date) {
      setDateAndTime(prevDate => ({
        ...prevDate,
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      }));
    } else {
      setDateAndTime(prevDate => ({ ...prevDate, ...value }));
    }
  }, []);

  const onDateAndTimeChange = useCallback((value: DateAndTime | Date) => {
    if (value instanceof Date) {
      setDateAndTime({
        year: value.getFullYear(),
        month: value.getMonth(),
        day: value.getDate(),
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      });
    } else {
      setDateAndTime(value);
    }
  }, []);

  useEffect(() => {
    if (!value) {
      setDateAndTime({});
      return;
    }

    if (Array.isArray(value)) {
      onDateAndTimeChange(value[0]);
    } else {
      onTimeChange(value);
    }
  }, [onDateAndTimeChange, onTimeChange, value]);

  return {
    dateAndTime,
    setDateAndTime,
    isDateAndTimeFilled,
    isTimeFilled,
    isDateFilled,
    onDateChange,
    onTimeChange,
    onDateAndTimeChange,
  };
}
