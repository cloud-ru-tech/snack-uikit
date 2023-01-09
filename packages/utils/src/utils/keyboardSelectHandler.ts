import { KeyboardEvent } from 'react';

export function keyboardSelectHandler<T>(callback: (event?: KeyboardEvent<T>) => void) {
  return (event: KeyboardEvent<T>) => {
    if (!['Enter', 'Space'].includes(event.code)) return;
    callback(event);
  };
}
