import cn from 'classnames';
import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

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
    | 'outsideClick'
    | 'fallbackPlacements'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;

export function Dropdown({
  content,
  trigger = 'click',
  placement = 'bottom-start',
  children,
  widthStrategy = 'gte',
  triggerClassName,
  ...otherProps
}: DropdownProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={<div className={styles.dropdownContainer}>{content}</div>}
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
