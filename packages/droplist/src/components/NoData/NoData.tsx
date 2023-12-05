import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Size } from '../../constants';
import styles from './styles.module.scss';

export type DroplistNoDataProps = WithSupportProps<{
  label: string;
  size?: Size;
}>;

export function NoData({ label, size = Size.S, ...rest }: DroplistNoDataProps) {
  return (
    <div className={styles.droplistItemNoData} {...extractSupportProps(rest)} data-size={size}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

NoData.sizes = Size;
