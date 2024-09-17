import { Children, ReactElement, RefObject, useMemo, useState } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

type OverflowState = {
  left: boolean;
  right: boolean;
};

type ScrollContainerControl = {
  hasOverflow: OverflowState;
  scrollLeft: () => void;
  scrollRight: () => void;
};

export function useScrollContainer(container: RefObject<HTMLElement>): ScrollContainerControl {
  const [hasOverflow, setHasOverflow] = useState<OverflowState>({ left: false, right: false });

  useLayoutEffect(() => {
    const recheck = () => {
      const element = container.current;

      if (!element) {
        return;
      }

      const left = element.scrollLeft > 0;
      const right = element.scrollLeft + element.offsetWidth <= element.scrollWidth - 2;

      setHasOverflow(prevState => {
        if (prevState.left !== left || prevState.right !== right) {
          return { left, right };
        }
        return prevState;
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (container?.current) {
        container.current.scrollLeft = container.current.scrollLeft + e.deltaY;
      }
    };

    const element = container.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(recheck);
    resizeObserver.observe(element);
    element.addEventListener('scroll', recheck);
    element.addEventListener('wheel', onWheel);

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', recheck);
      element.removeEventListener('wheel', onWheel);
    };
  }, [container]);

  const [scrollLeft, scrollRight] = useMemo(() => {
    function scroll(direction: 'left' | 'right') {
      const containerElement = container.current;

      if (!containerElement) {
        return;
      }

      const scrollSize = containerElement.offsetWidth / 2;
      containerElement.scroll({
        left:
          direction === 'left' ? containerElement.scrollLeft - scrollSize : containerElement.scrollLeft + scrollSize,
        behavior: 'smooth',
      });
    }

    return [() => scroll('left'), () => scroll('right')];
  }, [container]);

  return { hasOverflow, scrollLeft, scrollRight };
}

export function useFocusControl(children: ReactElement<{ value: string; disabled?: boolean }>[]) {
  return useMemo(() => {
    const arrayOfIds = Children.map(children, ({ props: { value, disabled } }) => !disabled && value).filter(Boolean);

    const getterElementWithShift = (shift: number) => (id?: string) => {
      if (id) {
        const position = arrayOfIds.indexOf(id);
        return position > -1 ? arrayOfIds[position + shift] : undefined;
      }
    };

    return [getterElementWithShift(-1), getterElementWithShift(+1)];
  }, [children]);
}
