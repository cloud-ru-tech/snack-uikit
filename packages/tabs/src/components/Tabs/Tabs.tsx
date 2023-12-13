import { PropsWithChildren } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TabsContext } from '../../context';
import { Tab as TabComponent } from '../Tab';
import { TabBar as TabBarComponent } from '../TabBar';
import { TabContent as TabContentComponent } from '../TabContent';

export type TabsProps<T extends string = string> = PropsWithChildren<{
  /** Текущая вкладка */
  value?: T;
  /** Выбранная вкладка по-умолчанию */
  defaultValue?: T;
  /** Колбек выбора вкладки */
  onChange?: (id: T) => void;
}>;

export function Tabs<T extends string = string>({ children, onChange, value, defaultValue }: TabsProps<T>) {
  const [selectedTab, setSelectedTab] = useUncontrolledProp<T | undefined>(value, defaultValue, onChange);

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

export namespace Tabs {
  export const Tab = TabComponent;
  export const TabBar = TabBarComponent;
  export const TabContent = TabContentComponent;
}
