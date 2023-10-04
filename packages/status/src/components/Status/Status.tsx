import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

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
      data-size={size}
      data-has-background={hasBackground || undefined}
      {...extractSupportProps(rest)}
    >
      <StatusIndicator appearance={appearance} size={statusIndicatorSizeMap[size]} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

Status.sizes = Size;
Status.appearances = Appearance;
