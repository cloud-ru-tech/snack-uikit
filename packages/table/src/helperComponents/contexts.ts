import { Table } from '@tanstack/react-table';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type RowContext = {
  dropListOpened: boolean;
  setDropListOpen: Dispatch<SetStateAction<boolean>>;
};

export const RowContext = createContext<RowContext>({
  dropListOpened: false,
  setDropListOpen() {},
});

export const useRowContext = () => useContext(RowContext);

type TableContext<TData> = {
  table: Table<TData>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContext<any>>({
  // No way to initialize table in context

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  table: {},
});

export const useTableContext = () => useContext(TableContext);
