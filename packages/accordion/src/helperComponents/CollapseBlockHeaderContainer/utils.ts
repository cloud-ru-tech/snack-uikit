import { MouseEvent } from 'react';

export const stopPropagationClick = (e: MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};
