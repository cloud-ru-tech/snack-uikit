import cn from 'classnames';
import { ReactNode } from 'react';

import { QuestionTooltip, TooltipProps } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type DrawerHeaderProps = WithSupportProps<{
  /** Изображение */
  image?: {
    src: string;
    alt: string;
  };
  /** Заголовок */
  title: ReactNode;
  /** Тултип для заголовка */
  titleTooltip?: TooltipProps['tip'];
  /** Подзаголовок */
  subtitle?: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

/** Вспомогательный компонент для добавления "шапки" в DrawerCustom */
export function DrawerHeader({ title, titleTooltip, subtitle, image, className, ...rest }: DrawerHeaderProps) {
  return (
    <div className={cn(styles.drawerHeader, className)} {...extractSupportProps(rest)}>
      {image && <img src={image.src} alt={image.alt} className={styles.image} data-test-id={TEST_IDS.image} />}

      <div className={styles.headlineLayout}>
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
