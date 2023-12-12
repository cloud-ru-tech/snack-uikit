import { MouseEvent, ReactElement, TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../testIds';
import { getPageX } from './helpers';
import { useWindowWidthChange } from './hooks';
import styles from './styles.module.scss';

export type ItemProviderProps = {
  items: ReactElement[];
  showItems: number;
  scrollBy: number;
  slideCallback(direction: number): void;
  transition: number;
  swipe: boolean;
  page: number;
  gap?: string;
};

export function ItemProvider({
  items,
  showItems,
  scrollBy,
  slideCallback,
  transition,
  swipe,
  page,
  gap,
}: ItemProviderProps) {
  const [computedValues, setComputedValues] = useState({
    itemWidth: 200,
    gap: 0,
  });

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        const styles = getComputedStyle(node);

        const gap = Number.parseFloat(styles.getPropertyValue('--gap'));
        const paddingLeft = Number.parseFloat(styles.getPropertyValue('padding-left'));
        const paddingRight = Number.parseFloat(styles.getPropertyValue('padding-right'));

        const itemWidth =
          (node.getBoundingClientRect().width - (Math.trunc(showItems) - 1) * gap - paddingLeft - paddingRight) /
          showItems;
        setComputedValues({ itemWidth, gap });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [computedValues.itemWidth, showItems],
  );

  const itemsTrackerRef = useRef<HTMLDivElement>(null);

  function hideNonVisibleItems() {
    itemsTrackerRef.current?.querySelectorAll(`[data-test-id=${TEST_IDS.trackItem}]`).forEach(function (slide) {
      slide.setAttribute('aria-hidden', '0');

      slide.querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function (focusableElement) {
        focusableElement.setAttribute('tabindex', '-5');
        focusableElement.classList.add(styles.hiddenItem);
      });
    });
  }

  function showVisibleItems(slide: number, page: number, show: number) {
    itemsTrackerRef.current?.querySelectorAll(`[data-test-id=${TEST_IDS.trackItem}]`).forEach((item, i) => {
      if (i >= page * slide && i < page * slide + Math.trunc(show)) {
        item.removeAttribute('aria-hidden');
        item
          .querySelectorAll('a, button, select, input, textarea, [tabindex="-5"]')
          .forEach(function (focusableElement) {
            focusableElement.setAttribute('tabindex', '0');
            focusableElement.classList.remove(styles.hiddenItem);
          });
      }
    });
  }

  const transform = useMemo(
    () => Number(-(page * scrollBy * computedValues.itemWidth + computedValues.gap * page * scrollBy)),
    [computedValues.gap, computedValues.itemWidth, page, scrollBy],
  );

  useEffect(() => {
    hideNonVisibleItems();
    showVisibleItems(scrollBy, page, showItems);
  }, [page, scrollBy, showItems]);

  useWindowWidthChange((change: number) => {
    setComputedValues(computedValues => ({ ...computedValues, itemWidth: computedValues.itemWidth - change }));
  });

  const [drag, setDrag] = useState({
    initial: transform,
    start: 0,
    isDown: false,
    drag: 0,
    finished: true,
    pointers: true,
  });

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    e.persist();
    setDrag({
      ...drag,
      isDown: true,
      start: getPageX(e),
      initial: transform,
      finished: false,
    });
  };

  const handleDragFinish = (e: MouseEvent | TouchEvent) => {
    e.persist();
    if (drag.finished) {
      return;
    }
    if (Math.abs(drag.drag) < computedValues.itemWidth / 2) {
      return setDrag({
        initial: transform,
        start: 0,
        isDown: false,
        drag: 0,
        finished: true,
        pointers: true,
      });
    }

    slideCallback(drag.drag > 0 ? -1 : 1);
    setDrag({ ...drag, drag: 0, isDown: false, finished: true, pointers: true });
    return;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    e.persist();

    if (!drag.isDown) {
      return;
    }

    const pos = getPageX(e);

    setDrag({
      ...drag,
      drag: drag.start - pos,
      pointers: Math.abs(drag.start - pos) < Number.MIN_SAFE_INTEGER,
    });
  };

  const swipeProps = swipe
    ? {
        onTouchCancel: handleDragFinish,
        onTouchEnd: handleDragFinish,
        onTouchMove: handleDragMove,
        onTouchStart: handleDragStart,
        onMouseDown: handleDragStart,
        onMouseLeave: handleDragFinish,
        onMouseUp: handleDragFinish,
        onMouseMove: handleDragMove,
      }
    : {};

  return (
    <div
      ref={ref}
      className={styles.itemProvider}
      data-pointers={!drag.pointers || undefined}
      data-swipe={swipe || undefined}
      style={{
        ...(Boolean(gap) ? { '--gap': gap } : {}),
      }}
    >
      <div
        {...swipeProps}
        className={styles.itemTracker}
        data-test-id={TEST_IDS.trackLine}
        style={{
          transform: `translateX(${transform - drag.drag}px)`,
          transition: `transform ${transition}s ease 0s`,
        }}
        ref={itemsTrackerRef}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{ width: computedValues.itemWidth }}
            className={styles.itemContainer}
            role='group'
            data-test-id={TEST_IDS.trackItem}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
