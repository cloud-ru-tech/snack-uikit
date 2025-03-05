import { ReactEventHandler } from 'react';

export const stopPropagation: ReactEventHandler = e => {
  e.stopPropagation();
};
