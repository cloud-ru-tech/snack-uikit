import { ReactNode } from 'react';

import { ItemSingleProps } from '@snack-ui/droplist';

import { DeleteActionProps } from '../../helperComponents';
import { NeverOrUndefined, RequireAtLeastOne } from './typesUtils';

type OptionalProps = {
  /** Колбек обновления */
  onRefresh?(): void;
  /** Дополнительный слот */
  actions?: ReactNode;
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: Pick<
    ItemSingleProps,
    'tagLabel' | 'onClick' | 'option' | 'icon' | 'disabled' | 'description' | 'caption'
  >[];
};

export type CommonToolbarProps = {
  /** Значение строки поиска */
  value: string;
  /** Колбек смены значения */
  onChange(value: string): void;
  /** Колбек на подтверждение поиска по строке */
  onSubmit?(value: string): void;
  /** Плейсхолдер */
  placeholder?: string;
  /** Состояние загрузки */
  loading?: boolean;
  /** Класснейм */
  className?: string;
  /** Внешний бордер */
  outline?: boolean;
};

export type CheckedToolbarProps = CommonToolbarProps & DeleteActionProps & OptionalProps;

export type DefaultToolbarProps = CommonToolbarProps &
  NeverOrUndefined<DeleteActionProps> &
  RequireAtLeastOne<OptionalProps>;
