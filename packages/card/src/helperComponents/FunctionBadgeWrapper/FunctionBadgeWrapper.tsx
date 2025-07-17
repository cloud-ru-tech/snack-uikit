import { ReactNode, useState } from 'react';

import { FunctionBadgeContext } from '../../context';
import styles from './styles.module.scss';

export type FunctionBadgeWrapperProps = {
  children: ReactNode;
  className?: string;
  alwaysVisible?: boolean;
};

export function FunctionBadgeWrapper({ children, className, alwaysVisible }: FunctionBadgeWrapperProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const show = alwaysVisible ? true : visible;

  return (
    <FunctionBadgeContext.Provider value={{ visible: show, setVisible }}>
      <div className={className} data-visible={show || undefined} tabIndex={-1}>
        <div className={styles.functionBadge}>
          <div className={styles.functionRow}>{children}</div>
        </div>
      </div>
    </FunctionBadgeContext.Provider>
  );
}
