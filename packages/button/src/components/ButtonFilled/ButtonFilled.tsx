import cn from 'classnames';
import { forwardRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, HTML_TYPE, SIZE_S_L, TARGET } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps, SizeSL } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonFilledProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

export const ButtonFilled = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonFilledProps>(
  (
    {
      className,
      size = SIZE_S_L.S,
      target = TARGET.Blank,
      type = HTML_TYPE.Button,
      appearance = APPEARANCE.Primary,
      tabIndex,
      fullWidth = false,
      ...rest
    },
    ref,
  ) => (
    <ButtonPrivate
      {...extractSupportProps(rest)}
      {...extractCommonButtonProps(rest)}
      className={cn(styles.button, className)}
      iconClassName={styles.icon}
      labelClassName={styles.label}
      size={size}
      fullWidth={fullWidth}
      target={target}
      type={type}
      appearance={appearance}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);
