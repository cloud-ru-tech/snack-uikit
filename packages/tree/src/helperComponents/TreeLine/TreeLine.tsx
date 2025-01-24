import cn from 'classnames';
import { CSSProperties } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type TreeLineProps = {
  className?: string;
  halfWidth?: boolean;
  visible?: boolean;
  horizontal?: boolean;
} & Pick<CSSProperties, 'height' | 'width'>;

export function TreeLine({ className, halfWidth, horizontal, visible, height, width }: TreeLineProps) {
  return (
    <div
      className={cn(styles.treeLine, className)}
      style={{ height, width }}
      data-horizontal={horizontal || undefined}
      data-half-width={halfWidth || undefined}
      data-visible={visible || undefined}
      data-test-id={TEST_IDS.line}
    />
  );
}
