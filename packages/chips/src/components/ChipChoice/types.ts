import { MouseEventHandler, ReactNode } from 'react';

import { DropdownProps } from '@snack-uikit/dropdown';
import {
  BaseItemProps,
  DroplistProps,
  GroupItemProps,
  GroupSelectItemProps,
  ItemContentProps,
  ItemId,
  NextListItemProps,
  SelectionMultipleState,
  SelectionSingleState,
} from '@snack-uikit/list';
import { WithSupportProps } from '@snack-uikit/utils';

import { BaseChipProps, Size } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type ContentRenderProps = Omit<ItemContentProps, 'option' | 'disabled'>;

export type FilterOption<T extends ContentRenderProps = ContentRenderProps> =
  // eslint-disable-next-line no-use-before-define
  | BaseOption<T>
  // eslint-disable-next-line no-use-before-define
  | AccordionOption<T>
  // eslint-disable-next-line no-use-before-define
  | GroupOption<T>
  // eslint-disable-next-line no-use-before-define
  | GroupSelectOption<T>
  // eslint-disable-next-line no-use-before-define
  | NestListOption<T>;

export type BaseOption<T extends ContentRenderProps = ContentRenderProps> = Omit<BaseItemProps, 'content' | 'id'> & {
  value: ItemId;
  label: ItemId;
  contentRenderProps?: T;
};

export type AccordionOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  BaseOption<T>,
  'switch' | 'inactive' | 'value'
> & {
  id?: ItemId;
  type: 'collapse';
  options: FilterOption<T>[];
};

export type GroupOption<T extends ContentRenderProps = ContentRenderProps> = Omit<GroupItemProps, 'items'> & {
  options: FilterOption<T>[];
};

export type GroupSelectOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  GroupSelectItemProps,
  'items'
> & {
  options: FilterOption<T>[];
};

export type NestListOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  NextListItemProps,
  'items' | 'content'
> & {
  label: ItemId;
  contentRenderProps?: T;
  options: FilterOption<T>[];
};

export type ChipChoiceCommonProps = WithSupportProps<
  Partial<BaseChipProps> & {
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    /** Отображение кнопки очистки значения @default true*/
    showClearButton?: boolean;
    /** Расположение выпадающего меню */
    placement?: DropdownProps['placement'];
    /**
     * Стратегия управления шириной контейнера поповера
     * <br> - `auto` - соответствует ширине контента,
     * <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
     * <br> - `eq` - Equal, строго равен ширине таргета.
     * @default gte
     */
    widthStrategy?: DropdownProps['widthStrategy'];
    dropDownClassName?: string;
  }
>;

export type ChipChoiceSelectCommonProps<T extends ContentRenderProps = ContentRenderProps> = ChipChoiceCommonProps & {
  options: FilterOption<T>[];

  contentRender?(option: { label: ItemId; value?: ItemId; contentRenderProps?: T }): ReactNode;
  filterFn?(option: { label: ItemId; value?: ItemId; contentRenderProps?: T }): boolean;

  searchable?: boolean;

  /** Флаг, отвечающий за применение выбранного значения по умолчанию  */
  autoApply?: boolean;
  /** Колбек основной кнопки */
  onApprove?: () => void;
  /** Колбек кнопки отмены */
  onCancel?: () => void;
} & Pick<
    DroplistProps,
    | 'selection'
    | 'scrollRef'
    | 'scrollContainerRef'
    | 'noDataState'
    | 'footer'
    | 'footerActiveElementsRefs'
    | 'dataError'
    | 'errorDataState'
    | 'dataFiltered'
    | 'noResultsState'
    | 'loading'
    | 'scrollToSelectedItem'
  >;

export type ChipChoiceSingleProps<T extends ContentRenderProps = ContentRenderProps> = ChipChoiceSelectCommonProps<T> &
  Omit<SelectionSingleState, 'mode'> & {
    /** Массив опций */
    options: FilterOption<T>[];
    /** Колбек формирующий отображение выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label */
    valueRender?(option?: BaseOption<T>): ReactNode;
  };

export type ChipChoiceMultipleProps<T extends ContentRenderProps = ContentRenderProps> =
  ChipChoiceSelectCommonProps<T> &
    Omit<SelectionMultipleState, 'mode'> & {
      /** Массив опций */
      options: FilterOption<T>[];
      /** Колбек формирующий отображение выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label */
      valueRender?(option?: BaseOption<T>[]): ReactNode;
    };
