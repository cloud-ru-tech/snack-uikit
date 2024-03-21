import cn from 'classnames';
import trottle from 'lodash.throttle';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

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

  useEffect(() => {
    const setTruncate = trottle(() => {
      setTruncatedString(
        truncateStringMiddle({
          element: textElementRef.current,
          truncatedElement: truncatedTextElementRef.current,
          text,
        }),
      );
      setShowTooltip(isEllipsisActive(textElementRef.current));
    }, 50);

    const observer = new ResizeObserver(setTruncate);

    if (textElementRef.current) {
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, text, hideTooltip]);

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
        <Tooltip tip={text} placement={placement} hoverDelayOpen={500} triggerClassName={styles.textContainer}>
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </span>
  );
}
