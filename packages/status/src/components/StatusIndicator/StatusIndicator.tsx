import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

enum Appearance {
  Primary = 'primary',
  Neutral = 'neutral',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Pink = 'pink',
}

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
}>;

export function StatusIndicator({ size = Size.M, appearance = Appearance.Primary, ...rest }: StatusIndicatorProps) {
  return (
    <div className={styles.container} data-size={size} {...extractSupportProps(rest)}>
      <div className={styles.indicator} data-appearance={appearance}></div>
    </div>
  );
}

StatusIndicator.sizes = Size;
StatusIndicator.appearances = Appearance;
