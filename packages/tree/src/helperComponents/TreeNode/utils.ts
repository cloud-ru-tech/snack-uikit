import { MouseEvent } from 'react';

export function stopPropagationClick(e: MouseEvent<HTMLInputElement>) {
  e.stopPropagation();
}
