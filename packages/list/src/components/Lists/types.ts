import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { DropdownProps } from '@snack-uikit/dropdown';
import { WithSupportProps } from '@snack-uikit/utils';

import { EmptyStateProps } from '../../helperComponents';
import { ScrollProps, SearchState } from '../../types';
import { FlattenBaseItem, Item, ItemId } from '../Items';
import { CollapseState, PublicListContextType, SelectionState } from './contexts';

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
    items: Item[];
    /** Элементы списка, закрепленные сверху */
    pinTop?: Item[];
    /** Элементы списка, закрепленные снизу */
    pinBottom?: Item[];
    /**
     * Кастомизируемый элемент в конце списка
     * @type ReactNode;
     */
    footer?: ReactNode;
    /** Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка  */
    footerActiveElementsRefs?: RefObject<HTMLElement>[];
    /** Ссылка на управление навигацией листа с клавиатуры  */
    keyboardNavigationRef?: RefObject<{ focusItem(id: ItemId): void }>;
    /** Настройки поисковой строки */
    search?: SearchState;

    /** Tab Index */
    tabIndex?: number;
    /** Настройки раскрытия элементов */
    collapse?: CollapseState;
    /** CSS-класс */
    className?: string;

    /** Флаг, отвещающий за состояние загрузки списка */
    loading?: boolean;

    /** Обработчик события по нажатию клавиш */
    onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
    /** Флаг, отвещающий за включение самого родительского контейнера листа в цепочку фокусирующихся элементов */
    hasListInFocusChain?: boolean;
    /** Флаг, отвещающий за прокручивание до выбранного элемента */
    scrollToSelectedItem?: boolean;
    /** CSS-класс для scroll обертки основного списка айтемов */
    scrollContainerClassName?: string;
    /**
     * Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка
     */
    virtualized?: boolean;
  } & SelectionState &
    PublicListContextType &
    ScrollProps &
    EmptyState
>;

export type DroplistProps = {
  /** Ссылка на элемент-триггер для дроплиста */
  triggerElemRef?: RefObject<HTMLElement>;
  /** Ссылка на элемент выпадающего списка */
  listRef?: RefObject<HTMLElement>;
  /**
   * Закрывать выпадающий список после клика на базовый айтем.
   *
   * Работает в режимах selection: 'none' | 'single'
   *
   * @default false
   */
  closeDroplistOnItemClick?: boolean;

  /**
   * Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка
   */
  virtualized?: boolean;

  /** Триггер для дроплиста
   * @type ReactNode | ({onKeyDown}) => ReactNode
   *
   * Рендер функция принимает аргументы `onKeyDown` - хендлер ввода, для поддержки управления с клавиатуры
   */
  children: ReactNode | ((params: { onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void }) => ReactNode);
} & Pick<
  DropdownProps,
  'trigger' | 'placement' | 'widthStrategy' | 'open' | 'onOpenChange' | 'triggerClassName' | 'closeOnPopstate'
> &
  Omit<ListProps, 'tabIndex' | 'onKeyDown' | 'hasListInFocusChain' | 'keyboardNavigationRef'>;

export type ListPrivateProps = Omit<ListProps, 'pinTop' | 'pinBottom' | 'items' | 'hasListInFocusChain'> & {
  nested?: boolean;
  active?: boolean;
  tabIndex?: number;
  virtualized?: boolean;
  onFocus?(e: FocusEvent<HTMLElement>): void;
  onBlur?(e: FocusEvent<HTMLElement>): void;
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  limitedScrollHeight?: boolean;
  searchItem?: FlattenBaseItem;
  pinTop?: ItemId[];
  items: ItemId[];
  pinBottom?: ItemId[];
};
