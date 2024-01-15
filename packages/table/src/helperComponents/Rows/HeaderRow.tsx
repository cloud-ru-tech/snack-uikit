import { COLUMN_PIN_POSITION, TEST_IDS } from '../../constants';
import { HeaderCell } from '../Cells';
import { useHeaderGroups } from '../hooks';
import { PinnedCells } from './PinnedCells';
import { Row } from './Row';
import styles from './styles.module.scss';

export function HeaderRow() {
  const { leftPinned, unpinned, rightPinned } = useHeaderGroups();

  return (
    <Row className={styles.tableHeader} data-test-id={TEST_IDS.headerRow}>
      {leftPinned && (
        <PinnedCells position={COLUMN_PIN_POSITION.Left}>
          {leftPinned.map(headerGroup =>
            headerGroup.headers.map(header =>
              header.isPlaceholder ? null : <HeaderCell key={header.id} header={header} />,
            ),
          )}
        </PinnedCells>
      )}

      {unpinned.map(headerGroup => headerGroup.headers.map(header => <HeaderCell key={header.id} header={header} />))}

      {rightPinned && (
        <PinnedCells position={COLUMN_PIN_POSITION.Right}>
          {rightPinned.map(headerGroup =>
            headerGroup.headers.map(header =>
              header.isPlaceholder ? null : <HeaderCell key={header.id} header={header} />,
            ),
          )}
        </PinnedCells>
      )}
    </Row>
  );
}
