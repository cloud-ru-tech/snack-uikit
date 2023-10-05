import cn from 'classnames';
import { forwardRef } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, SizeSL, Target } from '../../constants';
import { ButtonPrivate } from '../../helperComponents';
import { CommonButtonProps } from '../../types';
import { extractCommonButtonProps } from '../../utils';
import styles from './styles.module.scss';

export type ButtonTonalProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition' | 'size'> & { size?: SizeSL }>;

const ForwardedButtonTonal = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonTonalProps>(
  (
    {
      className,
      size = SizeSL.S,
      target = Target.Blank,
      type = HtmlType.Button,
      appearance = Appearance.Primary,
      tabIndex,
      ...rest
    },
    ref,
  ) => (
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
      appearance={appearance}
      tabIndex={tabIndex}
      ref={ref}
    />
  ),
);

export const ButtonTonal = ForwardedButtonTonal as typeof ForwardedButtonTonal & {
  types: typeof HtmlType;
  sizes: typeof SizeSL;
  appearances: typeof Appearance;
  targets: typeof Target;
};

ButtonTonal.sizes = SizeSL;
ButtonTonal.types = HtmlType;
ButtonTonal.appearances = Appearance;
ButtonTonal.targets = Target;
