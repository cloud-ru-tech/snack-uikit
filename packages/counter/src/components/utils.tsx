import { ReactNode } from 'react';

import { DEFAULT_KEY_LIMIT, DEFAULT_KEY_POSTFIX, Variant } from './constants';
import styles from './styles.module.scss';

export function formatValue({
  value,
  variant,
  plusLimit,
}: {
  value: number;
  variant: Variant;
  plusLimit: number;
}): ReactNode {
  if (variant === Variant.Count) {
    return value;
  }

  if (variant === Variant.CountPlus) {
    return value < plusLimit ? (
      value
    ) : (
      <>
        {plusLimit - 1}
        <span className={styles.plus}>+</span>
      </>
    );
  }

  if (variant === Variant.CountK) {
    return value < DEFAULT_KEY_LIMIT ? (
      value
    ) : (
      <>
        {Math.round(value / DEFAULT_KEY_LIMIT)}
        <span className={styles.key}>{DEFAULT_KEY_POSTFIX}</span>
      </>
    );
  }
}
