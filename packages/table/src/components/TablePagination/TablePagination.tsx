import { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { FilterChip } from '@snack-ui/chips';
import { Pagination } from '@snack-ui/pagination';
import { Typography } from '@snack-ui/typography';

import styles from './styles.module.scss';

export type TablePaginationProps<TData> = {
  table: Table<TData>;
  options?: number[];
  optionsLabel?: string;
};

export function TablePagination<TData>({
  table,
  options: optionsProp,
  optionsLabel = 'Rows volume',
}: TablePaginationProps<TData>) {
  const handlePaginationOnChange = useCallback(
    (pageIndex: number) => {
      table.setPageIndex(pageIndex - 1);
    },
    [table],
  );

  const handleRowsVolumeOnChange = useCallback(
    (value: string) => {
      table.setPageSize(Number(value));
    },
    [table],
  );

  const options = useMemo(
    () => optionsProp?.sort((a, b) => a - b).map(value => ({ label: String(value), value: String(value) })),
    [optionsProp],
  );

  const tablePaginationState = table.getState().pagination;

  if (table.getPageCount() <= 1 && !options) {
    return null;
  }

  return (
    <div className={styles.footer}>
      {table.getPageCount() > 1 && (
        <Pagination
          total={table.getPageCount()}
          page={tablePaginationState.pageIndex + 1}
          onChange={handlePaginationOnChange}
          className={styles.pagination}
        />
      )}

      {options && table.getRowModel().rows.length >= Number(options[0].value) && (
        <div className={styles.rowsVolumeWrapper}>
          {optionsLabel && (
            <Typography.SansBodyS className={styles.rowsVolumeLabel}>{optionsLabel}</Typography.SansBodyS>
          )}

          <FilterChip
            selectionMode={FilterChip.selectionModes.Single}
            value={String(tablePaginationState.pageSize)}
            onChangeValue={handleRowsVolumeOnChange}
            placement={FilterChip.placements.Top}
            options={options}
          />
        </div>
      )}
    </div>
  );
}
