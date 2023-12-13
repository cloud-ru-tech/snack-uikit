import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type NotificationPanelBlankProps = WithSupportProps<{
  /** Заголовок */
  title: ReactNode;
  /** Описание */
  description?: ReactNode;
  /** Иконка */
  icon?: IconPredefinedProps['icon'];
  /** Цвет обводки для иконки */
  iconAppearance?: IconPredefinedProps['appearance'];
  /** CSS-класс */
  className?: string;
}>;

/** Компонента для "заглушки" вместо карточек в панели */
export function NotificationPanelBlank({
  icon,
  iconAppearance = 'neutral',
  title,
  description,
  className,
  ...rest
}: NotificationPanelBlankProps) {
  return (
    <div className={cn(styles.notificationPanelBlank, className)} {...extractSupportProps(rest)}>
      {icon && <IconPredefined icon={icon} appearance={iconAppearance} size='l' data-test-id={TEST_IDS.blank.icon} />}

      <div className={styles.notificationPanelBlankContent}>
        <Typography.SansTitleS
          tag='div'
          className={styles.notificationPanelBlankTitle}
          data-test-id={TEST_IDS.blank.title}
        >
          {title}
        </Typography.SansTitleS>

        <Typography.SansBodyM
          tag='div'
          className={styles.notificationPanelBlankDescription}
          data-test-id={TEST_IDS.blank.description}
        >
          {description}
        </Typography.SansBodyM>
      </div>
    </div>
  );
}
