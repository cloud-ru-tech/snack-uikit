import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance } from '../../constants';
import styles from './styles.module.scss';

enum Size {
  Xxs = 'xxs',
  Xs = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
}

export type StatusIndicatorProps = WithSupportProps<{
  size?: Size;
  appearance?: Appearance;
  className?: string;
}>;

export function StatusIndicator({
  size = Size.M,
  appearance = Appearance.Primary,
  className,
  ...rest
}: StatusIndicatorProps) {
  return (
    <div className={cn(styles.container, className)} data-size={size} {...extractSupportProps(rest)}>
      <div className={styles.indicator} data-appearance={appearance}></div>
    </div>
  );
}

StatusIndicator.sizes = Size;
StatusIndicator.appearances = Appearance;
