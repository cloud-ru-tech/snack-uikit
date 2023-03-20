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
  label: string;
  size?: Size;
  appearance?: Appearance;
  hasBackground?: boolean;
}>;

export function Status({
  label,
  size = Size.Xs,
  appearance = Appearance.Primary,
  hasBackground,
  ...rest
}: StatusProps) {
  return (
    <div
      className={styles.container}
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
