import cn from 'classnames';
import throttle from 'lodash.throttle';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { extractSupportProps, useLayoutEffect, WithSupportProps } from '@snack-uikit/utils';

import { isEllipsisActive } from '../../helpers';
import styles from './styles.module.scss';

export type TruncateStringEndProps = WithSupportProps<{
  className?: string;
  /** Стиль для тултипа */
  tooltipClassName?: string;
  /** Скрывать ли тултип с полным текстом */
  hideTooltip?: boolean;
  /** Максимальное кол-во строк, до которого может сворачиваться текст. */
  maxLines?: number;
  /** Положение тултипа относительно обрезанного текста. */
  placement?: TooltipProps['placement'];
  /** Текст, который будет обрезаться */
  text: string;
  /** Условие отображения тултипа */
  trigger?: TooltipProps['trigger'];
}>;

export function TruncateStringEnd({
  text,
  className,
  tooltipClassName,
  hideTooltip,
  maxLines = 1,
  placement,
  trigger,
  ...rest
}: TruncateStringEndProps) {
  const textElementRef = useRef<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleShowTooltip = useCallback(() => {
    setShowTooltip(isEllipsisActive(textElementRef.current));
  }, []);

  useLayoutEffect(() => {
    if (textElementRef.current) {
      toggleShowTooltip();
    }
  }, [text, toggleShowTooltip]);

  useEffect(() => {
    const throttledToggleShowTooltip = throttle(() => {
      toggleShowTooltip();
    }, 50);

    const observer = new ResizeObserver(throttledToggleShowTooltip);

    if (textElementRef.current) {
      toggleShowTooltip();
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, hideTooltip, toggleShowTooltip]);

  const textElement = (
    <span
      ref={textElementRef}
      className={cn(maxLines > 1 ? styles.text2AndMoreLines : styles.text1Line, className, {
        [styles.ellipsis]: !textElementRef.current || showTooltip,
      })}
      style={{ '--max-lines': maxLines }}
      {...extractSupportProps(rest)}
    >
      {text}
    </span>
  );

  if (showTooltip && !hideTooltip) {
    return (
      <Tooltip
        tip={text}
        placement={placement}
        hoverDelayOpen={500}
        className={tooltipClassName}
        triggerClassName={styles.tooltipTrigger}
        trigger={trigger}
      >
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
}
