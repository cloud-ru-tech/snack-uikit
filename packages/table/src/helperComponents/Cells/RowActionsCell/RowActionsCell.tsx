import { CellContext, Row } from '@tanstack/react-table';
import { MouseEvent, ReactElement, useMemo, useRef } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { MoreSVG } from '@snack-uikit/icons';
import { BaseItemProps, Droplist } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { useRowContext } from '../../contexts';
import styles from './styles.module.scss';

export type RowActionInfo<TData> = {
  rowId: string;
  data: TData;
  itemId?: string;
};

export type RowActionProps<TData> = Pick<BaseItemProps, 'content' | 'disabled' | 'data-test-id'> & {
  icon?: ReactElement;
  tagLabel?: string;
  id?: string;
  hidden?: boolean;
  onClick(row: RowActionInfo<TData>, e: MouseEvent<HTMLElement>): void;
};

type RowActionsCellProps<TData> = {
  actions: RowActionProps<TData>[];
  row: Row<TData>;
};

function RowActionsCell<TData>({ row, actions }: RowActionsCellProps<TData>) {
  const { droplistOpened, setDroplistOpen } = useRowContext();
  const triggerRef = useRef(null);

  const handleItemClick = (item: RowActionProps<TData>) => (e: MouseEvent<HTMLElement>) => {
    item.onClick({ rowId: row.id, itemId: item.id, data: row.original }, e);
  };

  const disabled = !row.getCanSelect();

  const stopPropagationClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const visibleActions: RowActionProps<TData>[] = useMemo(() => actions.filter(item => !item?.hidden), [actions]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagationClick} className={styles.rowActionsCellWrap} data-open={droplistOpened || undefined}>
      {!disabled && Boolean(visibleActions.length) && (
        <Droplist
          trigger='clickAndFocusVisible'
          open={droplistOpened}
          onOpenChange={setDroplistOpen}
          placement='bottom-end'
          size='m'
          data-test-id={TEST_IDS.rowActions.droplist}
          triggerElemRef={triggerRef}
          items={actions
            .filter(item => !item?.hidden)
            .map(item => ({
              id: item.id,
              onClick: e => {
                handleItemClick(item)(e);
                setDroplistOpen(false);
              },
              disabled: item.disabled,
              content: item.content,
              beforeContent: item.icon,
              afterContent: item.tagLabel ? <Tag label={item.tagLabel} /> : undefined,
              'data-test-id': item['data-test-id'] || TEST_IDS.rowActions.option,
            }))}
        >
          <span className={styles.rowActionsCellTrigger}>
            <ButtonFunction
              icon={<MoreSVG size={24} />}
              data-test-id={TEST_IDS.rowActions.droplistTrigger}
              ref={triggerRef}
            />
          </span>
        </Droplist>
      )}
    </div>
  );
}

export type ActionsGenerator<TData> = (cell: CellContext<TData, unknown>) => RowActionProps<TData>[];

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
    id: 'rowActions',
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
