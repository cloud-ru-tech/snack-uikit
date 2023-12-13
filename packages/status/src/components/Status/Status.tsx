import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE } from '../../constants';
import { Appearance } from '../../types';
import { StatusIndicator } from '../StatusIndicator';
import { SIZE, STATUS_INDICATOR_SIZE_MAP } from './constants';
import styles from './styles.module.scss';
import { Size } from './types';

export type StatusProps = WithSupportProps<{
  /** Текст */
  label: string;
  /** Размер */
  size?: Size;
  /** Внешний вид */
  appearance?: Appearance;
  /** Наличие фона */
  hasBackground?: boolean;
  className?: string;
}>;

export function Status({
  label,
  size = SIZE.Xs,
  appearance = APPEARANCE.Primary,
  hasBackground,
  className,
  ...rest
}: StatusProps) {
  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-has-background={hasBackground || undefined}
    >
      <StatusIndicator appearance={appearance} size={STATUS_INDICATOR_SIZE_MAP[size]} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
