import { Children, ReactElement, RefObject, useMemo, useState } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

import { Direction } from '../../types';

type OverflowState = {
  [key in Direction]: boolean;
};

type ScrollContainerControl = {
  hasOverflow: OverflowState;
  scrollLeft: () => void;
  scrollRight: () => void;
  scrollTop: () => void;
  scrollBottom: () => void;
};

const defaultOverflowState: OverflowState = {
  top: false,
  bottom: false,
  left: false,
  right: false,
};

export function useScrollContainer(container: RefObject<HTMLElement>): ScrollContainerControl {
  const [hasOverflow, setHasOverflow] = useState<OverflowState>(defaultOverflowState);

  useLayoutEffect(() => {
    const recheck = () => {
      const element = container.current;

      if (!element) {
        return;
      }

      const left = element.scrollLeft > 0;
      const right = element.scrollLeft + element.offsetWidth <= element.scrollWidth - 2;
      const top = element.scrollTop > 0;
      const bottom = element.scrollTop + element.offsetHeight <= element.scrollHeight - 2;

      setHasOverflow(prevState => {
        if (
          prevState.left !== left ||
          prevState.right !== right ||
          prevState.top !== top ||
          prevState.bottom !== bottom
        ) {
          return { left, right, top, bottom };
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

  const [scrollLeft, scrollRight, scrollTop, scrollBottom] = useMemo(() => {
    function scroll(direction: Direction) {
      const containerElement = container.current;

      if (!containerElement) {
        return;
      }

      const scrollHorizontalSize = containerElement.offsetWidth / 2;
      const scrollVerticalSize = containerElement.offsetHeight / 2;

      if (['top', 'bottom'].includes(direction)) {
        containerElement.scroll({
          top:
            direction === 'top'
              ? containerElement.scrollTop - scrollVerticalSize
              : containerElement.scrollTop + scrollVerticalSize,
          behavior: 'smooth',
        });
        return;
      }

      containerElement.scroll({
        left:
          direction === 'left'
            ? containerElement.scrollLeft - scrollHorizontalSize
            : containerElement.scrollLeft + scrollHorizontalSize,
        behavior: 'smooth',
      });
    }

    return [() => scroll('left'), () => scroll('right'), () => scroll('top'), () => scroll('bottom')];
  }, [container]);

  return { hasOverflow, scrollLeft, scrollRight, scrollTop, scrollBottom };
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
