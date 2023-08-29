import cn from 'classnames';
import { ReactNode } from 'react';

import { Scroll } from '@snack-ui/scroll';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type DrawerBodyProps = WithSupportProps<{
  /** Контент */
  content: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

/** Вспомогательный компонент для добавления "тела" в DrawerCustom */
export function DrawerBody({ content, className, ...rest }: DrawerBodyProps) {
  return (
    <Scroll size={Scroll.sizes.M} className={cn(styles.drawerBody, className)} {...extractSupportProps(rest)}>
      {content}
    </Scroll>
  );
}
