import cn from 'classnames';
import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-ui/popover-private';
import { WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type DropdownProps = WithSupportProps<
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
    | 'closeOnEscapeKey'
    | 'triggerClickByKeys'
    | 'triggerRef'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;

export function Dropdown({
  content,
  trigger = PopoverPrivate.triggers.Click,
  placement = PopoverPrivate.placements.BottomStart,
  children,
  widthStrategy = PopoverPrivate.widthStrategies.Gte,
  triggerClassName,
  ...otherProps
}: DropdownProps) {
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
      triggerClassName={cn(styles.defaultTriggerClassName, triggerClassName)}
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}

Dropdown.placements = PopoverPrivate.placements;
Dropdown.triggers = PopoverPrivate.triggers;
Dropdown.widthStrategies = PopoverPrivate.widthStrategies;
