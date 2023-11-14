import { ReactElement } from 'react';

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
