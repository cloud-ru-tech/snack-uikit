import { ValueOf } from '@snack-uikit/utils';

import { MARKER_POSITION, ORIENTATION, TYPE } from './constants';

export type Type = ValueOf<typeof TYPE>;
export type Orientation = ValueOf<typeof ORIENTATION>;
export type MarkerPosition = ValueOf<typeof MARKER_POSITION>;
export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type TabsContextValue = {
  selectedTab?: string;
  setSelectedTab: (id: string) => void;
};

export type TabBarContextValue = Partial<{
  type: Type;
  orientation: Orientation;
  focusedTab: string;
  onSelect(element: HTMLButtonElement): void;
  onFocus(element: HTMLElement, id: string): void;
}>;
