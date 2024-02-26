import { ReactElement } from 'react';

import { InputPrivateProps } from '@snack-uikit/input-private';
import {
  AccordionItemProps,
  BaseItemProps,
  GroupItemProps,
  ListProps,
  NextListItemProps,
  SelectionMultipleState,
  SelectionSingleState,
} from '@snack-uikit/list';
import { WithSupportProps } from '@snack-uikit/utils';

import { FieldDecoratorProps } from '../FieldDecorator';

// eslint-disable-next-line no-use-before-define
export type OptionProps = BaseOptionProps | AccordionOptionProps | GroupOptionProps | NestListOptionProps;

// eslint-disable-next-line no-use-before-define
export type OptionWithoutGroup = BaseOptionProps | AccordionOptionProps | NestListOptionProps;

export type BaseOptionProps = Pick<BaseItemProps, 'beforeContent' | 'afterContent' | 'disabled'> &
  BaseItemProps['content'] & { value: string | number };

export type AccordionOptionProps = Pick<AccordionItemProps, 'type'> & BaseOptionProps & { options: OptionProps[] };
export type GroupOptionProps = Omit<GroupItemProps, 'items' | 'id'> & { options: OptionProps[] };
export type NestListOptionProps = Pick<NextListItemProps, 'type'> & BaseOptionProps & { options: OptionProps[] };

export type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'placeholder' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur' | 'onKeyDown'
>;

export type WrapperProps = Pick<
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
  | 'error'
>;

export type SearchState = {
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
};

export type FieldSelectPrivateProps = InputProps & WrapperProps & { options: OptionProps[]; loading?: boolean };

type FiledSelectCommonProps = WithSupportProps<{
  options: OptionProps[];
  searchable?: boolean;
  /** Отображение кнопки Копировать для поля (актуально только для `readonly = true`) */
  showCopyButton?: boolean;
  /**
   * Отображение кнопки очистки поля
   * @default true
   */
  showClearButton?: boolean;
  /**
   * Является ли поле доступным только для чтения
   * @default false
   */
  readonly?: boolean;

  /** Иконка-префикс для поля */
  prefixIcon?: ReactElement;

  footer?: ListProps['footer'];

  search?: SearchState;

  autocomplete?: boolean;

  addOptionByEnter?: boolean;

  open?: boolean;
  onOpenChange?(open: boolean): void;
}> &
  Pick<
    ListProps,
    'dataError' | 'noDataState' | 'noResultsState' | 'errorDataState' | 'pinTop' | 'pinBottom' | 'dataFiltered'
  >;

export type FieldSelectSingleProps = FieldSelectPrivateProps &
  Omit<SelectionSingleState, 'mode'> &
  WrapperProps &
  FiledSelectCommonProps;

export type FieldSelectMultipleProps = FieldSelectPrivateProps & { removeByBackspace?: boolean } & Omit<
    SelectionMultipleState,
    'mode'
  > &
  Omit<FiledSelectCommonProps, 'showCopyButton'>;

export type FieldSelectProps =
  | (FieldSelectSingleProps & { selection?: 'single' })
  | (FieldSelectMultipleProps & { selection: 'multiple' });

export type ItemWithId = BaseItemProps | AccordionItemProps | NextListItemProps;
