import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { InfoBlock } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

export type TableEmptyStateProps = {
  title?: string;
  description: string;
  icon?: Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;
  footer?: ReactNode;
  className?: string;
};

export function TableEmptyState({ className, ...props }: TableEmptyStateProps) {
  return (
    <div className={cn(styles.tableEmptyStateWrapper, className)}>
      <InfoBlock {...props} size='m' align='vertical' />
    </div>
  );
}
