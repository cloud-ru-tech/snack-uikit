import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Appearance, HtmlType, SizeSL, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonSimpleProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

const ForwardedButtonSimple = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonSimpleProps>(
  (
    {
      className,
      size = SizeSL.S,
      target = Target.Blank,
      type = HtmlType.Button,
      appearance = Appearance.Neutral,
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

export const ButtonSimple = ForwardedButtonSimple as typeof ForwardedButtonSimple & {
  types: typeof HtmlType;
  sizes: typeof SizeSL;
  appearances: typeof Appearance;
  targets: typeof Target;
};

ButtonSimple.sizes = SizeSL;
ButtonSimple.types = HtmlType;
ButtonSimple.appearances = Appearance;
ButtonSimple.targets = Target;
