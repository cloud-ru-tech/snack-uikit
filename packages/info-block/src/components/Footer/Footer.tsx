import cn from 'classnames';

import { ButtonFilled, ButtonFilledProps, ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type FooterProps = {
  /** Основная кнопка */
  primaryButton: Omit<ButtonFilledProps, 'size'>;
  /** Дополнительная кнопка */
  secondaryButton?: Omit<ButtonTonalProps, 'size'>;
  className?: string;
};

export function Footer({ primaryButton, secondaryButton, className }: FooterProps) {
  return (
    <div className={cn(styles.infoBlockFooter, className)}>
      {secondaryButton && (
        <ButtonTonal
          {...secondaryButton}
          size='m'
          data-test-id={secondaryButton['data-test-id'] || TEST_IDS.secondaryButton}
        />
      )}

      <ButtonFilled
        {...primaryButton}
        size='m'
        data-test-id={primaryButton['data-test-id'] || TEST_IDS.primaryButton}
      />
    </div>
  );
}
