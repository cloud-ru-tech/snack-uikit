import { ValueOf } from '@snack-uikit/utils';

import { CALENDAR_MODE, IN_RANGE_POSITION, SIZE, VIEW_MODE } from './constants';

export type InRangePosition = ValueOf<typeof IN_RANGE_POSITION>;

export type ViewMode = ValueOf<typeof VIEW_MODE>;

export type Size = ValueOf<typeof SIZE>;

export type CalendarMode = ValueOf<typeof CALENDAR_MODE>;

export type Range = [Date, Date];

export type BaseGridItem = { date: Date; address: [number, number] };

export type BaseGrid = BaseGridItem[][];

export type Cell = {
  date: Date;
  address: [number, number];
  label: string;
  isCurrent: boolean;
  isSelected: boolean;
  isDisabled: boolean | undefined;
  isHoliday: boolean | undefined;
  isInCurrentLevelPeriod: boolean;
  inRangePosition: InRangePosition;
  tabIndex: -1 | 0;
  onSelect?(date: Date): void;
  onPreselect?(date: Date): void;
  onLeave?(): void;
};

export type FocusDirection = 'prev' | 'next';

export type BuildCellProps = { isDisabled?: boolean; isHoliday?: boolean };
export type BuildCellPropsFunction = (date: Date, viewMode: ViewMode) => BuildCellProps;
