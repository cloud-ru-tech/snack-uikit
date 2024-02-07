import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { DropdownProps } from '@snack-uikit/dropdown';
import { WithSupportProps } from '@snack-uikit/utils';

import { ScrollProps, SearchState } from '../../types';
import { ItemProps } from '../Items';
import { ListContextPrivateType, ListContextType, SelectionState } from './contexts';

type CollapseState = {
  value?: (string | number)[];
  onChange?(value: (string | number)[]): void;
  defaultValue?: (string | number)[];
};

export type ListProps = WithSupportProps<
  {
    /** Основные элементы списка */
    items: ItemProps[];
    /** Элементы списка, закрепленные сверху */
    pinTop?: ItemProps[];
    /** Элементы списка, закрепленные снизу */
    pinBottom?: ItemProps[];
    /**
     * Кастомизируемый элемент в конце списка
     * @type ReactElement
     */
    footer?: ReactNode;
    /** Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка  */
    footerActiveElementsRefs?: RefObject<HTMLElement>[];
    /** Настройки поисковой строки */
    search?: SearchState;
    /** Флаг, отвещающий за состояние загрузки списка */
    loading?: boolean;
    /** Текст для состояния "Отсутсвие данных" */
    noData?: string;
    /** Текст для состояния "Отсутсвие результата" при поиске */
    noResults?: string;
    /** Tab Index */
    tabIndex?: number;
    /** Настройки раскрытия элементов */
    collapse?: CollapseState;
    /** CSS-класс */
    className?: string;
    onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  } & SelectionState &
    ListContextType &
    ScrollProps
>;

export type DroplistProps = {
  /** Ссылка на элемент-триггер для дроплиста */
  triggerElemRef?: RefObject<HTMLElement>;
  /** Триггер для дроплиста */
  children?: ReactNode;
} & Pick<DropdownProps, 'trigger' | 'placement' | 'widthStrategy' | 'open' | 'onOpenChange'> &
  Omit<ListProps, 'tabIndex' | 'onKeyDown'>;

export type ListPrivateProps = ListProps &
  ListContextPrivateType & {
    nested?: boolean;
    active?: boolean;
    tabIndex?: number;
    onFocus?(e: FocusEvent<HTMLElement>): void;
    onBlur?(e: FocusEvent<HTMLElement>): void;
    onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
    limitedScrollHeight?: boolean;
  };
