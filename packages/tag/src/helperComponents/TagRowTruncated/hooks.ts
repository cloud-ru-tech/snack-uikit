import { RefObject, useEffect, useState } from 'react';

export const useResizeObserver = (element: HTMLElement | null) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (element.offsetWidth !== width) {
        setWidth(element.offsetWidth);
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [element, width]);

  return { width };
};

export const useGetDropdownOffset = (elementRef: RefObject<HTMLDivElement>) => {
  const [dropdownOffset, setDropdownOffset] = useState<number>(0);

  const rawOffset = elementRef.current ? getComputedStyle(elementRef.current, null).getPropertyValue('top') : undefined;

  useEffect(() => {
    if (!rawOffset) {
      return;
    }

    const num = parseInt(rawOffset);
    if (Number.isNaN(num) || num < 1) {
      return;
    }

    setDropdownOffset(num);
  }, [rawOffset]);

  return dropdownOffset;
};
