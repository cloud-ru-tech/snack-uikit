import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { HTML_TYPE, TARGET } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import { SIZE } from './constants';
import styles from './styles.module.scss';
import { Size } from './types';

export type ButtonElevatedProps = WithSupportProps<
  Omit<CommonButtonProps, 'iconPosition' | 'label' | 'appearance' | 'labelClassName' | 'size' | 'fullWidth'> &
    Required<Pick<CommonButtonProps, 'icon'>> & {
      /** Размер */
      size?: Size;
    }
>;

export const ButtonElevated = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonElevatedProps>(
  ({ className, size = SIZE.S, target = TARGET.Blank, type = HTML_TYPE.Button, tabIndex, ...rest }, ref) => (
    <ButtonPrivate
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
