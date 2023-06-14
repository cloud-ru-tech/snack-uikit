import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@snack-ui/tooltip';
import { extractSupportProps, useDebounce, WithSupportProps } from '@snack-ui/utils';

import { isEllipsisActive } from '../../helpers';
import styles from './styles.module.scss';

export type TruncateStringEndProps = WithSupportProps<{
  className?: string;
  hideTooltip?: boolean;
  maxLines?: number;
  placement?: TooltipProps['placement'];
  text: string;
}>;

export function TruncateStringEnd({
  text,
  className,
  hideTooltip,
  maxLines = 1,
  placement,
  ...rest
}: TruncateStringEndProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const textElementRef = useRef<HTMLElement | null>(null);

  const toggleShowTooltip = useDebounce(() => {
    setShowTooltip(isEllipsisActive(textElementRef.current));
  }, 50);

  useEffect(() => {
    const observer = new ResizeObserver(toggleShowTooltip);

    if (textElementRef.current) {
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, hideTooltip, toggleShowTooltip]);

  const textElement = (
    <span
      ref={textElementRef}
      className={cn(maxLines > 1 ? styles.text2AndMoreLines : styles.text1Line, className)}
      style={{ '--max-lines': maxLines }}
      {...extractSupportProps(rest)}
    >
      {text}
    </span>
  );

  if (showTooltip && !hideTooltip) {
    return (
      <Tooltip tip={text} placement={placement} hoverDelayOpen={500} triggerClassName={styles.tooltipTrigger}>
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
}
