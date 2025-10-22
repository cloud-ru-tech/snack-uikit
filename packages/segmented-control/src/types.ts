import { ReactNode } from 'react';

import { CounterProps } from '@snack-uikit/counter';
import { ValueOf } from '@snack-uikit/utils';

import { SIZE, WIDTH } from './constants';

export type IdType = string | number;

export type Size = ValueOf<typeof SIZE>;

export type Width = ValueOf<typeof WIDTH>;

export type SelectionPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SegmentBase<Value extends IdType = IdType> = {
  /**
   * Идентификатор сегмента.
   */
  value: Value;
  /**
   * Состояние активности сегмента.
   */
  disabled?: boolean;
  /**
   * Render-обертка над сегментом.
   */
  renderWrapSegment?: (segment: ReactNode) => ReactNode;
};

type SegmentWithIcon = {
  /**
   * Текстовый заголовок сегмента.
   */
  label?: string;
  /**
   * Иконка сегмента.
   */
  icon?: ReactNode;
  /**
   * Счетчик сегмента.
   */
  counter?: never;
};

type SegmentWithCounter = {
  /**
   * Текстовый заголовок сегмента.
   */
  label: string;
  /**
   * Счетчик сегмента.
   */
  counter?: Omit<CounterProps, 'size'>;
  /**
   * Иконка сегмента.
   */
  icon?: never;
};

export type Segment<Value extends IdType = IdType> = SegmentBase<Value> & (SegmentWithIcon | SegmentWithCounter);
