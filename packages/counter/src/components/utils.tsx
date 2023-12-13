import { ReactNode } from 'react';

import { DEFAULT_KEY_LIMIT, DEFAULT_KEY_POSTFIX, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Variant } from './types';

export function formatValue({
  value,
  variant,
  plusLimit,
}: {
  value: number;
  variant: Variant;
  plusLimit: number;
}): ReactNode {
  if (variant === VARIANT.Count) {
    return value;
  }

  if (variant === VARIANT.CountPlus) {
    return value < plusLimit ? (
      value
    ) : (
      <>
        {plusLimit - 1}
        <span className={styles.plus}>+</span>
      </>
    );
  }

  if (variant === VARIANT.CountK) {
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
