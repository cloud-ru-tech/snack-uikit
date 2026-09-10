import { DragEventHandler, useCallback, useRef, useState } from 'react';

type useDragResult = {
  events: Record<'onDragLeave' | 'onDragOver' | 'onDrop', DragEventHandler<HTMLElement>>;
  isOver: boolean;
};

export function useDrag(disabled: boolean): useDragResult {
  const [isOver, setIsOver] = useState(false);

  const dragCounter = useRef(0);

  const handleDragEnter = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (disabled) return;

      e.preventDefault();

      dragCounter.current += 1;

      if (dragCounter.current === 1) {
        setIsOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (disabled) return;
      e.preventDefault();

      dragCounter.current -= 1;

      if (dragCounter.current === 0) {
        setIsOver(false);
      }
    },
    [disabled],
  );

  const handleDragOver = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (disabled) return;

      e.preventDefault();
    },
    [disabled],
  );

  const handleDrop = useCallback<DragEventHandler<HTMLElement>>(
    e => {
      if (disabled) return;

      e.preventDefault();

      dragCounter.current = 0;

      setIsOver(false);
    },
    [disabled],
  );

  const events = {
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  return { events, isOver };
}
