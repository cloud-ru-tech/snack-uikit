import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../constants';
import { ColumnOrder } from '../../types';
import { HeaderCell } from '../Cells';
import { useHeaderGroups } from '../hooks';
import { PinnedCells } from './PinnedCells';
import { Row, RowProps } from './Row';
import styles from './styles.module.scss';

type Props = Pick<RowProps, 'rowAutoHeight'> & {
  columnOrder: ColumnOrder;
  enableColumnsOrderSortByDrag?: boolean;
};

export function HeaderRow({ rowAutoHeight, columnOrder, enableColumnsOrderSortByDrag }: Props) {
  const { leftPinned, unpinned, rightPinned } = useHeaderGroups();

  return (
    <Row className={styles.tableHeader} data-test-id={TEST_IDS.headerRow} rowAutoHeight={rowAutoHeight}>
      {leftPinned && (
        <PinnedCells position={COLUMN_PIN_POSITION.Left}>
          {leftPinned.map(headerGroup =>
            headerGroup.headers.map(header =>
              header.isPlaceholder ? null : (
                <HeaderCell key={header.id} header={header} rowAutoHeight={rowAutoHeight} />
              ),
            ),
          )}
        </PinnedCells>
      )}

      <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
        {unpinned.map(headerGroup =>
          headerGroup.headers.map(header => (
            <HeaderCell
              key={header.id}
              header={header}
              rowAutoHeight={rowAutoHeight}
              isDraggable={enableColumnsOrderSortByDrag && columnOrder.length > 1}
            />
          )),
        )}
      </SortableContext>

      {rightPinned && (
        <PinnedCells position={COLUMN_PIN_POSITION.Right}>
          {rightPinned.map(headerGroup =>
            headerGroup.headers.map(header =>
              header.isPlaceholder ? null : (
                <HeaderCell
                  key={header.id}
                  header={header}
                  pinPosition={COLUMN_PIN_POSITION.Right}
                  rowAutoHeight={rowAutoHeight}
                />
              ),
            ),
          )}
        </PinnedCells>
      )}
    </Row>
  );
}
