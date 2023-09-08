import { ReactNode, useState } from 'react';

import { FunctionBadgeContext } from '../../context';
import styles from './styles.module.scss';

export type FunctionBadgeWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function FunctionBadgeWrapper({ children, className }: FunctionBadgeWrapperProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <FunctionBadgeContext.Provider value={{ visible, setVisible }}>
      <div className={className} data-visible={visible || undefined} tabIndex={-1}>
        <div className={styles.functionBadge}>
          <div className={styles.functionRow}>{children}</div>
        </div>
      </div>
    </FunctionBadgeContext.Provider>
  );
}
