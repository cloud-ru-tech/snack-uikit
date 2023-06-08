import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { HtmlType, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import { Size } from './constants';
import styles from './styles.module.scss';

export type ButtonElevatedProps = WithSupportProps<
  Omit<CommonButtonProps, 'iconPosition' | 'label' | 'type' | 'labelClassName' | 'size'> &
    Required<Pick<CommonButtonProps, 'icon'>> & {
      size?: Size;
    }
>;

export function ButtonElevated({
  className,
  size = Size.S,
  target = Target.Blank,
  htmlType = HtmlType.Button,
  tabIndex,
  ...rest
}: ButtonElevatedProps) {
  return (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      size={size}
      target={target}
      htmlType={htmlType}
      tabIndex={tabIndex}
    />
  );
}

ButtonElevated.sizes = Size;
ButtonElevated.htmlTypes = HtmlType;
ButtonElevated.targets = Target;
