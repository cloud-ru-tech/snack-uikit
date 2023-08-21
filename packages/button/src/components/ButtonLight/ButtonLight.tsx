import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, IconPosition, Size, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { extractCommonButtonProps, extractCounterButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonLightProps = WithSupportProps<CommonButtonProps> & CounterButtonProps;

export function ButtonLight({
  className,
  iconPosition = ButtonLight.iconPositions.After,
  size = ButtonLight.sizes.S,
  target = ButtonLight.targets.Blank,
  type = ButtonLight.types.Button,
  appearance = ButtonLight.appearances.Neutral,
  tabIndex,
  ...rest
}: ButtonLightProps) {
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

ButtonLight.iconPositions = IconPosition;
ButtonLight.sizes = Size;
ButtonLight.types = HtmlType;
ButtonLight.appearances = Appearance;
ButtonLight.targets = Target;
