import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

function getSize(el: HTMLElement | null) {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

export function useComponentSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState(getSize(ref.current));

  const handleResize = useCallback(() => {
    if (ref.current) {
      setSize(getSize(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize, ref]);

  return size;
}
