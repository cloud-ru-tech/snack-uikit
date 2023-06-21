import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-ui/popover-private';
import { WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type DroplistProps = WithSupportProps<
  {
    content: ReactNode;
  } & Pick<
    PopoverPrivateProps,
    | 'className'
    | 'triggerClassName'
    | 'open'
    | 'onOpenChange'
    | 'hoverDelayOpen'
    | 'hoverDelayClose'
    | 'widthStrategy'
    | 'offset'
    | 'children'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;

export function Droplist({
  content,
  trigger = PopoverPrivate.triggers.Click,
  placement = PopoverPrivate.placements.BottomStart,
  children,
  widthStrategy = PopoverPrivate.widthStrategies.Gte,
  ...otherProps
}: DroplistProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={<div className={styles.droplistContainer}>{content}</div>}
      trigger={trigger}
      hasArrow={false}
      widthStrategy={widthStrategy}
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}

Droplist.placements = PopoverPrivate.placements;
Droplist.triggers = PopoverPrivate.triggers;
Droplist.widthStrategies = PopoverPrivate.widthStrategies;
