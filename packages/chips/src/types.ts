import { ReactElement } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { BUTTON_SIZE, SIZE, VARIANT } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type ButtonSize = ValueOf<typeof BUTTON_SIZE>;

export type Variant = ValueOf<typeof VARIANT>;

export type BaseChipProps = {
  /** Лейбл */
  label: string;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Иконка */
  icon?: ReactElement;
  /** CSS-класс */
  className?: string;
  /** HTML tab index */
  tabIndex?: number;
};
