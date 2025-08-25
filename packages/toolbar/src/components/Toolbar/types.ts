import { ReactNode } from 'react';

import { RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';
import { ChipChoiceRowProps, FiltersState } from '@snack-uikit/chips';

import { BulkActionsProps, MoreActionsProps } from '../../helperComponents';
import { NeverOrUndefined, RequireAtLeastOne } from './typesUtils';

type OptionalProps = {
  /** Колбек обновления */
  onRefresh?(): void;
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

export type ToolbarBulkActionProps = Omit<BulkActionsProps, 'actions'> & {
  /** Список массовых действий */
  bulkActions?: BulkActionsProps['actions'];
};

export type CheckedToolbarProps = CommonToolbarProps & ToolbarBulkActionProps & OptionalProps;

export type DefaultToolbarProps = CommonToolbarProps &
  NeverOrUndefined<ToolbarBulkActionProps> &
  RequireAtLeastOne<OptionalProps>;

export type FilterRow<TState extends FiltersState> = Omit<ChipChoiceRowProps<TState>, 'size' | 'data-test-id'> & {
  open?: boolean;
  onOpenChange?(isOpen: boolean): void;
};

export type PersistedFilterState<T extends FiltersState> = {
  pagination?: RequestPayloadParams['pagination'];
  sorting?: RequestPayloadParams['sort'];
  search?: string;
  filter?: T;
};

export type ToolbarPersistConfig<T extends FiltersState> = {
  /** Уникальный id для текущего инстанса компонента */
  id?: string;
  /** Ключ для queryParams */
  filterQueryKey?: string;
  /** Валидатор сохраненных */
  validateData?(value: unknown): value is PersistedFilterState<T>;
  /** Custom-сериализация состояния перед сохранением в queryParams */
  serializer?(value: PersistedFilterState<T>): string;
  /** Custom-парсер queryParams для преобразования в данные состояния */
  parser?(value: string): PersistedFilterState<T>;
  /** Состояние для сохранения */
  state?: PersistedFilterState<T>;
  /** Колбэк при первом рендере для получения сохраненных данных и установки их в стейт */
  onLoad?(state: PersistedFilterState<T>): void;
};
