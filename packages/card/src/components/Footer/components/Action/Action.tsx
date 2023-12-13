import cn from 'classnames';

import { ButtonFilled, ButtonFilledProps, ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { excludeSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { useCardContext } from '../../../../context';
import styles from './styles.module.scss';

export type FooterActionProps = WithSupportProps<{
  /** Параметры для основной кнопки */
  button: Pick<ButtonFilledProps, 'label' | 'onClick' | 'loading' | 'icon'>;
  /** Параметры для вторичной кнопки */
  secondaryButton?: Pick<ButtonTonalProps, 'label' | 'onClick' | 'loading' | 'icon'>;
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function FooterAction({ button, secondaryButton, className, ...rest }: FooterActionProps) {
  const { disabled } = useCardContext();

  return (
    <div className={cn(styles.action, className)} {...excludeSupportProps(rest)}>
      <ButtonFilled {...button} appearance='primary' size='m' disabled={disabled} />
      {secondaryButton && <ButtonTonal {...secondaryButton} appearance='neutral' size='m' disabled={disabled} />}
    </div>
  );
}
