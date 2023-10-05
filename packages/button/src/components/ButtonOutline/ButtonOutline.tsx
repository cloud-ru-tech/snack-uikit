import cn from 'classnames';
import { forwardRef } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, SizeSL, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonOutlineProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

const ForwardedButtonOutline = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonOutlineProps>(
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
      {...extractDataProps(rest)}
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

export const ButtonOutline = ForwardedButtonOutline as typeof ForwardedButtonOutline & {
  types: typeof HtmlType;
  sizes: typeof SizeSL;
  appearances: typeof Appearance;
  targets: typeof Target;
};

ButtonOutline.sizes = SizeSL;
ButtonOutline.types = HtmlType;
ButtonOutline.appearances = Appearance;
ButtonOutline.targets = Target;
