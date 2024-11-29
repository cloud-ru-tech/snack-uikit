import { Row as TableRow } from '@tanstack/react-table';
import { MouseEvent, useState } from 'react';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../constants';
import { BodyCell } from '../Cells';
import { RowContext } from '../contexts';
import { useRowCells } from '../hooks';
import { PinnedCells } from './PinnedCells';
import { Row } from './Row';
import styles from './styles.module.scss';

export type RowInfo<TData> = {
  id: string;
  data: TData;
  selected: boolean;
  toggleSelected(value?: boolean): void;
};

export type RowClickHandler<TData> = (e: MouseEvent<HTMLDivElement>, row: RowInfo<TData>) => void;

export type BodyRowProps<TData> = {
  row: TableRow<TData>;
  onRowClick?: RowClickHandler<TData>;
};

export function BodyRow<TData>({ row, onRowClick }: BodyRowProps<TData>) {
  const { pinnedLeft, pinnedRight, unpinned } = useRowCells(row);

  const [dropListOpened, setDropListOpen] = useState(false);

  const disabled = !row.getCanSelect();

  const handleRowClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    onRowClick?.(e, {
      id: row.id,
      data: row.original,
      selected: row.getIsSelected(),
      toggleSelected: row.toggleSelected,
    });
  };

  return (
    <RowContext.Provider value={{ dropListOpened, setDropListOpen }}>
      <Row
        onClick={handleRowClick}
        data-clickable={Boolean(onRowClick) || undefined}
        data-disabled={disabled || undefined}
        data-selected={
          row.getIsSelected() ||
          (row.getIsSomeSelected() && !row.getCanMultiSelect() && !row.getIsExpanded()) ||
          undefined
        }
        data-actions-opened={dropListOpened || undefined}
        data-test-id={TEST_IDS.bodyRow}
        data-row-id={row.id}
        className={styles.bodyRow}
      >
        {pinnedLeft && (
          <PinnedCells position={COLUMN_PIN_POSITION.Left}>
            {pinnedLeft.map(cell => (
              <BodyCell key={cell.id} cell={cell} />
            ))}
          </PinnedCells>
        )}

        {unpinned.map(cell => (
          <BodyCell key={cell.id} cell={cell} />
        ))}

        {pinnedRight && (
          <PinnedCells position={COLUMN_PIN_POSITION.Right}>
            {pinnedRight.map(cell => (
              <BodyCell key={cell.id} cell={cell} />
            ))}
          </PinnedCells>
        )}
      </Row>
    </RowContext.Provider>
  );
}
