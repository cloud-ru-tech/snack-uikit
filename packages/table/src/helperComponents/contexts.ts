import { Table } from '@tanstack/react-table';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { RowAppearance } from '../components/types';
import { TABLE_ROW_COLOR } from '../constants';

type RowContext = {
  dropListOpened: boolean;
  setDropListOpen: Dispatch<SetStateAction<boolean>>;
  disabledRowAppearance: RowAppearance;
};

export const RowContext = createContext<RowContext>({
  dropListOpened: false,
  setDropListOpen() {},
  disabledRowAppearance: RowAppearance.Disabled,
});

export const useRowContext = () => useContext(RowContext);

type TableContext<TData> = {
  table: Table<TData>;
  getRowBackgroundColor?: (data: TData) => ValueOf<typeof TABLE_ROW_COLOR> | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContext<any>>({
  // No way to initialize table in context

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  table: {},
});

export const useTableContext = () => useContext(TableContext);
