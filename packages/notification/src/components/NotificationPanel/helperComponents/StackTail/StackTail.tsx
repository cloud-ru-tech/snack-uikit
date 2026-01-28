import styles from './styles.module.scss';

type StackTailProps = {
  open: boolean;
  count: number;
};

export function StackTail({ open, count }: StackTailProps) {
  return (
    <div className={styles.container} data-open={open || undefined}>
      <div className={styles.animationContainer}>
        {count > 1 && <div className={styles.card} data-level='3' />}
        <div className={styles.card} data-level='2' />
      </div>
    </div>
  );
}
