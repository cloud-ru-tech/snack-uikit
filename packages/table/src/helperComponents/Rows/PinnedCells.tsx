import { ReactNode } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type PinnedCellsProps = {
  position: ValueOf<typeof COLUMN_PIN_POSITION>;
  children: ReactNode;
};

export function PinnedCells({ position, children }: PinnedCellsProps) {
  return (
    <div data-position={position} data-test-id={TEST_IDS.pinnedCells} className={styles.rowPinnedCells}>
      {children}
    </div>
  );
}
