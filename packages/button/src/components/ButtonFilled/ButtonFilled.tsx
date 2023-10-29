import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, SizeSL, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFilledProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

const ForwardedButtonFilled = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonFilledProps>(
  (
    {
      className,
      size = SizeSL.S,
      target = Target.Blank,
      type = HtmlType.Button,
      appearance = Appearance.Primary,
      tabIndex,
      ...rest
    },
    ref,
  ) => (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      size={size}
      target={target}
      type={type}
      appearance={appearance}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);

export const ButtonFilled = ForwardedButtonFilled as typeof ForwardedButtonFilled & {
  types: typeof HtmlType;
  sizes: typeof SizeSL;
  appearances: typeof Appearance;
  targets: typeof Target;
};

ButtonFilled.sizes = SizeSL;
ButtonFilled.types = HtmlType;
ButtonFilled.appearances = Appearance;
ButtonFilled.targets = Target;
