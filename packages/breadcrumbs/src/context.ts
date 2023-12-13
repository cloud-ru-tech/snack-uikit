import { createContext } from 'react';

import { SEPARATOR, SIZE } from './constants';
import { Size } from './types';

type BreadcrumbsContextValue = {
  hidden: boolean;
  size: Size;
  separator: string;
  testId?: string;
};

export const BreadcrumbsContext = createContext<BreadcrumbsContextValue>({
  hidden: false,
  size: SIZE.S,
  separator: SEPARATOR,
});
