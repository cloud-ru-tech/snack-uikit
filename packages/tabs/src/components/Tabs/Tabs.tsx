import { PropsWithChildren } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TabsContext } from '../../context';
import { Tab } from '../Tab';
import { TabBar } from '../TabBar';
import { TabContent } from '../TabContent';

export type TabsProps<T extends string = string> = PropsWithChildren<{
  selectedTab?: T;
  defaultSelectedTab?: T;
  onChange?: (id: T) => void;
}>;

export function Tabs<T extends string = string>({
  children,
  onChange,
  selectedTab: selectedTabProp,
  defaultSelectedTab,
}: TabsProps<T>) {
  const [selectedTab, setSelectedTab] = useUncontrolledProp<T | undefined>(
    selectedTabProp,
    defaultSelectedTab,
    onChange,
  );

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
Tabs.TabBar = TabBar;
Tabs.TabContent = TabContent;
