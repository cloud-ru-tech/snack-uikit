import cn from 'classnames';
import { MouseEvent, ReactNode } from 'react';

import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, COLOR, SIZE } from '../constants';
import { Appearance, Color, Size } from '../types';
import styles from './styles.module.scss';

type PromoTagBaseProps = {
  /** Текст компонента */
  text?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Семантический цвет */
  color?: Color;
  /** CSS-класс */
  className?: string;
  /** Колбэк для обработки клика на тег  */
  onClick?(e: MouseEvent<HTMLDivElement>): void;
};

type PromoTagWithNodesProps = {
  /** Размер */
  size?: Exclude<Size, 'xxs'>;
  /** Контент перед текстом */
  beforeContent?: ReactNode;
  /** Контент после текста */
  afterContent?: ReactNode;
};

type PromoTagWithoutNodesProps = {
  /** Размер */
  size?: Exclude<Size, 'xs' | 's'>;
  beforeContent?: never;
  afterContent?: never;
};

export type PromoTagProps = WithSupportProps<PromoTagBaseProps & (PromoTagWithNodesProps | PromoTagWithoutNodesProps)>;

/**
 * Компонент Promo Tag
 */
export function PromoTag({
  appearance = APPEARANCE.Primary,
  color = COLOR.Accent,
  size = SIZE.Xxs,
  className,
  text,
  beforeContent,
  afterContent,
  onClick,
  ...props
}: PromoTagProps) {
  const displayNodes = size !== SIZE.Xxs;

  const clickAttributes = onClick ? { role: 'button', tabIndex: 0, onClick } : {};

  const Label = size === SIZE.S ? Typography.SansLabelM : Typography.SansLabelS;

  return (
    <div
      className={cn(styles.promoTag, className)}
      {...extractSupportProps(props)}
      data-appearance={appearance}
      data-color={color}
      data-size={size}
      {...clickAttributes}
    >
      {displayNodes && beforeContent}
      {Boolean(text) && (
        <Label className={styles.labelWrapper} tag='span'>
          {text}
        </Label>
      )}
      {displayNodes && afterContent}
    </div>
  );
}
