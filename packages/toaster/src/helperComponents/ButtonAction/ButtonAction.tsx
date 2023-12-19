import { MouseEvent } from 'react';

import { TOAST_SYSTEM_EVENT_TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type ButtonActionProps = {
  label: string;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
  critical?: boolean;
};

export function ButtonAction({ label, onClick, critical }: ButtonActionProps) {
  return (
    <button
      className={styles.buttonAction}
      onClick={onClick}
      data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.buttonAction}
      aria-label='action'
      data-critical={critical || undefined}
    >
      {label}
    </button>
  );
}
