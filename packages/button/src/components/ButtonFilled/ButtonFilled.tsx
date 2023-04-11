import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { HtmlType, Size, Target, Type } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFilledProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>;

export function ButtonFilled({
  className,
  size = Size.S,
  target = Target.Blank,
  type = Type.Primary,
  htmlType = HtmlType.Button,
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
      htmlType={htmlType}
    />
  );
}

ButtonFilled.sizes = Size;
ButtonFilled.types = Type;
ButtonFilled.htmlTypes = HtmlType;
ButtonFilled.targets = Target;
