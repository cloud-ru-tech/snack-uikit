import cn from 'classnames';
import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

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
  trigger = 'click',
  placement = 'bottom-end',
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
      heightStrategy='lte'
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
