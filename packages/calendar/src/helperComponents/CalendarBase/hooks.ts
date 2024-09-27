import { useCallback, useState } from 'react';

import { VIEW_MODE } from '../../constants';
import { DateAndTime, Range, ViewMode } from '../../types';

export function useViewDate(referenceDate: Date, viewMode: ViewMode, viewShift: number) {
  switch (viewMode) {
    case VIEW_MODE.Decade:
      const decadeFirstYear = Math.floor(referenceDate.getFullYear() / 10) * 10;
      return new Date(decadeFirstYear + viewShift * 10, 1, 1);
    case VIEW_MODE.Year:
      return new Date(referenceDate.getFullYear() + viewShift, 1, 1);
    case VIEW_MODE.Month:
    default:
      return new Date(referenceDate.getFullYear(), referenceDate.getMonth() + viewShift, 1);
  }
}

export function useRange({ setValue }: { setValue(value: Range): void }) {
  const [preselectedRange, setPreselectedRange] = useState<Range | undefined>();

  const startPreselect = useCallback((date: Date) => {
    setPreselectedRange([date, date]);
  }, []);

  const continuePreselect = useCallback((date: Date) => {
    setPreselectedRange(prevState => prevState && [prevState[0], date]);
  }, []);

  const restartPreselect = useCallback(() => {
    setPreselectedRange(prevState => prevState && [prevState[0], prevState[0]]);
  }, []);

  const completePreselect = useCallback(
    (date: Date) => {
      if (preselectedRange) {
        setPreselectedRange(undefined);
        setValue([preselectedRange[0], date]);
      }
    },
    [preselectedRange, setValue],
  );

  return { preselectedRange, startPreselect, continuePreselect, restartPreselect, completePreselect };
}

export function useDateAndTime({ initialDate }: { initialDate: Date | undefined }) {
  const [dateAndTime, setDateAndTime] = useState<DateAndTime>(() => ({
    year: initialDate?.getFullYear(),
    month: initialDate?.getFullYear(),
    day: initialDate?.getDate(),
    hours: initialDate?.getHours(),
    minutes: initialDate?.getMinutes(),
    seconds: initialDate?.getSeconds(),
  }));

  const isDateFilled = useCallback(() => {
    const { year, month, day } = dateAndTime;
    return [year, month, day].every(value => value !== undefined);
  }, [dateAndTime]);

  const isTimeFilled = useCallback(() => {
    const { hours, minutes, seconds } = dateAndTime;
    return [hours, minutes, seconds].every(value => value !== undefined);
  }, [dateAndTime]);

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

  const onTimeChange = useCallback((value: Pick<DateAndTime, 'hours' | 'minutes' | 'seconds'> | Date) => {
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
