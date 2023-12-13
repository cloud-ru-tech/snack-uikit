import { CalendarProps } from '@snack-uikit/calendar';
import { DroplistProps } from '@snack-uikit/droplist';

import { BUTTON_SIZE, SIZE } from '../../constants';
import { Size } from '../../types';

export const BUTTON_CLEAR_VALUE_SIZE_MAP = {
  [SIZE.Xs]: BUTTON_SIZE.Xxs,
  [SIZE.S]: BUTTON_SIZE.Xs,
  [SIZE.M]: BUTTON_SIZE.Xs,
  [SIZE.L]: BUTTON_SIZE.Xs,
};

export const CALENDAR_SIZE_MAP: Record<Size, CalendarProps['size']> = {
  [SIZE.Xs]: 's',
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'm',
};

export const DROPLIST_SIZE_MAP: Record<Size, DroplistProps['size']> = {
  [SIZE.Xs]: 's',
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'l',
};

export const CHIP_CHOICE_TYPE = {
  Multi: 'multi',
  Date: 'date',
  DateRange: 'date-range',
  Single: 'single',
} as const;
