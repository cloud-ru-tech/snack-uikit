import { PropsWithChildren } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TabsContext } from '../../context';
import { Tab } from '../Tab';
import { TabBar } from '../TabBar';
import { TabContent } from '../TabContent';

export type TabsProps = PropsWithChildren<{
  selectedTab?: string;
  defaultSelectedTab?: string;
  onChange?: (id: string) => void;
}>;

export function Tabs({ children, onChange, selectedTab: selectedTabProp, defaultSelectedTab }: TabsProps) {
  const [selectedTab, setSelectedTab] = useUncontrolledProp<string | undefined>(
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
