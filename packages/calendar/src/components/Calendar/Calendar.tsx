import { CSSProperties, RefCallback, useCallback } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { CalendarMode, Size, ViewMode } from '../../constants';
import { CalendarBase } from '../../helperComponents/CalendarBase';
import { BuildCellPropsFunction, FocusDirection, Range } from '../../types';
import { getNormalizedDefaultValue, getNormalizedValue } from './utils';

type CommonCalendarProps = {
  size?: Size;
  today?: Date | number;
  showHolidays?: boolean;
  buildCellProps?: BuildCellPropsFunction;
  className?: string;
  fitToContainer?: boolean;
  style?: CSSProperties;
  autofocus?: boolean;
  locale?: Intl.Locale;
  onFocusLeave?(direction: FocusDirection): void;
  navigationStartRef?: RefCallback<HTMLButtonElement>;
};

type DateCalendarProps = CommonCalendarProps & {
  mode: CalendarMode.Date;
  value?: Date;
  defaultValue?: Date;
  onChangeValue?(value: Date): void;
};

type RangeCalendarProps = CommonCalendarProps & {
  mode: CalendarMode.Range;
  value?: Range;
  defaultValue?: Range;
  onChangeValue?(value: Range): void;
};

export type CalendarProps = WithSupportProps<DateCalendarProps | RangeCalendarProps>;

export function Calendar(props: CalendarProps) {
  const { className, onChangeValue, buildCellProps, mode, ...rest } = props;

  const changeValueHandler = useCallback(
    (value: Range) => {
      if (mode === CalendarMode.Date) {
        const [date] = value;
        onChangeValue?.(date);
        return;
      }
      onChangeValue?.(value);
    },
    [onChangeValue, mode],
  );

  return (
    <CalendarBase
      {...rest}
      mode={mode}
      className={className}
      value={getNormalizedValue(props)}
      defaultValue={getNormalizedDefaultValue(props)}
      onChangeValue={changeValueHandler}
      buildCellProps={buildCellProps}
    />
  );
}

Calendar.sizes = Size;
Calendar.modes = CalendarMode;
Calendar.viewMode = ViewMode;
