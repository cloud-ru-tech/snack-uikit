import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type TooltipProps = WithSupportProps<
  {
    /** Содержимое тултипа */
    tip: ReactNode;
    /** Отключение ограничения ширины тултипа @default false */
    disableMaxWidth?: boolean;
  } & Pick<
    PopoverPrivateProps,
    'className' | 'triggerClassName' | 'open' | 'onOpenChange' | 'hoverDelayOpen' | 'hoverDelayClose'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement' | 'children'>>
>;

export function Tooltip({
  tip,
  trigger = 'hoverAndFocusVisible',
  placement = 'top',
  children,
  disableMaxWidth = false,
  ...otherProps
}: TooltipProps) {
  if (!children) {
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
      arrowContainerClassName={styles.tooltipArrowContainer}
      arrowElementClassName={styles.tooltipArrowElement}
      hasArrow
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
