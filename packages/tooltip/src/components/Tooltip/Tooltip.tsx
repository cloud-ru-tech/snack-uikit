import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

import { DEFAULT_FALLBACK_PLACEMENTS } from './constants';
import styles from './styles.module.scss';

export type TooltipProps = WithSupportProps<
  {
    /** Содержимое тултипа */
    tip: ReactNode;
    /** Отключение ограничения ширины тултипа @default false */
    disableMaxWidth?: boolean;
  } & Pick<
    PopoverPrivateProps,
    | 'className'
    | 'triggerClassName'
    | 'offset'
    | 'open'
    | 'onOpenChange'
    | 'hoverDelayOpen'
    | 'hoverDelayClose'
    | 'triggerRef'
    | 'disableSpanWrapper'
    | 'fallbackPlacements'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement' | 'children'>>
>;

export function Tooltip({
  tip,
  trigger = 'hoverAndFocusVisible',
  placement = 'top',
  children,
  triggerRef,
  disableMaxWidth = false,
  ...otherProps
}: TooltipProps) {
  if (!children && !triggerRef) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={
        <div className={styles.tooltipContainer} data-disable-max-width={disableMaxWidth}>
          {tip}
        </div>
      }
      trigger={trigger}
      triggerRef={triggerRef}
      arrowContainerClassName={styles.tooltipArrowContainer}
      arrowElementClassName={styles.tooltipArrowElement}
      hasArrow
      fallbackPlacements={DEFAULT_FALLBACK_PLACEMENTS}
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
