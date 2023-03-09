import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';
import cn from 'classnames';

import { HtmlType, Size, Target, Type } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonOutlineProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>;

export function ButtonOutline({
  className,
  size = Size.SizeS,
  target = Target.Blank,
  type = Type.Primary,
  htmlType = HtmlType.Button,
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
      htmlType={htmlType}
    />
  );
}

ButtonOutline.sizes = Size;
ButtonOutline.types = Type;
