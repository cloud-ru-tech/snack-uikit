import { createContext, useContext } from 'react';

import { TabBarContextValue, TabsContextValue } from './types';

export const TabsContext = createContext<TabsContextValue>({
  setSelectedTab: function () {},
});

export const useTabsContext = () => useContext(TabsContext);

export const TabBarContext = createContext<TabBarContextValue>({});

export const useTabBarContext = () => useContext(TabBarContext);
