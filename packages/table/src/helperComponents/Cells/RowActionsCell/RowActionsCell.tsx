import { Row } from '@tanstack/react-table';
import { MouseEvent } from 'react';

import { ButtonLight } from '@snack-ui/button';
import { Droplist, ItemSingleProps } from '@snack-ui/droplist';
import { MoreSVG } from '@snack-ui/icons';

import { ColumnPinPosition, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { useRowContext } from '../../contexts';
import styles from './styles.module.scss';

export type RowActionInfo<TData> = {
  rowId: string;
  data: TData;
  itemId?: string;
};

export type RowActionProps<TData> = Pick<
  ItemSingleProps,
  'option' | 'disabled' | 'icon' | 'description' | 'caption' | 'tagLabel'
> & {
  id?: string;
  onClick(row: RowActionInfo<TData>, e: MouseEvent<HTMLButtonElement>): void;
};

export type RowActionsColumnDefProps<TData> = {
  /** Действия для строки */
  actions: RowActionProps<TData>[];
  /** Закрепление колонки справа в таблице */
  pinned?: boolean;
};

type RowActionsCellProps<TData> = {
  actions: RowActionProps<TData>[];
  row: Row<TData>;
};

function RowActionsCell<TData>({ row, actions }: RowActionsCellProps<TData>) {
  const { droplistOpened, setDroplistOpen } = useRowContext();

  const handleItemClick = (item: RowActionProps<TData>) => (e: MouseEvent<HTMLButtonElement>) => {
    item.onClick({ rowId: row.id, itemId: item.id, data: row.original }, e);

    setDroplistOpen(false);
  };

  const disabled = !row.getCanSelect();

  const stopPropagationClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagationClick} className={styles.rowActionsCellWrap} data-open={droplistOpened || undefined}>
      {!disabled && Boolean(actions.length) && (
        <Droplist
          open={droplistOpened}
          onOpenChange={setDroplistOpen}
          placement={Droplist.placements.BottomEnd}
          triggerElement={
            <ButtonLight icon={<MoreSVG size={24} />} data-test-id={TEST_IDS.rowActions.droplistTrigger} />
          }
          triggerClassName={styles.rowActionsCellTrigger}
          size={Droplist.sizes.S}
          data-test-id={TEST_IDS.rowActions.droplist}
        >
          {actions.map(item => (
            <Droplist.ItemSingle
              {...item}
              key={`${row.id}-${item.id || item.option}`}
              onClick={handleItemClick(item)}
              data-test-id={TEST_IDS.rowActions.option}
            />
          ))}
        </Droplist>
      )}
    </div>
  );
}

/** Вспомогательная функция для создания ячейки с дополнительными действиями у строки */
export function getRowActionsColumnDef<TData>({
  actions,
  pinned,
}: RowActionsColumnDefProps<TData>): ColumnDefinition<TData> {
  return {
    id: 'rowActions',
    pinned: pinned ? ColumnPinPosition.Right : (undefined as never),
    size: 64,
    noBodyCellPadding: true,
    cellClassName: styles.rowActionsCell,
    cell: ({ row }) => <RowActionsCell row={row} actions={actions} />,
  };
}
