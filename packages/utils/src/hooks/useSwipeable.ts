import { useRef } from 'react';
import {
  SwipeableHandlers,
  SwipeableProps,
  SwipeCallback,
  SwipeDirections,
  SwipeEventData,
  useSwipeable as useSwipeableInternal,
} from 'react-swipeable';

export const DATA_SWIPE_DIRECTIONS_ATTRIBUTE = 'data-swipe-directions';

export type UseSwipeProps = SwipeableProps & {
  enabled?: boolean;
  availableDirections?: SwipeDirections[];
};

export type UseSwipeReturnType = SwipeableHandlers & {
  [DATA_SWIPE_DIRECTIONS_ATTRIBUTE]?: string;
};

export function useSwipeable({ availableDirections, enabled = true, ...options }: UseSwipeProps): UseSwipeReturnType {
  const canSwipe = useRef(true);

  const onSwipeStart: SwipeCallback = eventData => {
    if (availableDirections) {
      if (!availableDirections.includes(eventData.dir)) {
        canSwipe.current = false;
        return;
      }

      if (!options.onSwipeStart) {
        return;
      }

      eventData.event.stopPropagation();
    }

    options.onSwipeStart?.(eventData);
  };

  const onSwiping: SwipeCallback = eventData => {
    if (availableDirections) {
      if (!canSwipe.current) {
        return;
      }

      eventData.event.stopPropagation();
    }

    options.onSwiping?.(eventData);
  };

  const onSwiped: SwipeCallback = eventData => {
    if (availableDirections) {
      if (!canSwipe.current) {
        canSwipe.current = true;
        return;
      }

      eventData.event.stopPropagation();
    }

    options.onSwiped?.(eventData);
  };

  const handlers = useSwipeableInternal(enabled ? { ...options, onSwipeStart, onSwiping, onSwiped } : {});

  return {
    ...handlers,
    [DATA_SWIPE_DIRECTIONS_ATTRIBUTE]: enabled && availableDirections ? availableDirections.join(' ') : undefined,
  };
}

export type { SwipeCallback, SwipeDirections, SwipeEventData };
