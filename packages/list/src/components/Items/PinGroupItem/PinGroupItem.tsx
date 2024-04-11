import cn from 'classnames';
import { ReactNode } from 'react';

import { Divider } from '@snack-uikit/divider';

import { useNewListContext } from '../../Lists/contexts';
import styles from './styles.module.scss';

export function PinTopGroupItem({ children }: { children: ReactNode }) {
  const { size = 's' } = useNewListContext();

  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.pinTopItem)} data-size={size} data-test-id='list__pin-top-group-item'>
      <div>{children}</div>

      <Divider weight='regular' />
    </div>
  );
}

export function PinBottomGroupItem({ children }: { children: ReactNode }) {
  const { size = 's' } = useNewListContext();

  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.pinBottomItem)} data-size={size} data-test-id='list__pin-bottom-group-item'>
      <Divider weight='regular' />
      <div>{children}</div>
    </div>
  );
}
