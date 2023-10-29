import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-ui/icon-predefined';
import { QuestionTooltip, QuestionTooltipProps } from '@snack-ui/tooltip';
import { Typography } from '@snack-ui/typography';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContentAlign, TEST_IDS } from '../../constants';
import { isPictureImage } from '../../utils';
import styles from './styles.module.scss';
import { ModalHeaderImage } from './types';

export type ModalHeaderProps = WithSupportProps<{
  /** Заголовок модального окна */
  title: ReactNode;
  /** Тултип для заголовка */
  titleTooltip?: QuestionTooltipProps['tip'];
  /** Подзаголовок */
  subtitle?: ReactNode;
  /** Можно передать иконку из пакета `@snack-ui/icon-predefined` или путь к картинке и атрибут `alt` */
  picture?: IconPredefinedProps['icon'] | ModalHeaderImage;
  /** Выравнивание контента */
  align?: ContentAlign;
  className?: string;
}>;

export function ModalHeader({
  title,
  titleTooltip,
  subtitle,
  align = ContentAlign.Default,
  picture,
  className,
  ...rest
}: ModalHeaderProps) {
  return (
    <div className={cn(styles.header, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.header}>
      {picture &&
        (isPictureImage(picture) ? (
          <img src={picture.src} alt={picture.alt} className={styles.image} data-test-id={TEST_IDS.image} />
        ) : (
          <div className={styles.icon} data-test-id={TEST_IDS.icon}>
            <IconPredefined icon={picture} size={IconPredefined.sizes.L} />
          </div>
        ))}

      <div className={styles.headlineLayout} data-align={align}>
        <div className={styles.headline}>
          <Typography
            family={Typography.families.Sans}
            role={Typography.roles.Headline}
            size={Typography.sizes.S}
            className={styles.title}
            data-test-id={TEST_IDS.title}
          >
            {title}
          </Typography>

          {titleTooltip && (
            <QuestionTooltip tip={titleTooltip} size={QuestionTooltip.sizes.S} data-test-id={TEST_IDS.tooltip} />
          )}
        </div>

        {subtitle && (
          <Typography
            family={Typography.families.Sans}
            role={Typography.roles.Body}
            size={Typography.sizes.M}
            className={styles.subtitle}
            data-test-id={TEST_IDS.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </div>
    </div>
  );
}

ModalHeader.aligns = ContentAlign;
