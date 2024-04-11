import { ReactElement } from 'react';

import { InputPrivateProps } from '@snack-uikit/input-private';
import {
  AccordionItemProps,
  BaseItemProps,
  DroplistProps,
  GroupItemProps,
  ItemContentProps,
  NextListItemProps,
  SelectionMultipleState,
  SelectionSingleState,
} from '@snack-uikit/list';
import { TagProps } from '@snack-uikit/tag';
import { WithSupportProps } from '@snack-uikit/utils';

import { FieldDecoratorProps } from '../FieldDecorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type OptionProps =
  // eslint-disable-next-line no-use-before-define
  | BaseOptionProps
  // eslint-disable-next-line no-use-before-define
  | AccordionOptionProps
  // eslint-disable-next-line no-use-before-define
  | GroupOptionProps
  // eslint-disable-next-line no-use-before-define
  | NestListOptionProps;

// eslint-disable-next-line no-use-before-define
export type OptionWithoutGroup = BaseOptionProps | AccordionOptionProps | NestListOptionProps;

export type BaseOptionProps = Pick<BaseItemProps, 'beforeContent' | 'afterContent' | 'disabled'> &
  Pick<ItemContentProps, 'option' | 'caption' | 'description'> & { value: string | number } & Pick<
    TagProps,
    'appearance'
  >;

export type AccordionOptionProps = Pick<AccordionItemProps, 'type'> & BaseOptionProps & { options: OptionProps[] };

export type GroupOptionProps = Omit<GroupItemProps, 'items' | 'id'> & {
  options: OptionProps[];
};
export type NestListOptionProps = Pick<NextListItemProps, 'type' | 'onSublistOpenChanged' | 'id'> &
  BaseOptionProps & { options: OptionProps[] };

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

export type ItemWithId = (BaseItemProps | AccordionItemProps | NextListItemProps) & {
  placeholder?: boolean;
  appearance?: TagProps['appearance'];
};

export type SelectedOptionFormatter = (item?: ItemWithId) => string;

export type SearchState = {
  value?: string;
  defaultValue?: string;
  onChange?(value: string): void;
};

export type FieldSelectPrivateProps = InputProps & WrapperProps & { options: OptionProps[]; loading?: boolean };

type FiledSelectCommonProps = WithSupportProps<{
  options: OptionProps[];

  pinTop: OptionProps[];
  pinBottom: OptionProps[];

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

  footer?: DroplistProps['footer'];

  widthStrategy?: DroplistProps['widthStrategy'];

  search?: SearchState;

  autocomplete?: boolean;

  addOptionByEnter?: boolean;

  open?: boolean;

  onOpenChange?(open: boolean): void;

  selectedOptionFormatter?: SelectedOptionFormatter;
}> &
  Pick<DroplistProps, 'dataError' | 'noDataState' | 'noResultsState' | 'errorDataState' | 'dataFiltered'>;

export type FieldSelectSingleProps = FieldSelectPrivateProps &
  Omit<SelectionSingleState, 'mode'> &
  WrapperProps &
  FiledSelectCommonProps;

export type FieldSelectMultipleProps = FieldSelectPrivateProps & {
  removeByBackspace?: boolean;
} & Omit<SelectionMultipleState, 'mode'> &
  Omit<FiledSelectCommonProps, 'showCopyButton'>;

export type FieldSelectProps =
  | (FieldSelectSingleProps & { selection?: 'single' })
  | (FieldSelectMultipleProps & { selection: 'multiple' });
