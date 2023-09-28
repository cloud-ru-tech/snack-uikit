import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-ui/icon-predefined';
import { Typography } from '@snack-ui/typography';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

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
  iconAppearance = IconPredefined.appearances.Neutral,
  title,
  description,
  className,
  ...rest
}: NotificationPanelBlankProps) {
  return (
    <div className={cn(styles.notificationPanelBlank, className)} {...extractSupportProps(rest)}>
      {icon && (
        <IconPredefined
          icon={icon}
          appearance={iconAppearance}
          size={IconPredefined.sizes.L}
          data-test-id={TEST_IDS.blank.icon}
        />
      )}

      <div className={styles.notificationPanelBlankContent}>
        <Typography.SansTitleS
          tag={Typography.tags.div}
          className={styles.notificationPanelBlankTitle}
          data-test-id={TEST_IDS.blank.title}
        >
          {title}
        </Typography.SansTitleS>

        <Typography.SansBodyM
          tag={Typography.tags.div}
          className={styles.notificationPanelBlankDescription}
          data-test-id={TEST_IDS.blank.description}
        >
          {description}
        </Typography.SansBodyM>
      </div>
    </div>
  );
}

NotificationPanelBlank.iconAppearances = IconPredefined.appearances;
