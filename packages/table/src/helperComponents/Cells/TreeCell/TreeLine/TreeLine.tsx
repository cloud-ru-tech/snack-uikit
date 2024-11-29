import classNames from 'classnames';

import styles from './styles.module.scss';

export type TreeLineProps = {
  halfHeight?: boolean;
  visible?: boolean;
  horizontal?: boolean;
  className?: string;
};

export function TreeLine({ halfHeight, horizontal, visible, className }: TreeLineProps) {
  return (
    <div
      className={classNames(styles.treeLine, className)}
      data-horizontal={horizontal || undefined}
      data-half-height={halfHeight || undefined}
      data-visible={visible || undefined}
    />
  );
}
