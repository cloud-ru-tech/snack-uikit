import { RefObject, useCallback, useContext, useLayoutEffect } from 'react';

import { DroplistContext } from '../../components/Droplist/DroplistContext';

type UseListFocusProps = {
  position: number;
  ref: RefObject<HTMLButtonElement>;
};

export const useListFocus = ({ position, ref }: UseListFocusProps) => {
  const { focusPosition, setFocusPosition, resetFocusPosition, firstElementRefCallback, itemKeyDownHandler } =
    useContext(DroplistContext);

  useLayoutEffect(() => {
    if (focusPosition === position) {
      ref.current?.focus();
    }
  }, [focusPosition, position, ref]);

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
