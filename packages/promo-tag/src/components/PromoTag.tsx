import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE } from '../constants';
import { Appearance } from '../types';
import styles from './styles.module.scss';

export type PromoTagProps = WithSupportProps<{
  /** Текст компонента */
  text: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
}>;

/**
 * Компонент Promo Tag
 */
export function PromoTag({ appearance = APPEARANCE.Primary, className, text, ...props }: PromoTagProps) {
  return (
    <div className={cn(styles.promoTag, className)} {...extractSupportProps(props)} data-appearance={appearance}>
      <Typography.SansLabelS tag='span'>{text}</Typography.SansLabelS>
    </div>
  );
}
