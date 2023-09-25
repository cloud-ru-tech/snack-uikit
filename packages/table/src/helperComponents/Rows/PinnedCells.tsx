import { ReactNode } from 'react';

import { ColumnPinPosition, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type PinnedCellsProps = {
  position: ColumnPinPosition;
  children: ReactNode;
};

export function PinnedCells({ position, children }: PinnedCellsProps) {
  return (
    <div data-position={position} data-test-id={TEST_IDS.pinnedCells} className={styles.rowPinnedCells}>
      {children}
    </div>
  );
}
