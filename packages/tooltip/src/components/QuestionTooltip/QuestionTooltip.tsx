import cn from 'classnames';
import { useState } from 'react';

import { QuestionSVG } from '@snack-uikit/icons';

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
  /** data-test-id для триггера */
  triggerDataTestId?: string;
};

export function QuestionTooltip({
  size = Size.Xs,
  trigger = Trigger.Hover,
  tooltipClassname,
  className,
  triggerDataTestId,
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
          <QuestionSVG size={SIZES_MAP[size]} data-test-id={triggerDataTestId} />
        </span>
      )}
    </Tooltip>
  );
}

QuestionTooltip.sizes = Size;
QuestionTooltip.triggers = Trigger;
QuestionTooltip.placements = Tooltip.placements;
