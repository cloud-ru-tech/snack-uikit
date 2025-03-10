import { MouseEvent } from 'react';

import styles from './styles.module.scss';

export type ButtonTextNeutralProps = {
  label: string;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
  critical?: boolean;
};

export function ButtonTextNeutral({ label, onClick, critical }: ButtonTextNeutralProps) {
  return (
    <button
      type='button'
      className={styles.buttonTextNeutral}
      onClick={onClick}
      aria-label='action'
      data-critical={critical || undefined}
    >
      {label}
    </button>
  );
}
