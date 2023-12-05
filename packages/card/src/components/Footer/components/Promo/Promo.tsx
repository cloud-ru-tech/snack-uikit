import cn from 'classnames';

import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { excludeSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Size } from '../../../../constants';
import { useCardContext } from '../../../../context';
import { Dimension, DimensionProps } from '../Dimension';
import styles from './styles.module.scss';

export type FooterPromoProps = WithSupportProps<{
  /** Параметры для блока значений */
  volume?: DimensionProps;
  /** Параметры для основной кнопки */
  button?: Pick<ButtonFilledProps, 'label' | 'onClick' | 'loading' | 'icon'>;
  /** CSS-класс для элемента с контентом */
  className?: string;
  /** Размер */
  size?: Size;
}>;

export function FooterPromo({ volume, button, className, size, ...rest }: FooterPromoProps) {
  const { disabled } = useCardContext();

  return (
    <div className={cn(styles.promo, className)} {...excludeSupportProps(rest)}>
      {button && (
        <ButtonFilled
          {...button}
          appearance={ButtonFilled.appearances.Primary}
          size={ButtonFilled.sizes.M}
          disabled={disabled}
        />
      )}
      {volume && <Dimension {...volume} size={size} />}
    </div>
  );
}

FooterPromo.sizes = Size;
