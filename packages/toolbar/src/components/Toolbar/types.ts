import { ReactNode } from 'react';

import { DeleteActionProps, MoreActionsProps } from '../../helperComponents';
import { NeverOrUndefined, RequireAtLeastOne } from './typesUtils';

type OptionalProps = {
  /** Колбек обновления */
  onRefresh?(): void;
  /** Дополнительный слот в начале Тулбара */
  before?: ReactNode;
  /** Дополнительный слот в конце тулбара */
  after?: ReactNode;
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: MoreActionsProps['moreActions'];
};

export type CommonToolbarProps = {
  /** Параметры отвечают за строку поиска <br>
   * <strong>value</strong>: Значение строки поиска <br>
   * <strong>onChange</strong>: Колбэк смены значения <br>
   * <strong>onSubmit</strong>: Колбэк на подтверждение поиска по строке
   * <strong>placeholder</strong>: Плейсхолдер <br>
   * <strong>loading</strong>: Состояние загрузки <br>
   *  */
  search?: {
    value: string;
    onChange(value: string): void;
    onSubmit?(value: string): void;
    placeholder?: string;
    loading?: boolean;
  };
  /** Класснейм */
  className?: string;
  /** Внешний бордер */
  outline?: boolean;
};

export type CheckedToolbarProps = CommonToolbarProps & DeleteActionProps & OptionalProps;

export type DefaultToolbarProps = CommonToolbarProps &
  NeverOrUndefined<DeleteActionProps> &
  RequireAtLeastOne<OptionalProps>;
