import { createContext, useContext } from 'react';

import { SELECTION_MODE } from './constants';
import { SelectionMode } from './types';

type ToggleGroupContextType = {
  value: string | undefined | string[];
  onChange: ((id: string) => void) | undefined;
  selectionMode: SelectionMode;
};

export const ToggleGroupContext = createContext<ToggleGroupContextType>({
  value: undefined,
  onChange: undefined,
  selectionMode: SELECTION_MODE.Single,
});

export const useToggleGroupContext = () => useContext(ToggleGroupContext);
