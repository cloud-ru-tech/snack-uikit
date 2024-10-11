import { forwardRef } from 'react';

import { ChevronLeftSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

type ControlProps = WithSupportProps<{
  onClick?(): void;
  variant: 'prev' | 'next';
}>;

export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  ({ onClick, variant, ...rest }: ControlProps, ref) => (
    <button
      ref={ref}
      className={styles.control}
      onClick={onClick}
      type='button'
      data-variant={variant}
      {...extractSupportProps(rest)}
    >
      <ChevronLeftSVG size={24} className={styles.icon} />
    </button>
  ),
);
