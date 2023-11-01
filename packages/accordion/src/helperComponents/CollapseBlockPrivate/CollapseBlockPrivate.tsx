import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type CollapseBlockPrivateProps = WithSupportProps<{
  children: ReactNode;
  header: ReactNode;
  expanded: boolean;
  className?: string;
}>;

export function CollapseBlockPrivate({ children, expanded, className, header, ...rest }: CollapseBlockPrivateProps) {
  return (
    <div
      className={cn(styles.accordion, className)}
      // eslint-disable-next-line jsx-a11y/aria-role
      role='accordion'
      aria-expanded={expanded}
      {...extractSupportProps(rest)}
    >
      {header}

      <div className={styles.contentWrapper} aria-hidden={!expanded} data-test-id={TEST_IDS.content}>
        <div className={styles.content} data-content>
          {children}
        </div>
      </div>
    </div>
  );
}
