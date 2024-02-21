import cn from 'classnames';

import { ButtonFilled, ButtonFilledProps, ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { TooltipProps } from '@snack-uikit/tooltip';

import { TEST_IDS } from '../../constants';
import { useButtonWithTooltip } from './hooks';
import styles from './styles.module.scss';

export type FooterProps = {
  /** Основная кнопка */
  primaryButton: Omit<ButtonFilledProps, 'size'> & { tooltip?: TooltipProps };
  /** Дополнительная кнопка */
  secondaryButton?: Omit<ButtonTonalProps, 'size'> & { tooltip?: TooltipProps };
  className?: string;
};

export function Footer({ primaryButton, secondaryButton, className }: FooterProps) {
  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: primaryButton.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonTonal, tooltip: secondaryButton?.tooltip });

  return (
    <div className={cn(styles.infoBlockFooter, className)}>
      {secondaryButton && (
        <SecondaryButton
          {...secondaryButton}
          size='m'
          data-test-id={secondaryButton['data-test-id'] || TEST_IDS.secondaryButton}
        />
      )}

      <PrimaryButton
        {...primaryButton}
        size='m'
        data-test-id={primaryButton['data-test-id'] || TEST_IDS.primaryButton}
      />
    </div>
  );
}
