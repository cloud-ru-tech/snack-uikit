import cn from 'classnames';
import { forwardRef } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { HtmlType, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import { Size } from './constants';
import styles from './styles.module.scss';

export type ButtonElevatedProps = WithSupportProps<
  Omit<CommonButtonProps, 'iconPosition' | 'label' | 'appearance' | 'labelClassName' | 'size'> &
    Required<Pick<CommonButtonProps, 'icon'>> & {
      /** Размер */
      size?: Size;
    }
>;

const ForwardedButtonElevated = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonElevatedProps>(
  ({ className, size = Size.S, target = Target.Blank, type = HtmlType.Button, tabIndex, ...rest }, ref) => (
    <ButtonPrivate
      {...extractDataProps(rest)}
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      size={size}
      target={target}
      type={type}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);

export const ButtonElevated = ForwardedButtonElevated as typeof ForwardedButtonElevated & {
  types: typeof HtmlType;
  sizes: typeof Size;
  targets: typeof Target;
};

ButtonElevated.sizes = Size;
ButtonElevated.types = HtmlType;
ButtonElevated.targets = Target;
