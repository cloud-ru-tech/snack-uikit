import { PaginationState } from '@tanstack/react-table';
import { useEffect } from 'react';

type UsePageResetProps<TData extends object> = {
  data: TData[];
  pagination: PaginationState;
  onPaginationChange(state: PaginationState): void;
};

export function usePageReset<TData extends object>({ pagination, data, onPaginationChange }: UsePageResetProps<TData>) {
  useEffect(() => {
    const { pageIndex } = pagination;
    const maximumAvailablePage = data.length / pagination.pageSize;

    if (pageIndex > 0 && pageIndex >= maximumAvailablePage) {
      onPaginationChange({ ...pagination, pageIndex: 0 });
    }
  }, [data.length, onPaginationChange, pagination]);
}
