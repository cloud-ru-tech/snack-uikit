import { createContext } from 'react';

import { SEPARATOR, Size } from './constants';

type BreadcrumbsContextValue = {
  hidden: boolean;
  size: Size;
  separator: string;
  testId?: string;
};

export const BreadcrumbsContext = createContext<BreadcrumbsContextValue>({
  hidden: false,
  size: Size.S,
  separator: SEPARATOR,
});
