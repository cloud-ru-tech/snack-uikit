import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';
import cn from 'classnames';

import { HtmlType, IconPosition, Size, Target, Type } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonSupportProps = WithSupportProps<CommonButtonProps>;

export function ButtonSupport({
  className,
  iconPosition = IconPosition.After,
  size = Size.SizeS,
  target = Target.Blank,
  type = Type.Neutral,
  htmlType = HtmlType.Button,
  ...rest
}: ButtonSupportProps) {
  return (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      iconPosition={iconPosition}
      labelClassName={styles.label}
      size={size}
      target={target}
      type={type}
      htmlType={htmlType}
    />
  );
}

ButtonSupport.iconPositions = IconPosition;
ButtonSupport.sizes = Size;
ButtonSupport.types = Type;
