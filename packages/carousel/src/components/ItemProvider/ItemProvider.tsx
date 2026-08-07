import { debounce } from 'lodash';
import mergeRefs from 'merge-refs';
import { MouseEventHandler, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SwipeCallback, useLayoutEffect, useSwipeable } from '@snack-uikit/utils';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type ItemProviderProps = {
  items: ReactElement[];
  showItems: number;
  scrollBy: number;
  slideCallback(direction: number): void;
  transition: number;
  swipe: boolean;
  swipeActivateLength: number;
  page: number;
  gap?: string;
};

function parseCssLength(value: string): number {
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function ItemProvider({
  items,
  showItems,
  scrollBy,
  slideCallback,
  transition,
  swipe,
  swipeActivateLength,
  page,
  gap,
}: ItemProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsTrackerRef = useRef<HTMLDivElement>(null);

  const [computedValues, setComputedValues] = useState({
    itemWidth: 0,
    gap: 0,
  });

  const recalculateItemsSize = useCallback(() => {
    const containerElement = containerRef.current;
    const trackerElement = itemsTrackerRef.current;

    if (!containerElement || !trackerElement) {
      return;
    }

    const containerStyles = getComputedStyle(containerElement);
    const trackerStyles = getComputedStyle(trackerElement);

    const gapValue = gap ? parseCssLength(gap) : parseCssLength(trackerStyles.columnGap || trackerStyles.gap);
    const paddingLeft = parseCssLength(containerStyles.paddingLeft);
    const paddingRight = parseCssLength(containerStyles.paddingRight);

    const gapsCount = Math.max(Math.trunc(showItems) - 1, 0);
    const contentWidth = containerElement.getBoundingClientRect().width - paddingLeft - paddingRight;
    const itemWidth = (contentWidth - gapsCount * gapValue) / showItems;

    setComputedValues({ itemWidth, gap: gapValue });
  }, [showItems, gap]);

  useLayoutEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    recalculateItemsSize();

    const observer = new ResizeObserver(debounce(recalculateItemsSize, 100));
    observer.observe(node);
    return () => observer.disconnect();
  }, [recalculateItemsSize]);

  const hideNonVisibleItems = () => {
    itemsTrackerRef.current?.querySelectorAll(`[data-test-id=${TEST_IDS.trackItem}]`).forEach(slide => {
      slide.setAttribute('aria-hidden', '0');

      slide.querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(focusableElement => {
        focusableElement.setAttribute('tabindex', '-5');
        focusableElement.classList.add(styles.hiddenItem);
      });
    });
  };

  const showVisibleItems = (slide: number, page: number, show: number) => {
    itemsTrackerRef.current?.querySelectorAll(`[data-test-id=${TEST_IDS.trackItem}]`).forEach((item, i) => {
      if (i >= page * slide && i < page * slide + Math.trunc(show)) {
        item.removeAttribute('aria-hidden');
        item.querySelectorAll('a, button, select, input, textarea, [tabindex="-5"]').forEach(focusableElement => {
          focusableElement.setAttribute('tabindex', '0');
          focusableElement.classList.remove(styles.hiddenItem);
        });
      }
    });
  };

  const transform = useMemo(
    () => Number(-(page * scrollBy * computedValues.itemWidth + computedValues.gap * page * scrollBy)),
    [computedValues.gap, computedValues.itemWidth, page, scrollBy],
  );

  useEffect(() => {
    hideNonVisibleItems();
    showVisibleItems(scrollBy, page, showItems);
  }, [page, scrollBy, showItems]);

  const handleSlideClick: MouseEventHandler = useCallback(
    e => {
      if (showItems === 1) {
        return;
      }

      const slideRect = e.currentTarget.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      const containerViewport = containerRect?.right ?? 0;
      const slidePositionDelta = containerViewport - slideRect.right;
      const minPos = Math.min(slidePositionDelta, slideRect.x);

      if (minPos < 0) {
        slideCallback(slidePositionDelta);
      }
    },
    [showItems, slideCallback],
  );

  const itemWidth = useMemo(() => {
    if (computedValues.itemWidth > 0) {
      return computedValues.itemWidth;
    }

    const fallbackWidth = Math.floor(100 / showItems);
    return `${fallbackWidth}%`;
  }, [computedValues.itemWidth, showItems]);

  const [drag, setDrag] = useState({ drag: 0, pointers: true });

  const handleSwiping: SwipeCallback = eventData => {
    setDrag({ drag: eventData.deltaX, pointers: Math.abs(eventData.deltaX) < Number.MIN_SAFE_INTEGER });
  };

  const handleSwiped: SwipeCallback = eventData => {
    if (Math.abs(drag.drag) < swipeActivateLength) {
      return setDrag({ drag: 0, pointers: true });
    }

    slideCallback(eventData.dir === 'Left' ? -1 : 1);
    setDrag({ drag: 0, pointers: true });
    return;
  };

  const { ref, ...swipeProps } = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped,
    trackMouse: true,
    enabled: swipe,
    availableDirections: ['Left', 'Right'],
  });

  return (
    <div
      ref={containerRef}
      className={styles.itemProvider}
      data-pointers={!drag.pointers || undefined}
      data-swipe={swipe || undefined}
      data-gap={gap}
      style={{
        ...(gap ? { '--gap': gap } : {}),
      }}
    >
      <div
        {...swipeProps}
        className={styles.itemTracker}
        data-test-id={TEST_IDS.trackLine}
        style={{
          transform: `translateX(${transform + drag.drag}px)`,
          transition: `transform ${transition}s ease 0s`,
        }}
        ref={mergeRefs(ref as (element: HTMLDivElement) => void, itemsTrackerRef)}
      >
        {items.map((item, i) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div
            key={i}
            style={{ width: itemWidth }}
            className={styles.itemContainer}
            role='group'
            data-test-id={TEST_IDS.trackItem}
            onClick={handleSlideClick}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
