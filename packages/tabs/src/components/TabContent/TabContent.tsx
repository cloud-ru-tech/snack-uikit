import { PropsWithChildren } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { useTabsContext } from '../../context';
import { getTabContentId } from '../../utils';

export type TabContentProps = WithSupportProps<
  PropsWithChildren<{
    /** Значение таба */
    value: string;
    className?: string;
  }>
>;

export function TabContent({ children, value, className, ...rest }: TabContentProps) {
  const { selectedTab } = useTabsContext();

  if (value !== selectedTab) {
    return null;
  }

  return (
    <div
      className={className}
      role='tabpanel'
      id={getTabContentId(value)}
      {...extractSupportProps(rest)}
      aria-labelledby={value}
      data-test-id={`tabs__tab-content-${value}`}
    >
      {children}
    </div>
  );
}
