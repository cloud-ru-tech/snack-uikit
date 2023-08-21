import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, Size, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFilledProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>;

export function ButtonFilled({
  className,
  size = ButtonFilled.sizes.S,
  target = ButtonFilled.targets.Blank,
  type = ButtonFilled.types.Button,
  appearance = ButtonFilled.appearances.Primary,
  tabIndex,
  ...rest
}: ButtonFilledProps) {
  return (
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
    />
  );
}

ButtonFilled.sizes = Size;
ButtonFilled.types = HtmlType;
ButtonFilled.appearances = Appearance;
ButtonFilled.targets = Target;
