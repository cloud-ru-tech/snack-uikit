import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, IconPosition, SizeXsM, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { extractCommonButtonProps, extractCounterButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFunctionProps = WithSupportProps<Omit<CommonButtonProps, 'size'> & { size?: SizeXsM }> &
  CounterButtonProps;

export function ButtonFunction({
  className,
  iconPosition = ButtonFunction.iconPositions.After,
  size = ButtonFunction.sizes.S,
  target = ButtonFunction.targets.Blank,
  type = ButtonFunction.types.Button,
  appearance = ButtonFunction.appearances.Neutral,
  tabIndex,
  ...rest
}: ButtonFunctionProps) {
  return (
    <ButtonPrivate
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
    />
  );
}

ButtonFunction.iconPositions = IconPosition;
ButtonFunction.sizes = SizeXsM;
ButtonFunction.types = HtmlType;
ButtonFunction.appearances = Appearance;
ButtonFunction.targets = Target;
