import { ReactNode, useMemo } from 'react';

import { InactiveItem } from '@snack-uikit/input-private';

import styles from './styles.module.scss';

export function usePrefix({ prefix, disabled }: { prefix?: ReactNode; disabled?: boolean }): InactiveItem {
  return useMemo(
    () => ({
      id: 'prefix',
      active: false,
      show: Boolean(prefix),
      render: props => (
        <div {...props} data-test-id='field-prefix' className={styles.prefix} data-disabled={disabled || undefined}>
          {prefix}
        </div>
      ),
    }),
    [disabled, prefix],
  );
}
