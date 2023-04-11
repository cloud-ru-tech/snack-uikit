import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { HtmlType, IconPosition, Size, Target, Type } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { extractCommonButtonProps, extractCounterButtonProps } from '../../utils';
import { ButtonFilled } from '../ButtonFilled';
import styles from './styles.module.scss';

export type ButtonSupportProps = WithSupportProps<CommonButtonProps> & CounterButtonProps;

export function ButtonSupport({
  className,
  iconPosition = IconPosition.After,
  size = Size.S,
  target = Target.Blank,
  type = Type.Neutral,
  htmlType = HtmlType.Button,
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
      htmlType={htmlType}
    />
  );
}

ButtonSupport.iconPositions = IconPosition;
ButtonSupport.sizes = Size;
ButtonSupport.types = Type;
ButtonFilled.htmlTypes = HtmlType;
ButtonFilled.targets = Target;
