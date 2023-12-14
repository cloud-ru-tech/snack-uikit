import { createContext, useContext } from 'react';

import { SIZE } from './constants';
import { Size } from './types';

export const PaginationContext = createContext<{ size: Size }>({ size: SIZE.S });

export const usePaginationContext = () => useContext(PaginationContext);
