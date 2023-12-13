import { createContext, KeyboardEvent, RefCallback } from 'react';

import { Size } from '../../types';

type DroplistContextValue = {
  isNested?: boolean;
  focusPosition?: number;
  scrollRefCurrent?: HTMLElement | null;
  setFocusPosition(focusPosition: number): void;
  itemKeyDownHandler(e: KeyboardEvent<HTMLButtonElement>): void;
  resetFocusPosition(): void;
  firstElementRefCallback?: RefCallback<HTMLButtonElement>;
  size?: Size;
};

export const DroplistContext = createContext<DroplistContextValue>({
  isNested: false,
  scrollRefCurrent: null,
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
