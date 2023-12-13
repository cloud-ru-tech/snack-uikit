import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type PopoverProps = WithSupportProps<
  {
    /** Контент поповера */
    tip: ReactNode;
    /** Отключение ограничения ширины поповера @default false */
    disableMaxWidth?: boolean;
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
  trigger = 'click',
  placement = 'top',
  disableMaxWidth = false,
  children,
  ...otherProps
}: PopoverProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={
        <div className={styles.popoverContainer} data-disable-max-width={disableMaxWidth}>
          {tip}
        </div>
      }
      arrowContainerClassName={styles.popoverArrowContainer}
      arrowElementClassName={styles.popoverArrowElement}
      trigger={trigger}
      hasArrow
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
