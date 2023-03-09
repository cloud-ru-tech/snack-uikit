import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export function TableWrapper({ children }: PropsWithChildren) {
  return <div className={styles.tableWrapper}>{children} </div>;
}

export function TableCell({ children }: PropsWithChildren) {
  return <div className={styles.tableCell}>{children} </div>;
}

export function TableColumn({ children }: PropsWithChildren) {
  return <div className={styles.tableColumn}>{children} </div>;
}
