import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export function PinTopGroupItem({ children }: { children: ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.pinTopItem)} data-test-id='list__pin-top-group-item'>
      {children}
    </div>
  );
}

export function PinBottomGroupItem({ children }: { children: ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.pinBottomItem)} data-test-id='list__pin-bottom-group-item'>
      {children}
    </div>
  );
}
