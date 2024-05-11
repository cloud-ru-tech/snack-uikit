import { FocusEvent, MouseEvent } from 'react';

export function stopPropagationClick(e: MouseEvent<HTMLInputElement>) {
  e.stopPropagation();
}

export function stopPropagationFocus(e: FocusEvent<HTMLInputElement>) {
  e.stopPropagation();
}
