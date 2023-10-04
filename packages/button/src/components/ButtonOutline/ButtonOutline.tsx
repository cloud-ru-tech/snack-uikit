import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, SizeSL, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonOutlineProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

export function ButtonOutline({
  className,
  size = ButtonOutline.sizes.S,
  target = ButtonOutline.targets.Blank,
  type = ButtonOutline.types.Button,
  appearance = ButtonOutline.appearances.Primary,
  tabIndex,
  ...rest
}: ButtonOutlineProps) {
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

ButtonOutline.sizes = SizeSL;
ButtonOutline.types = HtmlType;
ButtonOutline.appearances = Appearance;
ButtonOutline.targets = Target;
