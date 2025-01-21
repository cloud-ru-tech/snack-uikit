import styles from './styles.module.scss';

export function Separator() {
  return (
    <div className={styles.separatorWrapper}>
      <div className={styles.separator}></div>
    </div>
  );
}
