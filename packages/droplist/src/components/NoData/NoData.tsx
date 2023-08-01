import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Size } from '../../constants';
import styles from './styles.module.scss';

export type DroplistNoDataProps = WithSupportProps<{
  label: string;
  size?: Size;
}>;

export function NoData({ label, size = Size.S, ...rest }: DroplistNoDataProps) {
  return (
    <div data-size={size} className={styles.droplistItemNoData} {...extractSupportProps(rest)}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

NoData.sizes = Size;
