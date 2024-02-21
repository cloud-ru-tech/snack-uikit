import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { DropdownProps } from '@snack-uikit/dropdown';
import { WithSupportProps } from '@snack-uikit/utils';

import { EmptyStateProps } from '../../helperComponents';
import { ScrollProps, SearchState } from '../../types';
import { ItemProps } from '../Items';
import { ListContextPrivateType, ListContextType, SelectionState } from './contexts';

type CollapseState = {
  value?: (string | number)[];
  onChange?(value: (string | number)[]): void;
  defaultValue?: (string | number)[];
};

export type EmptyState = {
  dataFiltered?: boolean;
  dataError?: boolean;

  /** Экран при отстутствии данных */
  noDataState?: EmptyStateProps;
  /** Экран при отстутствии результатов поиска или фильтров */
  noResultsState?: EmptyStateProps;
  /** Экран при ошибке запроса */
  errorDataState?: EmptyStateProps;
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
     * @type ReactNode;
     */
    footer?: ReactNode;
    /** Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка  */
    footerActiveElementsRefs?: RefObject<HTMLElement>[];
    /** Настройки поисковой строки */
    search?: SearchState;

    /** Tab Index */
    tabIndex?: number;
    /** Настройки раскрытия элементов */
    collapse?: CollapseState;
    /** CSS-класс */
    className?: string;
    onKeyDown?(e: KeyboardEvent<HTMLElement>): void;

    /** Флаг, отвещающий за состояние загрузки списка */
    loading?: boolean;
  } & SelectionState &
    ListContextType &
    ScrollProps &
    EmptyState
>;

export type DroplistProps = {
  /** Ссылка на элемент-триггер для дроплиста */
  triggerElemRef?: RefObject<HTMLElement>;

  /** Триггер для дроплиста
   * @type ReactNode | ({onKeyDown}) => ReactNode
   *
   * Рендер функция принимает аргументы `onKeyDown` - хендлер ввода, для поддержки управления с клавиатуры
   */
  children: ReactNode | ((params: { onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void }) => ReactNode);
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
