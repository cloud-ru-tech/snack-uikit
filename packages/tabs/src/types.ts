import { ValueOf } from '@snack-uikit/utils';

import { TYPE } from './constants';

export type Type = ValueOf<typeof TYPE>;

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
