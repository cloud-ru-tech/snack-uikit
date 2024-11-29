import { createContext } from 'react';

import { CellAutoResizeValue } from './types';

export const CellAutoResizeContext = createContext<CellAutoResizeValue>({
  updateCellMap: () => {},
});
