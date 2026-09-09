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
  toggleOn?: 'item' | 'expandIcon';
};
export const CollapseContext = createContext<CollapseContextType>({});
export const useCollapseContext = () => useContext(CollapseContext);

export type CollapseState = {
  value?: ItemId[];
  onChange?(value?: ItemId[]): void;
  defaultValue?: ItemId[];
  /**
   * Что переключает раскрытие вложенного списка:
   * * `item` - клик по всей строке (по умолчанию),
   * * `expandIcon` - только клик по шеврону.
   */
  toggleOn?: 'item' | 'expandIcon';
};
