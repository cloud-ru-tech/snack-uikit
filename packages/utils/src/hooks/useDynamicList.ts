import { RefObject, useEffect, useRef, useState } from 'react';

import { useEventHandler } from './useEventHandler';
import { useLayoutEffect } from './useIsomorphicLayoutEffect';

type UseDynamicListProps<T extends object> = {
  items: T[];
  resizingContainerRef?: RefObject<HTMLDivElement>;
  parentContainerRef: RefObject<HTMLDivElement>;
  maxVisibleItems?: number;
};

type UseDynamicListReturnType<T extends object> = {
  visibleItems: T[];
  hiddenItems: T[];
};

/**
 * Хук позволяет распределять элементы списка на две группы: видимые и невидимые,
 * в зависимости от ширины контейнера
 * @function React hook
 */
export function useDynamicList<T extends object>({
  parentContainerRef,
  resizingContainerRef = parentContainerRef,
  items,
  maxVisibleItems = Infinity,
}: UseDynamicListProps<T>): UseDynamicListReturnType<T> {
  const adjustAmount = (value: number) => Math.min(maxVisibleItems, value);

  const [visibleItemsAmount, setVisibleItemsAmount] = useState<number>(adjustAmount(items.length));
  const [width, setWidth] = useState(Infinity);
  const widthRef = useRef(width);

  const handleVisibleItemsAmount: typeof setVisibleItemsAmount = param => {
    if (typeof param === 'number') {
      setVisibleItemsAmount(adjustAmount(param));
    } else {
      setVisibleItemsAmount(v => param(adjustAmount(v)));
    }
  };

  const tryHidingItem = useEventHandler(() => {
    const container = parentContainerRef.current;

    if (container && container.scrollWidth - container.offsetWidth > 0) {
      const itemToHide = items[visibleItemsAmount - 1];

      if (itemToHide) {
        handleVisibleItemsAmount(value => value - 1);
      }
    }
  });

  const tryShowingItem = useEventHandler(() => {
    const itemToShow = items[visibleItemsAmount];

    if (itemToShow) {
      handleVisibleItemsAmount(value => value + 1);
    }
  });

  const toggleItemWidth = useEventHandler(
    ({ changedWidth, initialWidth }: { changedWidth: number; initialWidth: number }) => {
      if (changedWidth > initialWidth) {
        //try to add extra item
        if (visibleItemsAmount < maxVisibleItems) {
          tryShowingItem();
        }
      } else if (changedWidth < initialWidth) {
        // check if item should be hidden
        tryHidingItem();
      }
    },
  );

  useEffect(() => {
    const listener = () => {
      tryHidingItem();

      if (parentContainerRef.current) {
        setWidth(parentContainerRef.current.scrollWidth);
      }
    };

    document.fonts.addEventListener('loadingdone', listener);
    return () => document.fonts.removeEventListener('loadingdone', listener);
  }, [parentContainerRef, tryHidingItem]);

  useEffect(() => {
    const container = resizingContainerRef.current;

    if (container) {
      const observer = new ResizeObserver(entities =>
        entities.forEach(entity => {
          if (entity.target === container) {
            const [{ inlineSize: newWidth }] = entity.contentBoxSize;
            setWidth(Math.floor(newWidth));
          }
        }),
      );

      observer.observe(container);

      return () => observer.disconnect();
    }
  }, [resizingContainerRef]);

  useLayoutEffect(() => {
    if (parentContainerRef.current) {
      toggleItemWidth({
        initialWidth: parentContainerRef.current.scrollWidth,
        changedWidth: widthRef.current,
      });
    }
  }, [items, parentContainerRef, toggleItemWidth]);

  useLayoutEffect(() => {
    toggleItemWidth({
      initialWidth: widthRef.current,
      changedWidth: width,
    });

    widthRef.current = width;
  }, [width, toggleItemWidth]);

  useLayoutEffect(() => {
    tryHidingItem();
  }, [tryHidingItem, visibleItemsAmount]);

  return {
    visibleItems: items.slice(0, visibleItemsAmount),
    hiddenItems: items.slice(visibleItemsAmount),
  };
}
