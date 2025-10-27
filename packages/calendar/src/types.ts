import { KeyboardEventHandler } from 'react';

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
  onKeyDown?: KeyboardEventHandler;
};

export type FocusDirection = 'prev' | 'next';

export type BuildCellProps = { isDisabled?: boolean; isHoliday?: boolean };
export type BuildCellPropsFunction = (date: Date, viewMode: ViewMode) => BuildCellProps;

export type TimeValue = {
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type DateAndTime = TimeValue & {
  year?: number;
  month?: number;
  day?: number;
};

export type PresetItem = {
  /** Лейбл пресета */
  label: string;
  /** ID периода */
  id: string;
  /** Период */
  range: Range;
};

export type PresetsOptions = {
  /**
   * Включение отображения секции с пресетами
   * @default false
   */
  enabled?: boolean;
  /**
   * Отображение заголовка у секции с пресетами
   * @default true
   */
  title?: boolean;
  /** Кастомные пресеты быстрого выбора периода относительно текущего момента */
  items?: PresetItem[];
};
