import {
  PaginationState,
  Row,
  RowPinningState,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';
import { ReactNode, RefObject } from 'react';

import { ChipChoiceRowProps, FiltersState } from '@snack-uikit/chips';
import { ToolbarProps } from '@snack-uikit/toolbar';
import { WithSupportProps } from '@snack-uikit/utils';

import { EmptyStateProps, ExportButtonProps, RowClickHandler } from '../helperComponents';
import { TreeColumnDefinitionProps } from '../helperComponents/Cells/TreeCell';
import { ColumnDefinition } from '../types';

type BulkAction = Omit<NonNullable<ToolbarProps<Record<string, string>>['bulkActions']>[number], 'onClick'> & {
  onClick?(selectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void): void;
};

export type TableProps<
  TData extends object,
  TFilters extends FiltersState = Record<string, unknown>,
> = WithSupportProps<{
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];
  /** Параметр отвечает за отображение закрепленных строк на всех страницах таблицы @default false*/
  keepPinnedRows?: boolean;
  /** Параметр отвечает за сохранение закрепленных строк в теле таблицы @default false*/
  copyPinnedRows?: boolean;
  /** Параметр отвечает за чекбокс выбора закрепленных строк */
  enableSelectPinned?: boolean;
  /** Параметры отвечают за возможность сортировки, их стоит использовать если нужно отслеживать состояние <br>
   *  <strong>initialState</strong>: Начальное состояние сортировки <br>
   *  <strong>state</strong>: Состояние сортировки, жестко устанавливаемое снаружи <br>
   * <strong>onChange</strong>: Колбэк на изменение сортировки
   *  */
  sorting?: {
    initialState?: SortingState;
    state?: SortingState;
    onChange?(state: SortingState): void;
  };

  /** Параметр отвечает за общие настройки раскрывающихся строк*/
  expanding?: {
    /** Метод отвечает за получение дочерних строк*/
    getSubRows: (element: TData) => TData[] | undefined;
    expandingColumnDefinition: TreeColumnDefinitionProps<TData>;
  };
  /** Параметры отвечают за возможность выбора строк <br>
   * <strong>initialState</strong>: Начальное состояние выбора строк <br>
   * <strong>state</strong>: Состояние выбора строк, жестко устанавливаемое снаружи <br>
   * <strong>enable</strong>: Колбэк определяющий можно ли выбрать строку <br>
   * <strong>multiRow</strong>: Мульти-выбор строк (включен по-умолчанию, когда включается выбор) <br>
   * <strong>onChange</strong>: Колбэк на выбор строк
   *  */
  rowSelection?: {
    initialState?: RowSelectionState;
    state?: RowSelectionState;
    enable?: RowSelectionOptions<TData>['enableRowSelection'];
    multiRow?: boolean;
    onChange?(state: RowSelectionState): void;
  };
  /** Параметры отвечают за глобальный поиск в таблице <br>
   * <strong>initialState</strong>: Начальное состояние строки поиска <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>placeholder</strong>: Placeholder строки поиска @default 'Search'<br>
   * <strong>loading</strong>: Состояние загрузки в строке поиска <br>
   * <strong>onChange</strong>: Колбэк на изменение данных в строке поиска
   *  */
  search?: {
    initialState?: string;
    state?: string;
    placeholder?: string;
    loading?: boolean;
    onChange?(value: string): void;
  };

  /** Включить нечеткий поиск  */
  enableFuzzySearch?: boolean;

  /** Максимальное кол-во строк на страницу @default 10 */
  pageSize?: number;

  /** Параметры отвечают за пагинацию в таблице <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>options</strong>: Варианты в выпадающем селекторе для установки кол-ва строк на страницу <br>
   * <strong>optionsLabel</strong>: Текст для селектора кол-ва строк на страницу @default 'Rows volume: ' <br>
   * <strong>onChange</strong>: Колбэк на изменение пагинации
   *  */
  pagination?: {
    state?: PaginationState;
    options?: number[];
    optionsLabel?: string;
    onChange?(state: PaginationState): void;
    optionsRender?(value: string | number, idx: number): string | number;
  };

  /** Автоматический сброс пагинации к первой странице при изменении данных или состояния
   * (e.g фильтры, сортировки, и т.д)
   * */
  autoResetPageIndex?: boolean;

  /** Кол-во страниц (используется для внешнего управления) */
  pageCount?: number;

  /** Колбэк клика по строке */
  onRowClick?: RowClickHandler<TData>;
  /** CSS-класс */
  className?: string;

  /** Состояние загрузки */
  loading?: boolean;

  /** Колбек обновления данных */
  onRefresh?(): void;

  /** Внешний бордер для тулбара и таблицы */
  outline?: boolean;

  /** Фильтры */
  columnFilters?: ChipChoiceRowProps<TFilters>;

  /** Флаг, показывающий что данные были отфильтрованы при пустых данных */
  dataFiltered?: boolean;
  /** Флаг, показывающий что произошла ошибка запроса при пустых данных */
  dataError?: boolean;

  /** Экран при отстутствии данных */
  noDataState?: EmptyStateProps;
  /** Экран при отстутствии результатов поиска или фильтров */
  noResultsState?: EmptyStateProps;
  /** Экран при ошибке запроса */
  errorDataState?: EmptyStateProps;

  /** Отключение тулбара */
  suppressToolbar?: boolean;
  /** Отключение поиска */
  suppressSearch?: boolean;
  /** Список действия для массовых операций */
  bulkActions?: BulkAction[];
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: ToolbarProps<TFilters>['moreActions'];
  /** Дополнительный слот в `Toolbar` после строки поиска */
  toolbarAfter?: ReactNode;
  /** Настройки экспорта в тулбаре */
  exportSettings?: ExportButtonProps<TData>['settings'];

  /** Отключение пагинации */
  suppressPagination?: boolean;

  // Вынести это на пропсы
  manualSorting?: boolean;
  manualPagination?: boolean;
  manualFiltering?: boolean;

  /** Дополнительная функция используется для получения уникального идентификатора для любой заданной строки */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;

  /** Ссылка на элемент, обозначающий самый конец прокручиваемого списка */
  scrollRef?: RefObject<HTMLElement>;
  /** Ссылка на контейнер, который скроллится */
  scrollContainerRef?: RefObject<HTMLElement>;
  /** Определение какие строки должны быть закреплены в таблице */
  rowPinning?: Pick<RowPinningState, 'top'>;

  /** Конфиг для сохранения состояния в localStorage. <br>
   *  Поле id должно быть уникальным для разных таблиц в рамках приложения. <br>
   *  Для корректной работы необходимо наличие id в конфиге columnDefinitions
   *  */
  savedState?: {
    id: string;
    resize?: boolean;
  };
}>;

export type ServerTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = Omit<
  TableProps<TData, TFilters>,
  'pageSize' | 'pageCount' | 'pagination' | 'search' | 'data'
> & {
  /** Данные для отрисовки */
  items?: TData[];
  /**
   * Общее кол-во строк
   * @default 10
   */
  total?: number;
  /**
   * Кол-во строк на страницу
   * @default 10
   */
  limit?: number;
  /**
   * Смещение
   * @default 0
   * */
  offset?: number;

  onChangePage(offset: number, limit: number): void;

  /** Параметры отвечают за глобальный поиск в таблице <br>
   * <strong>initialState</strong>: Начальное состояние строки поиска <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>placeholder</strong>: Placeholder строки поиска @default 'Search...'<br>
   * <strong>loading</strong>: Состояние загрузки в строке поиска <br>
   * <strong>onChange</strong>: Колбэк на изменение данных в строке поиска
   *  */
  search?: {
    initialValue?: string;
    state: string;
    placeholder?: string;
    loading?: boolean;
    onChange(value: string): void;
  };

  /** Параметры отвечают за пагинацию в таблице <br>
   * <strong>options</strong>: Варианты в выпадающем селекторе для установки кол-ва строк на страницу<br>
   * <strong>optionsLabel</strong>: Текст для селектора кол-ва строк на страницу @default 'Rows volume' <br>
   *  */
  pagination?: {
    options?: number[];
    optionsLabel?: string;
  };
};
