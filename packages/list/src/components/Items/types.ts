import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { TruncateStringProps } from '@snack-uikit/truncate-string';
import { WithSupportProps } from '@snack-uikit/utils';

import { SeparatorProps } from '../../helperComponents';
import { ScrollProps, SearchState } from '../../types';

export type ItemContentProps = {
  option: string;
  caption?: string;
  description?: string;
  truncate?: {
    option?: number;
    description?: number;
    variant?: TruncateStringProps['variant'];
  };
};

export type BaseItemPrivateProps = {
  expandIcon?: ReactNode;
  open?: boolean;
};

export type BaseItemProps = WithSupportProps<{
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
  /** Основной контент айтема */
  content: ItemContentProps;

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
  id?: string | number;

  /** Флаг неактивности элемента */
  disabled?: boolean;

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

  key?: string | number;

  itemWrapRender?(item: ReactNode): ReactNode;
}>;

type BaseItemsWithoutNonGroupProps = Omit<BaseItemProps, 'switch' | 'inactive'>;

// eslint-disable-next-line no-use-before-define
export type ItemProps = BaseItemProps | AccordionItemProps | NextListItemProps | GroupItemProps;

export type AccordionItemProps = BaseItemsWithoutNonGroupProps & {
  items: ItemProps[];
  type: 'collapse';
};

export type NextListItemProps = BaseItemsWithoutNonGroupProps & {
  items: ItemProps[];
  type: 'next-list';
  placement?: 'right-start' | 'left-start' | 'left' | 'right' | 'left-end' | 'right-end';
  search?: SearchState;
} & ScrollProps;

export type GroupItemProps = Omit<SeparatorProps, 'size'> & {
  items: ItemProps[];
  id?: string | number;
};
