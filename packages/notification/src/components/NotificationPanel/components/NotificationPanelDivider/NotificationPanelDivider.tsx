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
    <Typography.LightLabelS className={cn(styles.notificationPanelDivider, className)} {...extractSupportProps(rest)}>
      {text}
    </Typography.LightLabelS>
  );
}
