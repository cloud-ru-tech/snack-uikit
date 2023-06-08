import { createContext } from 'react';

import { TabBarContextValue, TabsContextValue } from './types';

export const TabsContext = createContext<TabsContextValue>({
  setSelectedTab: function () {},
});

export const TabBarContext = createContext<TabBarContextValue>({});
