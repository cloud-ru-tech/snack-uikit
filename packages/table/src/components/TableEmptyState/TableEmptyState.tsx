import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-ui/icon-predefined';
import { Typography } from '@snack-ui/typography';

import styles from './styles.module.scss';

export type TableEmptyStateProps = {
  title: string;
  description?: ReactNode;
  className?: string;
} & Pick<IconPredefinedProps, 'icon' | 'appearance'>;

export function TableEmptyState({ title, description, className, icon, appearance }: TableEmptyStateProps) {
  return (
    <div className={cn(styles.tableEmptyStateWrapper, className)}>
      <IconPredefined icon={icon} size={IconPredefined.sizes.L} appearance={appearance} />
      <div className={styles.textWrapper}>
        <Typography.SansTitleM>{title}</Typography.SansTitleM>
        {description && <Typography.SansBodyM>{description}</Typography.SansBodyM>}
      </div>
    </div>
  );
}
