import cn from 'classnames';
import { ReactElement, ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { ALIGN, SIZE, TEST_IDS } from '../../constants';
import { Align, Size } from '../../types';
import { Footer, FooterProps } from '../Footer';
import styles from './styles.module.scss';

export type InfoBlockProps = WithSupportProps<{
  /** Заголовок */
  title?: string;
  /** Подзаголовок */
  description: string;
  /** Иконка */
  icon?: Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;
  /** Размер */
  size?: Size;
  /** Расположение элементов */
  align?: Align;
  /** Вложенный Footer */
  footer?: ReactElement<FooterProps, typeof Footer> | ReactNode;
  className?: string;
}>;

export function InfoBlock({
  title,
  description,
  icon,
  size = SIZE.S,
  footer,
  align = ALIGN.Vertical,
  className,
  ...rest
}: InfoBlockProps) {
  return (
    <div className={cn(styles.infoBlock, className)} data-size={size} data-align={align} {...extractSupportProps(rest)}>
      {icon && (
        <IconPredefined
          icon={icon.icon}
          appearance={icon.appearance ?? 'primary'}
          decor={icon.decor ?? true}
          size={size}
          data-test-id={TEST_IDS.icon}
        />
      )}

      <div className={styles.contentLayout}>
        <div className={styles.textWrap}>
          {title && (
            <Typography
              family='sans'
              purpose='title'
              size={size}
              className={styles.title}
              data-test-id={TEST_IDS.title}
            >
              {title}
            </Typography>
          )}

          <Typography
            family='sans'
            purpose='body'
            size={size}
            className={styles.description}
            data-test-id={TEST_IDS.description}
          >
            {description}
          </Typography>
        </div>

        {footer && (
          <div className={styles.footer} data-test-id={TEST_IDS.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
