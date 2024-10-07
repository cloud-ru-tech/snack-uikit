import { createContext, MutableRefObject, RefObject } from 'react';

import { ListProps } from '@snack-uikit/list';

import { CALENDAR_MODE, SIZE, VIEW_MODE } from '../../constants';
import {
  BuildCellPropsFunction,
  CalendarMode,
  DateAndTime,
  FocusDirection,
  Range,
  Size,
  TimeValue,
  ViewMode,
} from '../../types';
import { getLocale } from '../../utils';

export type CalendarContextType = {
  size: Size;
  /** Дата текущего дня */
  today?: Date;
  /** Дата базового дня,  */
  referenceDate: Date;
  /** Дата начала текущего видимого периода, высчитывается от referenceDate, viewShift и viewMode */
  viewDate: Date;
  showHolidays: boolean;
  showSeconds: boolean;
  fitToContainer: boolean;
  value?: Range;
  firstNotDisableCell?: MutableRefObject<[number, number]>;
  mode: CalendarMode | 'time';
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
  getTestId(prefix: string): string | undefined;
  navigationStartRef?: RefObject<{ focus(): void }>;
  dateAndTime?: DateAndTime;
  onDateChange(dateAndTime: Date | DateAndTime): void;
  onTimeChange(dateAndTime: Date | TimeValue): void;
  onDateAndTimeChange(dateAndTime: Date | DateAndTime): void;
  isDateAndTimeFilled(): boolean;
  isTimeFilled(): boolean;
  isDateFilled(): boolean;
  applyButtonRef: RefObject<HTMLButtonElement>;
  currentButtonRef: RefObject<HTMLButtonElement>;
  hoursKeyboardNavigationRef: NonNullable<ListProps['keyboardNavigationRef']>;
  minutesKeyboardNavigationRef: NonNullable<ListProps['keyboardNavigationRef']>;
  secondsKeyboardNavigationRef: NonNullable<ListProps['keyboardNavigationRef']>;
};

const stub = () => {
  /* it is a stub */
};

// it is a ref stub
const refStub = { current: null };

export const CalendarContext = createContext<CalendarContextType>({
  locale: getLocale(),
  size: SIZE.M,
  viewDate: new Date(),
  referenceDate: new Date(),
  mode: CALENDAR_MODE.Date,
  viewMode: VIEW_MODE.Month,
  viewShift: 0,
  setFocus: stub,
  setValue: stub,
  setViewMode: stub,
  showHolidays: false,
  showSeconds: true,
  fitToContainer: true,
  setViewShift: stub,
  startPreselect: stub,
  continuePreselect: stub,
  completePreselect: stub,
  restartPreselect: stub,
  onDateAndTimeChange: stub,
  onTimeChange: stub,
  onDateChange: stub,
  isDateAndTimeFilled: () => false,
  isDateFilled: () => false,
  isTimeFilled: () => false,
  getTestId: () => undefined,
  applyButtonRef: refStub,
  currentButtonRef: refStub,
  hoursKeyboardNavigationRef: refStub,
  minutesKeyboardNavigationRef: refStub,
  secondsKeyboardNavigationRef: refStub,
});
