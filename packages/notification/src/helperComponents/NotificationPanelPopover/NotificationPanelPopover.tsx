import cn from 'classnames';
import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-ui/popover-private';
import { WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type NotificationPanelPopoverProps = WithSupportProps<
  {
    content: ReactNode;
    /** CSS-класс для элемента содержащего контент */
    contentClassName?: string;
  } & Pick<
    PopoverPrivateProps,
    | 'className'
    | 'triggerClassName'
    | 'open'
    | 'onOpenChange'
    | 'hoverDelayOpen'
    | 'hoverDelayClose'
    | 'offset'
    | 'children'
    | 'closeOnEscapeKey'
    | 'triggerClickByKeys'
    | 'triggerRef'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;

export function NotificationPanelPopover({
  content,
  trigger = PopoverPrivate.triggers.Click,
  placement = PopoverPrivate.placements.BottomEnd,
  children,
  contentClassName,
  ...otherProps
}: NotificationPanelPopoverProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      fallbackPlacements={[]}
      placement={placement}
      popoverContent={
        <div className={styles.notificationPanelPopoverWrap}>
          <div className={cn(styles.notificationPanelPopover, contentClassName)}>{content}</div>
        </div>
      }
      trigger={trigger}
      hasArrow={false}
      heightStrategy={PopoverPrivate.heightStrategies.Lte}
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
