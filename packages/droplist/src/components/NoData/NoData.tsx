import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { SIZE } from '../../constants';
import { Size } from '../../types';
import styles from './styles.module.scss';

export type DroplistNoDataProps = WithSupportProps<{
  label: string;
  size?: Size;
}>;

export function NoData({ label, size = SIZE.S, ...rest }: DroplistNoDataProps) {
  return (
    <div className={styles.droplistItemNoData} {...extractSupportProps(rest)} data-size={size}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
