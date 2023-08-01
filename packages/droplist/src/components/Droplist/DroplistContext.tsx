import { createContext, KeyboardEvent, RefCallback } from 'react';

import { Size } from '../../constants';

type DroplistContextValue = {
  isNested?: boolean;
  focusPosition?: number;
  setFocusPosition(focusPosition: number): void;
  itemKeyDownHandler(e: KeyboardEvent<HTMLButtonElement>): void;
  resetFocusPosition(): void;
  firstElementRefCallback?: RefCallback<HTMLButtonElement>;
  size?: Size;
};

export const DroplistContext = createContext<DroplistContextValue>({
  isNested: false,
  itemKeyDownHandler() {
    /* stub */
  },
  setFocusPosition() {
    /* stub */
  },
  resetFocusPosition() {
    /* stub */
  },
});
