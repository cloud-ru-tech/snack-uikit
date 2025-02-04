import cn from 'classnames';
import { ReactElement } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

import { NotificationPanel, NotificationPanelProps } from '../NotificationPanel';
import styles from './styles.module.scss';

export type NotificationPanelPopoverProps = WithSupportProps<
  {
    content: ReactElement<NotificationPanelProps, typeof NotificationPanel>;
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

/** Компонент-обёртка для NotificationPanel для использования как выпадающий элемент */
export function NotificationPanelPopover({
  content,
  trigger = 'click',
  placement = 'bottom-end',
  children,
  triggerRef,
  contentClassName,
  ...otherProps
}: NotificationPanelPopoverProps) {
  if (!children && !triggerRef) {
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
      triggerRef={triggerRef}
      hasArrow={false}
      heightStrategy='lte'
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
