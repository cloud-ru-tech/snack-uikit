import { Row } from '@tanstack/react-table';
import { MouseEvent } from 'react';

import { Checkbox, Radio } from '@snack-uikit/toggles';

import { COLUMN_PIN_POSITION, DefaultColumns, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import styles from './styles.module.scss';

function getRowsToToggle<TData>(rows: Row<TData>[], clickedRowId: string, previousClickedRowId: string) {
  const rowsToToggle: Row<TData>[] = [];
  const processedRowsMap: Record<string, boolean> = {
    [clickedRowId]: false,
    [previousClickedRowId]: false,
  };

  const engagedRows = [clickedRowId, previousClickedRowId];

  for (const row of rows) {
    if (engagedRows.includes(row.id)) {
      if (previousClickedRowId === '') {
        rowsToToggle.push(row);
        break;
      }

      processedRowsMap[row.id] = true;
    }

    if ((processedRowsMap[clickedRowId] || processedRowsMap[previousClickedRowId]) && !row.getIsGrouped()) {
      rowsToToggle.push(row);
    }

    if (processedRowsMap[clickedRowId] && processedRowsMap[previousClickedRowId]) {
      break;
    }
  }

  return rowsToToggle;
}

export function getSelectionCellColumnDef<TData>(enableSelectPinned: boolean): ColumnDefinition<TData> {
  let previousClickedRowId = '';

  return {
    id: DefaultColumns.Selection,
    pinned: COLUMN_PIN_POSITION.Left,
    noBodyCellPadding: true,
    size: 40,
    headerClassName: styles.selectionCellHeader,
    enableResizing: false,
    cell: ({ row, table }) => {
      const disabled = !row.getCanSelect();

      if (disabled || (!enableSelectPinned && row.getIsPinned())) return null;

      const { enableMultiRowSelection } = table.options;

      const isMulti = typeof enableMultiRowSelection === 'boolean' ? enableMultiRowSelection : true;

      const checked = row.getIsSelected();

      const handleCellClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        globalThis.getSelection()?.removeAllRanges();

        if (e.shiftKey) {
          const { rows, rowsById } = table.getRowModel();
          const rowsToToggle = getRowsToToggle(
            rows,
            row.id,
            rows.map(r => r.id).includes(previousClickedRowId) ? previousClickedRowId : '',
          );
          const isSelected = !rowsById[row.id]?.getIsSelected() || false;

          const newSelected = rowsToToggle.reduce<Record<string, boolean>>((acc, row) => {
            acc[row.index] = isSelected;
            return acc;
          }, {});

          table.setRowSelection(oldState => ({
            ...oldState,
            ...newSelected,
          }));
        } else {
          row.toggleSelected(!checked);
        }

        previousClickedRowId = row.id;
      };

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={handleCellClick} className={styles.selectionCell} data-test-id={TEST_IDS.rowSelect}>
          {isMulti ? <Checkbox size='s' checked={checked} /> : <Radio size='s' checked={checked} />}
        </div>
      );
    },
    meta: {
      skipOnExport: true,
    },
  };
}
