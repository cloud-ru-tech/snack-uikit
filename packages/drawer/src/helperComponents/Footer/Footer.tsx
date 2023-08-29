import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type DrawerFooterProps = WithSupportProps<{
  /** Слот для добавления кнопок-действий */
  actions: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

/** Вспомогательный компонент для добавления "футера" в DrawerCustom */
export function DrawerFooter({ actions, className, ...rest }: DrawerFooterProps) {
  return (
    <div className={cn(styles.footer, className)} {...extractSupportProps(rest)}>
      <div className={styles.footerActions} data-test-id={TEST_IDS.footerActions}>
        {actions}
      </div>
    </div>
  );
}
