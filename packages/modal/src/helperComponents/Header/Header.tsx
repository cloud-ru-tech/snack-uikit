import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { QuestionTooltip, QuestionTooltipProps } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTENT_ALIGN, TEST_IDS } from '../../constants';
import { ContentAlign } from '../../types';
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
  /** Можно передать иконку из пакета `@snack-uikit/icon-predefined` или путь к картинке и атрибут `alt` */
  picture?: IconPredefinedProps['icon'] | ModalHeaderImage;
  /** Выравнивание контента */
  align?: ContentAlign;
  className?: string;
}>;

export function ModalHeader({
  title,
  titleTooltip,
  subtitle,
  align = CONTENT_ALIGN.Default,
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
            <IconPredefined icon={picture} size='l' />
          </div>
        ))}

      <div className={styles.headlineLayout} data-align={align}>
        <div className={styles.headline}>
          <Typography.SansHeadlineS className={styles.title} data-test-id={TEST_IDS.title}>
            {title}
          </Typography.SansHeadlineS>

          {titleTooltip && <QuestionTooltip tip={titleTooltip} size='s' data-test-id={TEST_IDS.tooltip} />}
        </div>

        {subtitle && (
          <Typography.SansBodyM className={styles.subtitle} data-test-id={TEST_IDS.subtitle}>
            {subtitle}
          </Typography.SansBodyM>
        )}
      </div>
    </div>
  );
}
