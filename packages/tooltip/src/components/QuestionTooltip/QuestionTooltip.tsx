import cn from 'classnames';
import { useState } from 'react';

import { QuestionSVG } from '@snack-ui/icons';

import { Tooltip, TooltipProps } from '../Tooltip';
import { Size, SIZES_MAP, Trigger, TRIGGER_MAP } from './constants';
import styles from './styles.module.scss';

export type QuestionTooltipProps = Omit<TooltipProps, 'children' | 'triggerClassName' | 'trigger'> & {
  /** Условие отображения подсказки */
  trigger?: Trigger;
  /** Размер */
  size?: Size;
  /** CSS-класс контейнера подсказки */
  tooltipClassname?: string;
};

export function QuestionTooltip({
  size = Size.Xs,
  trigger = Trigger.Hover,
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
      trigger={TRIGGER_MAP[trigger]}
    >
      {({ getReferenceProps, ref }) => (
        <span
          {...getReferenceProps()}
          ref={ref}
          data-size={size}
          data-opened={tooltipOpened}
          data-trigger={trigger}
          className={cn(styles.questionTooltip, className)}
          role='button'
          tabIndex={0}
        >
          <QuestionSVG size={SIZES_MAP[size]} />
        </span>
      )}
    </Tooltip>
  );
}

QuestionTooltip.sizes = Size;
QuestionTooltip.triggers = Trigger;
QuestionTooltip.placements = Tooltip.placements;
