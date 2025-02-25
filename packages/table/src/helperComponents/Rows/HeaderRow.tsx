import { COLUMN_PIN_POSITION, TEST_IDS } from '../../constants';
import { HeaderCell } from '../Cells';
import { useHeaderGroups } from '../hooks';
import { PinnedCells } from './PinnedCells';
import { Row, RowProps } from './Row';
import styles from './styles.module.scss';

export function HeaderRow({ rowAutoHeight }: Pick<RowProps, 'rowAutoHeight'>) {
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

      {unpinned.map(headerGroup =>
        headerGroup.headers.map(header => <HeaderCell key={header.id} header={header} rowAutoHeight={rowAutoHeight} />),
      )}

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
