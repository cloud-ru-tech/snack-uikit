import { ReactElement } from 'react';

import { ItemSingleProps } from '@snack-uikit/droplist';
import { InputPrivateProps } from '@snack-uikit/input-private';
import { WithSupportProps } from '@snack-uikit/utils';

import { FieldDecoratorProps } from '../FieldDecorator';

export enum SelectionMode {
  Single = 'single',
  Multi = 'multi',
}

export type Option = Pick<ItemSingleProps, 'caption' | 'description' | 'tagLabel' | 'icon' | 'avatar' | 'disabled'> & {
  value: string;
  label: string;
};

export type ExtendedOption = Option & {
  checked: boolean;
};

type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'placeholder' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'
>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  | 'className'
  | 'label'
  | 'labelTooltip'
  | 'required'
  | 'hint'
  | 'showHintIcon'
  | 'size'
  | 'validationState'
  | 'labelTooltipPlacement'
>;

type FieldSelectOwnProps = {
  /** Массив опций выпадающего списка */
  options: Option[];
  /** Открыт ли выпадающий список */
  open?: boolean;
  /** Колбек открытия выпадающего списка */
  onOpenChange?(value: boolean): void;
  /** Можно ли искать опции внутри списка */
  searchable?: boolean;
  /** Показывать ли кнопку Копировать для поля (актуально только для readonly = true) */
  showCopyButton?: boolean;
  /** Иконка-префикс для поля */
  prefixIcon?: ReactElement;
  /** Текст отсутствия доступных значений */
  noDataText?: string;
  /** Текущая локаль */
  locale?: Intl.Locale;
};

export type FieldSelectBaseProps = FieldSelectOwnProps & InputProps & WrapperProps;

type SingleModeProps = {
  /** Выбранное значение: <br> - одно для single mode */
  value?: Option['value'];
  /** Колбек смены значения */
  onChange?(value: Option['value']): void;
};

type MultiModeProps = {
  /** <br> - массив для multi mode */
  value?: Option['value'][];
  onChange?(value: Option['value'][]): void;
  /** Колбек формирования текста */
  getSelectedItemsText?(amount: number): string;
};

export type FieldSelectSingleProps = WithSupportProps<FieldSelectBaseProps & SingleModeProps>;
export type FieldSelectMultiProps = WithSupportProps<FieldSelectBaseProps & MultiModeProps>;
