import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { TruncateStringProps } from '@snack-uikit/truncate-string';
import { WithSupportProps } from '@snack-uikit/utils';

import { ItemContentProps } from '../../helperComponents';
import { ScrollProps } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type ItemId = string | number;

type ItemContent = ItemContentProps;

export type BaseItem = WithSupportProps<{
  /**
   * Слот до основного контента
   * @type ReactElement
   */
  beforeContent?: ReactNode;
  /**
   * Слот после основного контента
   * @type ReactElement
   */
  afterContent?: ReactNode;
  /**
   * Основной контент айтема
   */
  content?: ItemContent | ReactNode;
  /** Колбек обработки клика */
  onClick?(e: MouseEvent<HTMLElement>): void;
  /** Колбек обработки нажатия кнопки мыши */
  onMouseDown?(e: MouseEvent<HTMLElement>): void;
  /** Колбек обработки нажатия клавиши */
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  /** Колбек обработки фокуса */
  onFocus?(e: FocusEvent<HTMLElement>): void;
  /** Колбек обработки блюра */
  onBlur?(e: FocusEvent<HTMLElement>): void;
  /** Уникальный идентификатор */
  id?: ItemId;
  /** Флаг неактивности элемента */
  disabled?: boolean;
  /** Флаг присутствия элемента */
  hidden?: boolean;

  itemRef?: RefObject<HTMLElement>;

  className?: string;
  /**
   * Флаг отображения отключения реакции на любое css состояние (hover/focus и тд)
   * <br>
   * Так же элемент пропадает из навигации с клавиатуры, и не может быть выбран (selection)
   */
  inactive?: boolean;
  /**
   * Флаг отображения состояния выбранного элемента через switch
   */
  switch?: boolean;

  itemWrapRender?(item: ReactNode): ReactNode;
}>;

type BaseItemWithoutNonGroup = Omit<BaseItem, 'switch' | 'inactive'>;

// eslint-disable-next-line no-use-before-define
export type Item = BaseItem | AccordionItem | NextListItem | GroupItem | GroupSelectItem;

export type AccordionItem = BaseItemWithoutNonGroup & {
  items: Item[];
  type: 'collapse';
};

export type NextListItem = BaseItemWithoutNonGroup &
  ScrollProps & {
    items: Item[];
    type: 'next-list';

    onSublistOpenChanged?(open: boolean, id?: ItemId): void;

    loading?: boolean;
    dataError?: boolean;
    dataFiltered?: boolean;

    placement?: 'right-start' | 'left-start' | 'left' | 'right' | 'left-end' | 'right-end';
  };

type CommonGroupItem = {
  label?: string;
  truncate?: {
    variant?: TruncateStringProps['variant'];
  };
  mode?: 'primary' | 'secondary';
  hidden?: boolean;
  divider?: boolean;
};

export type GroupItem = CommonGroupItem & {
  items: Item[];
  type: 'group';
};

export type GroupSelectItem = CommonGroupItem & {
  items: Item[];
  type: 'group-select';

  id?: ItemId;
  itemRef?: RefObject<HTMLElement>;
};

type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export type Flatten<T, K extends keyof T> = RequiredFields<T, K>;

export type CommonFlattenProps = {
  items: ItemId[];
  allChildIds: ItemId[];
};

export type FlattenBaseItem = Flatten<BaseItem, 'id'>;
export type FlattenNextListItem = Flatten<Omit<NextListItem, 'items'>, 'id'>;
export type FlattenGroupListItem = Omit<GroupItem, 'items'> & { id: ItemId };
export type FlattenGroupSelectListItem = Flatten<Omit<GroupSelectItem, 'items'>, 'id'>;
export type FlattenAccordionItem = Flatten<Omit<AccordionItem, 'items'>, 'id'>;

export type FlattenItem =
  | FlattenBaseItem
  | ((FlattenNextListItem | FlattenGroupListItem | FlattenAccordionItem | FlattenGroupSelectListItem) &
      CommonFlattenProps);

export type FocusFlattenItem = {
  key: ItemId;
  id: ItemId;

  originalId: ItemId;
  parentId?: ItemId;

  itemRef?: RefObject<HTMLElement>;
  type?: 'next-list' | 'collapse' | 'group' | 'group-select';

  disabled?: boolean;
} & CommonFlattenProps;

export type ItemProps = Item;
export type BaseItemProps = BaseItem;
export type GroupItemProps = GroupItem;
export type NextListItemProps = NextListItem;
export type AccordionItemProps = AccordionItem;
export type GroupSelectItemProps = GroupSelectItem;
