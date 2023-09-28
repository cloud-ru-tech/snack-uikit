import { RefObject } from 'react';

export const getGapWidth = (elementRef: RefObject<HTMLDivElement>): number => {
  const cssValue = elementRef.current ? getComputedStyle(elementRef.current, null).getPropertyValue('gap') : '0px';

  return parseInt(cssValue);
};
