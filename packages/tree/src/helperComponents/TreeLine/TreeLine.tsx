import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type TreeLineProps = {
  halfWidth?: boolean;
  halfHeight?: boolean;
  visible?: boolean;
  horizontal?: boolean;
};

export function TreeLine({ halfWidth, halfHeight, horizontal, visible }: TreeLineProps) {
  return (
    <div
      className={styles.treeLine}
      data-horizontal={horizontal || undefined}
      data-half-width={halfWidth || undefined}
      data-half-height={halfHeight || undefined}
      data-visible={visible || undefined}
      data-test-id={TEST_IDS.line}
    />
  );
}
