import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type NotificationPanelDividerProps = WithSupportProps<{
  /** Текст разделителя */
  text: string;
  className?: string;
}>;

/** Разделитель для группировки или разделения карточек в списке */
export function NotificationPanelDivider({ text, className, ...rest }: NotificationPanelDividerProps) {
  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <div className={styles.line}></div>
      <Typography.LightLabelS className={styles.text}>{text}</Typography.LightLabelS>
      <div className={styles.line}></div>
    </div>
  );
}
