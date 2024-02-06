import { useCallback, useMemo, useState } from 'react';

import { PaginationState } from '../../types';
import { Table, TableProps } from '../Table';
import { DEFAULT_PAGINATION_LIMIT } from './constants';
import { onSearchDebounced } from './utils';

export type ServerTableProps<TData extends object> = Omit<
  TableProps<TData>,
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
  search: {
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

export function ServerTable<TData extends object>({
  items,
  total = DEFAULT_PAGINATION_LIMIT,
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = 0,
  onChangePage,
  search,
  pagination,
  columnFilters,
  ...rest
}: ServerTableProps<TData>) {
  const [tempSearch, setTempSearch] = useState(search.initialValue || '');

  const handleSearch = useCallback(
    (newValue: string) => {
      setTempSearch(newValue);
      onSearchDebounced()(newValue.trim(), search.onChange);
    },

    [search.onChange],
  );

  const handlePageChange = useCallback(
    ({ pageSize, pageIndex }: PaginationState) => onChangePage(pageIndex * pageSize, pageSize),
    [onChangePage],
  );

  const pageIndex = useMemo(() => Math.floor(offset / limit), [limit, offset]);
  const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total]);

  return (
    <Table
      {...rest}
      data={items || []}
      search={{
        state: tempSearch,
        onChange: handleSearch,
        loading: search.loading,
        placeholder: search.placeholder,
      }}
      columnFilters={columnFilters}
      pageCount={pageCount}
      pagination={{
        ...pagination,
        state: {
          pageIndex,
          pageSize: limit,
        },
        onChange: handlePageChange,
      }}
      pageSize={limit}
    />
  );
}

ServerTable.getRowActionsColumnDef = Table.getRowActionsColumnDef;
ServerTable.getStatusColumnDef = Table.getStatusColumnDef;
