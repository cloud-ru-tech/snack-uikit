import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, HTML_TYPE, ICON_POSITION, SIZE_XS_M, TARGET } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, CounterButtonProps, SizeXsM } from '../../types';
import { extractCommonButtonProps, extractCounterButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFunctionProps = WithSupportProps<Omit<CommonButtonProps, 'size'> & { size?: SizeXsM }> &
  CounterButtonProps;

export const ButtonFunction = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonFunctionProps>(
  (
    {
      className,
      iconPosition = ICON_POSITION.After,
      size = SIZE_XS_M.S,
      target = TARGET.Blank,
      type = HTML_TYPE.Button,
      appearance = APPEARANCE.Neutral,
      tabIndex,
      ...rest
    },
    ref,
  ) => (
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
      appearance={appearance}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);
