import debounce from 'lodash.debounce';
import { DragEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

type useDragResult = {
  events: Record<'onDragLeave' | 'onDragOver' | 'onDrop', DragEventHandler<HTMLElement>>;
  isOver: boolean;
};

export function useDrag(disabled: boolean): useDragResult {
  const [isOver, setIsOver] = useState(false);

  const debouncedSetIsOver = useMemo(() => debounce(setIsOver, 5), []);

  const handleDragLeave = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (!disabled) {
        e.preventDefault();
        debouncedSetIsOver(false);
      }
    },
    [debouncedSetIsOver, disabled],
  );

  const handleDragOver = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (!disabled) {
        e.preventDefault();
        debouncedSetIsOver(true);
      }
    },
    [debouncedSetIsOver, disabled],
  );

  const handleDrop = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (!disabled) {
        e.preventDefault();
        debouncedSetIsOver(false);
      }
    },
    [debouncedSetIsOver, disabled],
  );

  useEffect(() => () => debouncedSetIsOver.cancel(), [debouncedSetIsOver]);

  const events = { onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop };

  return { events, isOver };
}
