import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type CollapseBlockPrivateProps = WithSupportProps<{
  children: ReactNode;
  header: ReactNode;
  expanded: boolean;
  className?: string;
}>;

// TODO: Add animation. Solution like in Accordion/Tree does not work with Scroll =(
export function CollapseBlockPrivate({ children, expanded, className, header, ...rest }: CollapseBlockPrivateProps) {
  return (
    <div
      className={cn(styles.accordion, className)}
      role='menuitem'
      aria-haspopup
      aria-expanded={expanded}
      {...extractSupportProps(rest)}
    >
      {header}

      <div className={styles.contentWrapper} aria-hidden={!expanded}>
        <div className={styles.content} data-content>
          {expanded && children}
        </div>
      </div>
    </div>
  );
}
