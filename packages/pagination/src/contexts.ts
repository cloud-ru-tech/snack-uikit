import { createContext, useContext } from 'react';

import { SIZE, VARIANT } from './constants';
import { Size, Variant } from './types';

export const PaginationContext = createContext<{ size: Size; variant: Variant }>({
  size: SIZE.S,
  variant: VARIANT.Button,
});

export const usePaginationContext = () => useContext(PaginationContext);
