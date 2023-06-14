import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@snack-ui/tooltip';
import { extractSupportProps, useDebounce, WithSupportProps } from '@snack-ui/utils';

import { isEllipsisActive, truncateStringMiddle } from '../../helpers';
import styles from './styles.module.scss';

export type TruncateStringMiddleProps = WithSupportProps<{
  className?: string;
  hideTooltip?: boolean;
  placement?: TooltipProps['placement'];
  text: string;
}>;

export function TruncateStringMiddle({ text, className, hideTooltip, placement, ...rest }: TruncateStringMiddleProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [truncatedString, setTruncatedString] = useState(text);
  const textElementRef = useRef<HTMLElement>(null);
  const truncatedTextElementRef = useRef<HTMLElement>(null);

  const toggleTruncateString = useDebounce(() => {
    setTruncatedString(
      truncateStringMiddle({
        text,
        element: textElementRef.current,
        truncatedElement: truncatedTextElementRef.current,
      }),
    );
    setShowTooltip(isEllipsisActive(textElementRef.current));
  }, 50);

  useEffect(() => {
    const observer = new ResizeObserver(toggleTruncateString);

    if (textElementRef.current) {
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, text, hideTooltip, toggleTruncateString]);

  const textElement = (
    <>
      <span ref={textElementRef} className={styles.fullText}>
        {text}
      </span>
      <span ref={truncatedTextElementRef} className={styles.truncatedText} data-test-id='truncated-text'>
        {truncatedString}
      </span>
    </>
  );

  return (
    <span className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      {showTooltip && !hideTooltip ? (
        <Tooltip tip={text} placement={placement} hoverDelayOpen={500}>
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </span>
  );
}
