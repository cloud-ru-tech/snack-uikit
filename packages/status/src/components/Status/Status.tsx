import cn from 'classnames';

import { Spinner } from '@snack-uikit/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE } from '../../constants';
import { Appearance } from '../../types';
import { StatusIndicator } from '../StatusIndicator';
import { LOADER_SIZE_MAP, SIZE, STATUS_INDICATOR_SIZE_MAP } from './constants';
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
  loading?: boolean;
  className?: string;
}>;

export function Status({
  label,
  size = SIZE.Xs,
  appearance = APPEARANCE.Primary,
  hasBackground,
  loading,
  className,
  ...rest
}: StatusProps) {
  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-has-background={hasBackground || undefined}
      data-appearance={loading ? APPEARANCE.Neutral : appearance}
    >
      {loading ? (
        <Spinner size={LOADER_SIZE_MAP[size]} />
      ) : (
        <StatusIndicator appearance={appearance} size={STATUS_INDICATOR_SIZE_MAP[size]} />
      )}
      <span className={styles.label}>{label}</span>
    </div>
  );
}
