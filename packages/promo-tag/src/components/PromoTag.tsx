import cn from 'classnames';

import { Typography } from '@snack-ui/typography';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance } from '../constants';
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
export function PromoTag({ appearance = PromoTag.appearances.Primary, className, text, ...props }: PromoTagProps) {
  return (
    <div className={cn(styles.promoTag, className)} data-appearance={appearance} {...extractSupportProps(props)}>
      <Typography.SansLabelL tag={Typography.tags.span}>{text}</Typography.SansLabelL>
    </div>
  );
}

PromoTag.appearances = Appearance;
