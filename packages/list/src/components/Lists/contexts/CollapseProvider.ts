import { createContext, useContext } from 'react';

export type CollapseContextType = {
  level?: number;
};

export const CollapseContext = createContext<CollapseContextType>({});

export const useCollapseContext = () => useContext(CollapseContext);
