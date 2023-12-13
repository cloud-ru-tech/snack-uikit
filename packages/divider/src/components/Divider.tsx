import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { ORIENTATION, WEIGHT } from './constants';
import styles from './styles.module.scss';
import { Orientation, Weight } from './types';

export type DividerProps = WithSupportProps<{
  /** Толщина линии */
  weight?: Weight;
  /** Ориентация */
  orientation?: Orientation;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент для визуального отделения групп компонентов */
export function Divider({
  className,
  orientation = ORIENTATION.Horizontal,
  weight = WEIGHT.Regular,
  ...rest
}: DividerProps) {
  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(className, styles.root)}
      data-weight={weight}
      data-orientation={orientation}
    >
      <hr className={cn(styles.divider)} />
    </div>
  );
}
