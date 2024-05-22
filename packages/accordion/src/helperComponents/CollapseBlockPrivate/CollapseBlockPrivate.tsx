import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type CollapseBlockPrivateProps = WithSupportProps<{
  children: ReactNode;
  header: ReactNode;
  expanded: boolean;
  expandedDebounced: boolean;
  className?: string;
  shape?: 'round' | 'square';
}>;

export function CollapseBlockPrivate({
  children,
  expanded,
  className,
  header,
  shape,
  expandedDebounced,
  ...rest
}: CollapseBlockPrivateProps) {
  return (
    <div
      className={cn(styles.accordion, className)}
      // eslint-disable-next-line jsx-a11y/aria-role
      role='accordion'
      data-shape={shape}
      // data-outline={outline || undefined}
      aria-expanded={expanded}
      {...extractSupportProps(rest)}
    >
      {header}

      <div className={styles.contentWrapper} aria-hidden={!expanded} data-test-id={TEST_IDS.content}>
        <div className={styles.content} data-content>
          {(expanded || expandedDebounced) && children}
        </div>
      </div>
    </div>
  );
}
