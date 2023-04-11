import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { HtmlType, Size, Target, Type } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import { ButtonFilled } from '../ButtonFilled';
import styles from './styles.module.scss';

export type ButtonTonalProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>;

export function ButtonTonal({
  className,
  size = Size.S,
  target = Target.Blank,
  type = Type.Primary,
  htmlType = HtmlType.Button,
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
      htmlType={htmlType}
    />
  );
}

ButtonTonal.sizes = Size;
ButtonTonal.types = Type;
ButtonFilled.htmlTypes = HtmlType;
ButtonFilled.targets = Target;
