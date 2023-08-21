import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, Size, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonTonalProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>;

export function ButtonTonal({
  className,
  size = ButtonTonal.sizes.S,
  target = ButtonTonal.targets.Blank,
  type = ButtonTonal.types.Button,
  appearance = ButtonTonal.appearances.Primary,
  tabIndex,
  ...rest
}: ButtonTonalProps) {
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

ButtonTonal.sizes = Size;
ButtonTonal.types = HtmlType;
ButtonTonal.appearances = Appearance;
ButtonTonal.targets = Target;
