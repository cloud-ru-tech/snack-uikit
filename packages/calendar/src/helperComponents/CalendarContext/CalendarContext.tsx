import { createContext, MutableRefObject, RefCallback } from 'react';

import { CalendarMode, Size, ViewMode } from '../../constants';
import { BuildCellPropsFunction, FocusDirection, Range } from '../../types';
import { getLocale } from '../../utils';

export type CalendarContextType = {
  size: Size;
  /** Дата текущего дня */
  today: Date;
  /** Дата базового дня,  */
  referenceDate: Date;
  /** Дата начала текущего видимого периода, высчитывается от referenceDate, viewShift и viewMode */
  viewDate: Date;
  showHolidays: boolean;
  value?: Range;
  firstNotDisableCell?: MutableRefObject<[number, number]>;
  mode: CalendarMode;
  /** Предвыбранный период, когда выбрана первая дата, а вторая под ховером или фокусом */
  preselectedRange?: Range;
  viewMode: ViewMode;
  viewShift: number;
  focus?: string;
  locale: Intl.Locale;
  onFocusLeave?(direction: FocusDirection): void;
  buildCellProps?: BuildCellPropsFunction;
  setFocus(address: string | undefined): void;
  setValue(value: Range): void;
  setViewMode(viewMode: ViewMode): void;
  setViewShift(shift: number): void;
  startPreselect(date: Date): void;
  restartPreselect(): void;
  continuePreselect(date: Date): void;
  completePreselect(date: Date): void;
  getTestId: (prefix: string) => string | undefined;
  navigationStartRef?: RefCallback<HTMLButtonElement>;
};

const stub = () => {
  /* it is a stub */
};

export const CalendarContext = createContext<CalendarContextType>({
  locale: getLocale(),
  size: Size.M,
  today: new Date(),
  viewDate: new Date(),
  referenceDate: new Date(),
  mode: CalendarMode.Date,
  viewMode: ViewMode.Month,
  viewShift: 0,
  setFocus: stub,
  setValue: stub,
  setViewMode: stub,
  showHolidays: false,
  setViewShift: stub,
  startPreselect: stub,
  continuePreselect: stub,
  completePreselect: stub,
  restartPreselect: stub,
  getTestId: () => undefined,
});
