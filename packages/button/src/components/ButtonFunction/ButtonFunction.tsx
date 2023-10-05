import cn from 'classnames';
import { forwardRef } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, IconPosition, SizeXsM, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { extractCommonButtonProps, extractCounterButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFunctionProps = WithSupportProps<Omit<CommonButtonProps, 'size'> & { size?: SizeXsM }> &
  CounterButtonProps;

const ForwardedButtonFunction = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonFunctionProps>(
  (
    {
      className,
      iconPosition = IconPosition.After,
      size = SizeXsM.S,
      target = Target.Blank,
      type = HtmlType.Button,
      appearance = Appearance.Neutral,
      tabIndex,
      ...rest
    },
    ref,
  ) => (
    <ButtonPrivate
      {...extractDataProps(rest)}
      {...extractSupportProps(rest)}
      {...extractCounterButtonProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      iconPosition={iconPosition}
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

export const ButtonFunction = ForwardedButtonFunction as typeof ForwardedButtonFunction & {
  types: typeof HtmlType;
  iconPositions: typeof IconPosition;
  sizes: typeof SizeXsM;
  appearances: typeof Appearance;
  targets: typeof Target;
};

ButtonFunction.iconPositions = IconPosition;
ButtonFunction.sizes = SizeXsM;
ButtonFunction.types = HtmlType;
ButtonFunction.appearances = Appearance;
ButtonFunction.targets = Target;
