import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Orientation, Weight } from './constants';
import styles from './styles.module.scss';

export type DividerProps = WithSupportProps<{
  weight?: Weight;
  orientation?: Orientation;
  className?: string;
}>;

export function Divider({
  className,
  orientation = Orientation.Horizontal,
  weight = Weight.Regular,
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

Divider.orientations = Orientation;
Divider.weights = Weight;
