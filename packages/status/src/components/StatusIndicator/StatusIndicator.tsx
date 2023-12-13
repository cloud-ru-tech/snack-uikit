import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE } from '../../constants';
import { Appearance } from '../../types';
import { SIZE } from './constants';
import styles from './styles.module.scss';
import { Size } from './types';

export type StatusIndicatorProps = WithSupportProps<{
  /** Размер */
  size?: Size;
  /** Внешний вид */
  appearance?: Appearance;
  className?: string;
}>;

export function StatusIndicator({
  size = SIZE.M,
  appearance = APPEARANCE.Primary,
  className,
  ...rest
}: StatusIndicatorProps) {
  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)} data-size={size}>
      <div className={styles.indicator} data-appearance={appearance}></div>
    </div>
  );
}
