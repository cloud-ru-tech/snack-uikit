import { createContext, RefCallback } from 'react';

import { CalendarMode, Size, ViewLevel } from '../../constants';
import { FocusDirection, Range } from '../../types';
import { getLocale } from '../../utils';

export type CalendarContextType = {
  size: Size;
  /** Дата текущего дня */
  today: Date;
  /** Дата базового дня,  */
  referenceDate: Date;
  /** Дата начала текущего видимого периода, высчитывается от referenceDate, viewShift и viewLevel */
  viewDate: Date;
  value?: Range;
  mode: CalendarMode;
  /** Предвыбранный период, когда выбрана первая дата, а вторая под ховером или фокусом */
  preselectedRange?: Range;
  viewLevel: ViewLevel;
  viewShift: number;
  focus?: string;
  locale: Intl.Locale;
  onFocusLeave?(direction: FocusDirection): void;
  setFocus(address: string | undefined): void;
  setValue(value: Range): void;
  setViewLevel(viewLevel: ViewLevel): void;
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
  viewLevel: ViewLevel.Month,
  viewShift: 0,
  setFocus: stub,
  setValue: stub,
  setViewLevel: stub,
  setViewShift: stub,
  startPreselect: stub,
  continuePreselect: stub,
  completePreselect: stub,
  restartPreselect: stub,
  getTestId: () => undefined,
});
