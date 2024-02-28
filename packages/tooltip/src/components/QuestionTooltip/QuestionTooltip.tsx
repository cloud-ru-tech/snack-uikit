import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import { QuestionSVG } from '@snack-uikit/icons';

import { Tooltip, TooltipProps } from '../Tooltip';
import { SIZE, SIZES_MAP, TRIGGER, TRIGGER_MAP } from './constants';
import styles from './styles.module.scss';
import { Size, Trigger } from './types';

export type QuestionTooltipProps = Omit<TooltipProps, 'children' | 'triggerClassName' | 'trigger'> & {
  /** Условие отображения подсказки */
  trigger?: Trigger;
  /** Размер */
  size?: Size;
  /** CSS-класс контейнера подсказки */
  tooltipClassname?: string;
  /** data-test-id для триггера */
  triggerDataTestId?: string;

  tabIndex?: number;
};

export function QuestionTooltip({
  size = SIZE.Xs,
  trigger = TRIGGER.Hover,
  tooltipClassname,
  className,
  triggerDataTestId,
  open,
  onOpenChange,
  tabIndex = 0,
  ...rest
}: QuestionTooltipProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
  return (
    <Tooltip
      {...rest}
      className={tooltipClassname}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={TRIGGER_MAP[trigger]}
    >
      {({ getReferenceProps, ref }) => (
        <span
          {...getReferenceProps()}
          ref={ref}
          data-size={size}
          data-opened={isOpen}
          data-trigger={trigger}
          className={cn(styles.questionTooltip, className)}
          role='button'
          tabIndex={tabIndex}
        >
          <QuestionSVG size={SIZES_MAP[size]} data-test-id={triggerDataTestId} />
        </span>
      )}
    </Tooltip>
  );
}
