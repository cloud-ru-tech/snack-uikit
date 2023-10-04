import { PropsWithChildren, useContext } from 'react';

import { TabsContext } from '../../context';
import { getTabContentId } from '../../utils';

export type TabContentProps = PropsWithChildren<{
  /** Значение таба */
  value: string;
  className?: string;
}>;

export function TabContent({ children, value, className }: TabContentProps) {
  const { selectedTab } = useContext(TabsContext);

  if (value !== selectedTab) {
    return null;
  }

  return (
    <div
      className={className}
      role='tabpanel'
      id={getTabContentId(value)}
      aria-labelledby={value}
      data-test-id={`tabs__tab-content-${value}`}
    >
      {children}
    </div>
  );
}
