import styles from './styles.module.scss';

export function Spinner() {
  return (
    <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' className={styles.spinner}>
      <path d='M5 8C5 6.34315 6.34315 5 8 5' stroke='black' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
}
