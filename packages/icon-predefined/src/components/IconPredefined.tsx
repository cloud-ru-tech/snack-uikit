import cn from 'classnames';
import { JSXElementConstructor } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, Size } from '../constants';
import styles from './styles.module.scss';

export type IconPredefinedProps = WithSupportProps<{
  className?: string;
  appearance?: Appearance;
  decor?: boolean;
  icon: JSXElementConstructor<{ size?: number; className?: string }>;
  size?: Size;
}>;

export function IconPredefined({
  className,
  decor = true,
  size = Size.M,
  icon: IconComponent,
  appearance = Appearance.Primary,
  ...rest
}: IconPredefinedProps) {
  return (
    <div
      data-size={size}
      data-decor={decor || undefined}
      data-appearance={appearance}
      className={cn(styles.decor, className)}
      {...extractSupportProps(rest)}
    >
      <IconComponent
        data-size={size}
        data-appearance={appearance}
        className={styles.icon}
        size={size === Size.S ? 16 : 24}
      />
    </div>
  );
}

IconPredefined.appearances = Appearance;
IconPredefined.sizes = Size;
