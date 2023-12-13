import cn from 'classnames';
import { JSXElementConstructor } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from '../constants';
import { Appearance, Size } from '../types';
import styles from './styles.module.scss';

export type IconPredefinedProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Наличие цветной подложки */
  decor?: boolean;
  /** JSX иконки */
  icon: JSXElementConstructor<{ size?: number; className?: string }>;
  /** Размер */
  size?: Size;
}>;

export function IconPredefined({
  className,
  decor = true,
  size = SIZE.M,
  icon: IconComponent,
  appearance = APPEARANCE.Primary,
  ...rest
}: IconPredefinedProps) {
  return (
    <div
      className={cn(styles.decor, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-decor={decor || undefined}
      data-appearance={appearance}
    >
      <IconComponent data-size={size} data-appearance={appearance} className={styles.icon} />
    </div>
  );
}
