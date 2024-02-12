import { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ChipChoice } from '@snack-uikit/chips';
import { useLocale } from '@snack-uikit/locale';
import { Pagination } from '@snack-uikit/pagination';

import styles from './styles.module.scss';

export type TablePaginationProps<TData> = {
  table: Table<TData>;
  options?: number[];
  optionsLabel?: string;
  pageCount?: number;
};

export function TablePagination<TData>({
  table,
  options: optionsProp,
  optionsLabel: optionsLabelProp,
}: TablePaginationProps<TData>) {
  const { t } = useLocale('Table');
  const optionsLabel = optionsLabelProp ?? t('rowsOptionsLabel');

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
          size='xs'
          className={styles.pagination}
        />
      )}

      {options && table.getRowModel().rows.length >= Number(options[0].value) && (
        <ChipChoice.Single
          value={String(tablePaginationState.pageSize)}
          onChange={handleRowsVolumeOnChange}
          placement='top-end'
          options={options}
          label={optionsLabel}
          widthStrategy='auto'
          showClearButton={false}
          size='xs'
        />
      )}
    </div>
  );
}
