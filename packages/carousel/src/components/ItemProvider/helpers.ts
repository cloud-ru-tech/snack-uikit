import { MouseEvent, TouchEvent } from 'react';

export function getPageX(e: TouchEvent | MouseEvent): number {
  if (e.nativeEvent instanceof globalThis.MouseEvent) {
    return e.nativeEvent.pageX;
  } else if (e.nativeEvent instanceof globalThis.TouchEvent) {
    return e.nativeEvent.changedTouches[0].pageX;
  }

  return 0;
}
