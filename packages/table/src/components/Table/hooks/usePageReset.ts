import { PaginationState } from '@tanstack/react-table';
import { useEffect } from 'react';

type UsePageResetProps = {
  manualPagination: boolean;
  maximumAvailablePage: number;
  pagination: PaginationState;
  onPaginationChange(state: PaginationState): void;
};

export function usePageReset({
  manualPagination,
  pagination,
  maximumAvailablePage,
  onPaginationChange,
}: UsePageResetProps) {
  useEffect(() => {
    const { pageIndex } = pagination;

    if (!manualPagination && pageIndex > 0 && pageIndex >= maximumAvailablePage) {
      onPaginationChange({ ...pagination, pageIndex: 0 });
    }
  }, [maximumAvailablePage, manualPagination, onPaginationChange, pagination]);
}
