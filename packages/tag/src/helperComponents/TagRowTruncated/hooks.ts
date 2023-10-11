import { useEffect, useState } from 'react';

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
