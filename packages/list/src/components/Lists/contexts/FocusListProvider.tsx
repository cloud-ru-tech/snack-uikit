import { createContext, KeyboardEvent, useContext } from 'react';

import { ItemId } from '../../Items';

export type FocusListContextType = {
  activeItemId?: ItemId;
  forceUpdateActiveItemId?(itemId: ItemId): void;
  handleListKeyDownFactory: (ids: ItemId[], expandedIds: ItemId[]) => (e: KeyboardEvent<HTMLElement>) => void;
};

export const FocusListContext = createContext<FocusListContextType>({
  handleListKeyDownFactory: () => () => {},
});

export const useFocusListContext = () => useContext(FocusListContext);
