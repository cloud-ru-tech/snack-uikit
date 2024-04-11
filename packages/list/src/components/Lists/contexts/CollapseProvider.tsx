import { createContext, useContext } from 'react';

import { ItemId } from '../../Items';

export type CollapseLevelContextType = {
  level?: number;
};
export const CollapseLevelContext = createContext<CollapseLevelContextType>({});
export const useCollapseLevelContext = () => useContext(CollapseLevelContext);

export type CollapseContextType = {
  openCollapseItems?: ItemId[];
  toggleOpenCollapseItem?(id: ItemId): void;
};
export const CollapseContext = createContext<CollapseContextType>({});
export const useCollapseContext = () => useContext(CollapseContext);

export type CollapseState = {
  value?: ItemId[];
  onChange?(value?: ItemId[]): void;
  defaultValue?: ItemId[];
};
