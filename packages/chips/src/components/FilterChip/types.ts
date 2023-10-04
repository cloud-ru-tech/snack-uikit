import { MouseEventHandler } from 'react';

import { ItemSingleProps } from '@snack-ui/droplist';
import { WithSupportProps } from '@snack-ui/utils';

import { BaseChipProps } from '../../types';
import { SelectionMode, Size } from './constants';

export type FilterOption = Pick<ItemSingleProps, 'caption' | 'description' | 'tagLabel' | 'icon' | 'avatar'> & {
  label: string;
  value: string;
};

type CommonProps = WithSupportProps<
  Partial<Omit<BaseChipProps, 'label'>> & {
    /** Массив опций */
    options: FilterOption[];
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }
>;

export type SingleSelectionProps = CommonProps & {
  /**
   * Режим выбора значенией:
   * <br> - `FilterChip.selectionModes.Single` - Режим выбора одного значения. В этом режиме компонент не может находиться без значения. Если значение не передано посредством пропсов `value` или `defaultValue` то компонент выберет первое из списка `options`. Если переданное `value` или `defaultValue` не содержится в `options`, то так же выберется первое в списке.
   */
  selectionMode: SelectionMode.Single;
  /** Лейбл компонента. */
  label?: undefined;
  /** Значение компонента. string в режиме single и string[] в режиме multi. */
  value?: string;
  /** Значение компонента по-умолчанию. string в режиме single и string[] в режиме multi. */
  defaultValue?: string;
  /** Колбек смены значения */
  onChangeValue?(value: string): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение, или массив выбранных значений в режиме Multi. По умолчанию в Single для отображения используется FilterOption.label а в Multi кол-во выбранных значений. */
  labelFormatter?(option: FilterOption): string;
};

export type MultiSelectionProps = CommonProps & {
  /** <br> - `FilterChip.selectionModes.Multi` - Режим множественного выбора значений. */
  selectionMode: SelectionMode.Multi;
  /** Обязателен в режиме Multi. */
  label: string;
  value?: string[];
  defaultValue?: string[];
  onChangeValue?(value: string[]): void;
  labelFormatter?(options: FilterOption[]): string;
};
