import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, IconPosition, Size, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { extractCommonButtonProps, extractCounterButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonSupportProps = WithSupportProps<CommonButtonProps> & CounterButtonProps;

export function ButtonSupport({
  className,
  iconPosition = ButtonSupport.iconPositions.After,
  size = ButtonSupport.sizes.S,
  target = ButtonSupport.targets.Blank,
  type = ButtonSupport.types.Button,
  appearance = ButtonSupport.appearances.Neutral,
  tabIndex,
  ...rest
}: ButtonSupportProps) {
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

ButtonSupport.iconPositions = IconPosition;
ButtonSupport.sizes = Size;
ButtonSupport.types = HtmlType;
ButtonSupport.appearances = Appearance;
ButtonSupport.targets = Target;
