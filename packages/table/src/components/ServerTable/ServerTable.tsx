import { useCallback, useMemo, useState } from 'react';

import { STATUS_APPEARANCE } from '../../helperComponents';
import { PaginationState } from '../../types';
import { Table } from '../Table';
import { useStateControl } from '../Table/hooks/useStateControl';
import { ServerTableProps } from '../types';
import { DEFAULT_PAGINATION_LIMIT } from './constants';
import { onSearchDebounced } from './utils';

export function ServerTable<TData extends object>({
  items,
  total = DEFAULT_PAGINATION_LIMIT,
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = 0,
  onChangePage,
  search: searchProp,
  pagination,
  columnFilters,
  manualSorting = true,
  manualPagination = true,
  manualFiltering = true,
  ...rest
}: ServerTableProps<TData>) {
  // добавить uncontrolledState

  const { state: search, onStateChange: setSearch } = useStateControl<string>(searchProp, '');

  const [tempSearch, setTempSearch] = useState(search || '');

  const handleSearch = useCallback(
    (newValue: string) => {
      setTempSearch(newValue);
      onSearchDebounced(newValue.trim(), setSearch);
    },

    [setSearch],
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
        loading: searchProp?.loading,
        placeholder: searchProp?.placeholder,
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
      manualSorting={manualSorting}
      manualFiltering={manualFiltering}
      manualPagination={manualPagination}
    />
  );
}

ServerTable.getRowActionsColumnDef = Table.getRowActionsColumnDef;
ServerTable.statusAppearances = STATUS_APPEARANCE;
ServerTable.getStatusColumnDef = Table.getStatusColumnDef;
