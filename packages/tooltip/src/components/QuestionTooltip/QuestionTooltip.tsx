import cn from 'classnames';
import { useState } from 'react';

import { QuestionSVG } from '@snack-ui/icons';

import { Tooltip, TooltipProps } from '../Tooltip';
import { Size } from './constants';
import styles from './styles.module.scss';

export type QuestionTooltipProps = Omit<TooltipProps, 'children' | 'triggerClassName'> & {
  size?: Size;
  tooltipClassname?: string;
};

const SIZES_MAP = {
  [Size.Xs]: 16,
  [Size.S]: 24,
};

export function QuestionTooltip({
  size = Size.Xs,
  trigger = Tooltip.triggers.Hover,
  tooltipClassname,
  className,
  ...rest
}: QuestionTooltipProps) {
  const [tooltipOpened, setTooltipOpened] = useState(false);

  return (
    <Tooltip
      {...rest}
      className={tooltipClassname}
      open={tooltipOpened}
      onOpenChange={setTooltipOpened}
      trigger={trigger}
    >
      {({ getReferenceProps, ref }) => (
        <button
          {...getReferenceProps()}
          ref={ref}
          data-size={size}
          data-opened={tooltipOpened}
          data-trigger={trigger}
          className={cn(styles.questionTooltip, className)}
        >
          <QuestionSVG size={SIZES_MAP[size]} />
        </button>
      )}
    </Tooltip>
  );
}

QuestionTooltip.sizes = Size;
QuestionTooltip.triggers = Tooltip.triggers;
QuestionTooltip.placements = Tooltip.placements;
