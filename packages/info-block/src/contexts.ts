import { createContext, useContext } from 'react';

import { SIZE } from './constants';
import { Size } from './types';

type InfoBlockContextValue = {
  size: Size;
};

export const InfoBlockContext = createContext<InfoBlockContextValue>({
  size: SIZE.S,
});

export function useInfoBlockContext() {
  return useContext(InfoBlockContext);
}
