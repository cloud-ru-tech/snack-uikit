import { RefObject, useCallback, useContext, useLayoutEffect, useRef } from 'react';

import { DroplistContext } from '../../components/Droplist/DroplistContext';

type UseListFocusProps = {
  position: number;
  ref: RefObject<HTMLButtonElement>;
};

export const useListFocus = ({ position, ref }: UseListFocusProps) => {
  const {
    focusPosition,
    setFocusPosition,
    resetFocusPosition,
    firstElementRefCallback,
    itemKeyDownHandler,
    scrollRefCurrent,
  } = useContext(DroplistContext);

  const prevScrollTop = useRef<number>(0);

  useLayoutEffect(() => {
    if (scrollRefCurrent) {
      if (focusPosition === position) {
        ref.current?.focus();

        const scrollTop = scrollRefCurrent?.scrollTop ?? 0;
        const itemHeight = ref.current?.clientHeight ?? 0;

        if (scrollTop > prevScrollTop.current + itemHeight) {
          ref.current?.scrollIntoView({ block: 'end' });
        }

        if (scrollTop < prevScrollTop.current - itemHeight) {
          ref.current?.scrollIntoView({ block: 'start' });
        }
      }

      prevScrollTop.current = scrollRefCurrent?.scrollTop;
    } else {
      if (focusPosition === position) {
        ref.current?.focus();
      }
    }
  }, [focusPosition, position, prevScrollTop, ref, scrollRefCurrent]);

  const onBlur = useCallback(() => {
    resetFocusPosition();
  }, [resetFocusPosition]);

  const onFocus = useCallback(() => {
    setFocusPosition(position);
  }, [position, setFocusPosition]);

  const tabIndexByFocusPosition = position === focusPosition ? 0 : -1;
  const tabIndexInList = position === 0 ? 0 : -1;
  const tabIndex = focusPosition !== undefined ? tabIndexByFocusPosition : tabIndexInList;

  return { onBlur, onFocus, tabIndex, firstElementRefCallback, onKeyDown: itemKeyDownHandler };
};
