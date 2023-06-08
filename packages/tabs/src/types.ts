import { Type } from './constants';

export type TabsContextValue = {
  selectedTab?: string;
  setSelectedTab: (id: string) => void;
};

export type TabBarContextValue = Partial<{
  type: Type;
  focusedTab: string;
  onSelect(element: HTMLButtonElement): void;
  onFocus(element: HTMLElement, id: string): void;
}>;
