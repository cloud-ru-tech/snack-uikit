import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, SizeSL, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonSimpleProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

export function ButtonSimple({
  className,
  size = ButtonSimple.sizes.S,
  target = ButtonSimple.targets.Blank,
  type = ButtonSimple.types.Button,
  appearance = ButtonSimple.appearances.Neutral,
  tabIndex,
  ...rest
}: ButtonSimpleProps) {
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

ButtonSimple.sizes = SizeSL;
ButtonSimple.types = HtmlType;
ButtonSimple.appearances = Appearance;
ButtonSimple.targets = Target;
