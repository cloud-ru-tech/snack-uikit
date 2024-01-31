import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { DropdownProps } from '@snack-uikit/dropdown';
import { WithSupportProps } from '@snack-uikit/utils';

import { ScrollProps, SearchState } from '../../types';
import { ItemProps } from '../Items';
import { ListContextType, SelectionProviderProps } from './contexts';

export type ListProps = WithSupportProps<
  {
    /** Основные элементы списка */
    items: ItemProps[];
    /** Элементы списка, закрепленные сверху */
    pinTop?: ItemProps[];
    /** Элементы списка, закрепленные снизу */
    pinBottom?: ItemProps[];
    /** Кастомизируемый элемент, помещаемый внизу списка */
    footer?: ReactNode;
    /** Список ссылок на костомные элементы, помещенные в специальную секцию внизу списка  */
    footerActiveElementsRefs?: RefObject<HTMLElement>[];
    // TODO: add later
    // collapse?: 'single' | 'multiple';
    /** Настройки поисковой строки */
    search?: SearchState;
    /** Флаг, отвещающий за состояние загрузки списка */
    loading?: boolean;
    /** Текст для состояния "Отсутсвие данных" */
    noData?: string;
    /** Текст для состояния "Отсутсвие результата" при поиске */
    noResults?: string;
  } & Pick<SelectionProviderProps, 'value' | 'defaultValue' | 'onChange' | 'selection'> &
    ListContextType &
    ScrollProps
>;

export type DroplistProps = {
  /** Ссылка на элемент-триггер для дроплиста */
  triggerElemRef?: RefObject<HTMLElement>;
  /** Триггер для дроплиста */
  children?: ReactNode;
} & Pick<DropdownProps, 'trigger' | 'placement' | 'widthStrategy' | 'open' | 'onOpenChange'> &
  ListProps;

export type ListPrivateProps = ListProps & {
  nested?: boolean;
  active?: boolean;
  tabIndex?: number;
  onFocus?(e: FocusEvent<HTMLElement>): void;
  onBlur?(e: FocusEvent<HTMLElement>): void;
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  // TODO: remove later
  collapse?: 'single' | 'multiple';
};
