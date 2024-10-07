import { useCallback, useState } from 'react';

import { VIEW_MODE } from '../../constants';
import { Range, ViewMode } from '../../types';

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
