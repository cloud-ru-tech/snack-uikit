import { CellContext, Row } from '@tanstack/react-table';
import { MouseEvent, MouseEventHandler, useCallback, useMemo } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { MoreSVG } from '@snack-uikit/icons';
import { Droplist, DroplistProps, isBaseItemProps, ItemProps } from '@snack-uikit/list';

import { RowAppearance } from '../../../components/types';
import { COLUMN_PIN_POSITION, DefaultColumns, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { useRowContext } from '../../contexts';
import styles from './styles.module.scss';

type RowActionsCellProps<TData> = {
  actions: DroplistProps['items'];
  row: Row<TData>;
};

function RowActionsCell<TData>({ row, actions }: RowActionsCellProps<TData>) {
  const { dropListOpened, setDropListOpen, disabledRowAppearance } = useRowContext();

  const patchItem = useCallback((item: ItemProps, cb: MouseEventHandler): ItemProps => {
    if (isBaseItemProps(item)) {
      return {
        ...item,
        onClick(e) {
          item.onClick?.(e);
          cb(e);
        },
      };
    }

    return { ...item, items: item.items.map(i => patchItem(i, cb)) };
  }, []);

  const canSelect = row.getCanSelect();
  const shouldShowActions = canSelect || disabledRowAppearance !== RowAppearance.Disabled;

  const stopPropagationClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const patchedItems = useMemo(
    () => actions.map(item => patchItem(item, () => setDropListOpen(false))),
    [actions, patchItem, setDropListOpen],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagationClick} className={styles.rowActionsCellWrap} data-open={dropListOpened || undefined}>
      {shouldShowActions && Boolean(actions.length) && (
        <Droplist
          trigger='click'
          open={dropListOpened}
          onOpenChange={setDropListOpen}
          placement='bottom-end'
          size='m'
          data-test-id={TEST_IDS.rowActions.droplist}
          items={patchedItems}
        >
          <ButtonFunction icon={<MoreSVG size={24} />} data-test-id={TEST_IDS.rowActions.droplistTrigger} />
        </Droplist>
      )}
    </div>
  );
}

export type ActionsGenerator<TData> = (cell: CellContext<TData, unknown>) => DroplistProps['items'];

export type RowActionsColumnDefProps<TData> = {
  /** Действия для строки */
  actionsGenerator: ActionsGenerator<TData>;
  /** Закрепление колонки справа в таблице */
  pinned?: boolean;
};

/** Вспомогательная функция для создания ячейки с дополнительными действиями у строки */
export function getRowActionsColumnDef<TData>({
  actionsGenerator,
  pinned,
}: RowActionsColumnDefProps<TData>): ColumnDefinition<TData> {
  return {
    id: DefaultColumns.RowActions,
    pinned: pinned ? COLUMN_PIN_POSITION.Right : (undefined as never),
    size: 40,
    meta: {
      skipOnExport: true,
    },
    noBodyCellPadding: true,
    cellClassName: styles.rowActionsCell,
    enableResizing: false,
    cell: cell => <RowActionsCell row={cell.row} actions={actionsGenerator(cell)} />,
  };
}
