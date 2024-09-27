import { ReactNode, useMemo } from 'react';

import { InactiveItem } from '@snack-uikit/input-private';

import styles from './styles.module.scss';

export function usePostfix({ postfix, disabled }: { postfix?: ReactNode; disabled?: boolean }): InactiveItem {
  return useMemo(
    () => ({
      id: 'postfix',
      active: false,
      show: Boolean(postfix),
      render: props => (
        <div {...props} className={styles.postfix} data-test-id='field-postfix' data-disabled={disabled || undefined}>
          {postfix}
        </div>
      ),
    }),
    [disabled, postfix],
  );
}
