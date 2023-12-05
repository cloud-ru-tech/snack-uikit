import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Appearance } from '../../constants';
import { StatusIndicator } from '../StatusIndicator';
import styles from './styles.module.scss';

enum Size {
  Xs = 'xs',
  S = 's',
}

const statusIndicatorSizeMap = {
  [Size.Xs]: StatusIndicator.sizes.Xs,
  [Size.S]: StatusIndicator.sizes.S,
};

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
  size = Size.Xs,
  appearance = Appearance.Primary,
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
      <StatusIndicator appearance={appearance} size={statusIndicatorSizeMap[size]} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

Status.sizes = Size;
Status.appearances = Appearance;
