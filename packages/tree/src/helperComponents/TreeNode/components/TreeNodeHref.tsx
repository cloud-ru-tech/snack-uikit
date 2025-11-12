import { forwardRef, MouseEventHandler, ReactNode } from 'react';

import { TEST_IDS } from '../../../constants';
import styles from '../styles.module.scss';

export type TreeNodeHrefProps = {
  href?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const TreeNodeHref = forwardRef<HTMLAnchorElement, TreeNodeHrefProps>(({ href, children, onClick }, ref) =>
  href ? (
    <a
      href={href}
      className={styles.treeNodeLink}
      onClick={onClick}
      data-test-id={TEST_IDS.link}
      tabIndex={-2}
      ref={ref}
    >
      {children}
    </a>
  ) : (
    children
  ),
);

TreeNodeHref.displayName = 'TreeNodeHref';
