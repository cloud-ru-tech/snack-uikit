import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-ui/popover-private';
import { WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type PopoverProps = WithSupportProps<
  {
    tip: ReactNode;
  } & Pick<
    PopoverPrivateProps,
    | 'trigger'
    | 'className'
    | 'placement'
    | 'open'
    | 'onOpenChange'
    | 'children'
    | 'hoverDelayOpen'
    | 'hoverDelayClose'
    | 'outsideClick'
  >
>;

export function Popover({
  tip,
  trigger = PopoverPrivate.triggers.Click,
  placement = PopoverPrivate.placements.Top,
  children,
  ...otherProps
}: PopoverProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={<div className={styles.popoverContainer}>{tip}</div>}
      arrowClassName={styles.popoverArrow}
      trigger={trigger}
      hasArrow
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}

Popover.placements = PopoverPrivate.placements;
Popover.triggers = PopoverPrivate.triggers;
