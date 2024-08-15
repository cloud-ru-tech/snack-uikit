import { ReactNode } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { SIZE, WIDTH } from './constants';

export type IdType = string | number;

export type Size = ValueOf<typeof SIZE>;

export type Width = ValueOf<typeof WIDTH>;

export type Segment<Value extends IdType = IdType> = {
  /**
   * Идентификатор сегмента.
   */
  value: Value;
  /**
   * Текстовый заголовок сегмента.
   */
  label?: string;
  /**
   * Состояние активности сегмента.
   */
  disabled?: boolean;
  /**
   * Иконка сегмента.
   */
  icon?: ReactNode;
  /**
   * Render-обертка над сегментом.
   */
  renderWrapSegment?: (segment: ReactNode) => ReactNode;
};

export type SelectionPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};
