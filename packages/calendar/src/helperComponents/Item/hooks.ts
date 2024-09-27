import { KeyboardEvent, KeyboardEventHandler, useCallback, useContext } from 'react';

import { GRID_SIZE } from '../../constants';
import { CalendarContext } from '../CalendarContext';
import { stringifyAddress } from './utils';

export function useKeyboardFocus([row, column]: [number, number], onKeyDown?: KeyboardEventHandler) {
  const { viewMode, viewShift, setViewShift, setFocus, onFocusLeave } = useContext(CalendarContext);

  const { rows, columns } = GRID_SIZE[viewMode];

  return useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);

      switch (e.key) {
        case 'ArrowLeft':
          if (column) {
            setFocus(stringifyAddress([row, column - 1]));
          }
          return;
        case 'ArrowRight':
          if (column < columns - 1) {
            setFocus(stringifyAddress([row, column + 1]));
          }
          return;
        case 'ArrowUp':
          if (row) {
            setFocus(stringifyAddress([row - 1, column]));
          } else {
            setViewShift(viewShift - 1);
            setFocus(stringifyAddress([rows - 1, column]));
          }
          return;
        case 'ArrowDown':
          if (row < rows - 1) {
            setFocus(stringifyAddress([row + 1, column]));
          } else {
            setViewShift(viewShift + 1);
            setFocus(stringifyAddress([0, column]));
          }
          return;
        case 'Tab':
          if (!e.shiftKey) {
            onFocusLeave?.('next');
          }
          return;
        default:
        // do nothing
      }
    },
    [column, columns, onFocusLeave, onKeyDown, row, rows, setFocus, setViewShift, viewShift],
  );
}
