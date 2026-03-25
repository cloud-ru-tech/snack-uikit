import cn from 'classnames';
import { ReactNode } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type NotificationPanelGroupProps = WithSupportProps<{
  /** Заголовок группы */
  title: string;
  /** Содержимое группы */
  children: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

/** Группа уведомлений с заголовком внутри панели */
export function NotificationPanelGroup({ title, children, className, ...rest }: NotificationPanelGroupProps) {
  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)}>
      <div className={styles.title}>
        <Typography.LightLabelS className={styles.text} tag='span'>
          <TruncateString text={title} />
        </Typography.LightLabelS>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
