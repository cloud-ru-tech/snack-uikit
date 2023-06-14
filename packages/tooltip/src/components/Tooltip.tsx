import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-ui/popover-private';
import { WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type TooltipProps = WithSupportProps<
  {
    tip: ReactNode;
  } & Pick<
    PopoverPrivateProps,
    'className' | 'triggerClassName' | 'open' | 'onOpenChange' | 'hoverDelayOpen' | 'hoverDelayClose'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement' | 'children'>>
>;

export function Tooltip({
  tip,
  trigger = PopoverPrivate.triggers.HoverAndFocusVisible,
  placement = PopoverPrivate.placements.Top,
  children,
  ...otherProps
}: TooltipProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={<div className={styles.tooltipContainer}>{tip}</div>}
      arrowClassName={styles.tooltipArrow}
      trigger={trigger}
      arrowSize={PopoverPrivate.arrowSizes.M}
      hasArrow
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}

Tooltip.placements = PopoverPrivate.placements;
Tooltip.triggers = PopoverPrivate.triggers;
