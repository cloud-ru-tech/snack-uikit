import { createContext, useContext } from 'react';

import { SelectionMode } from './constants';

type ToggleGroupContextType = {
  value: string | undefined | string[];
  onChange: ((id: string) => void) | undefined;
  selectionMode: SelectionMode;
};

export const ToggleGroupContext = createContext<ToggleGroupContextType>({
  value: undefined,
  onChange: undefined,
  selectionMode: SelectionMode.Single,
});

export const useToggleGroupContext = () => useContext(ToggleGroupContext);
