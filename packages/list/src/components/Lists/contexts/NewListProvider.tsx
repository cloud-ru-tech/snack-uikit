import { createContext, ReactNode, useContext } from 'react';

import { ITEM_PREFIXES } from '../../../constants';
import { ItemContentProps } from '../../../helperComponents';
import { FlattenItem, FocusFlattenItem, ItemId } from '../../Items';

type ContentRenderProps = {
  id?: ItemId;
  content?: ItemContentProps | ReactNode;
  disabled?: boolean;
};

export type PublicListContextType = {
  /** Размер списка */
  size?: 's' | 'm' | 'l';
  /** Отображать ли маркер у выбранного жлемента списка */
  marker?: boolean;
  /**
   * Рендер функция основного контента айтема
   */
  contentRender?(props: ContentRenderProps): ReactNode;
  virtualized?: boolean;
};

export type PrivateListContextType = {
  flattenItems: Record<string, FlattenItem>;
  focusFlattenItems: Record<string, FocusFlattenItem>;
  firstItemId?: ItemId;
};

type Child = {
  children: ReactNode;
};

type ListContextType = PublicListContextType & PrivateListContextType;

export const ListContext = createContext<ListContextType>({
  flattenItems: {},
  focusFlattenItems: {},
  firstItemId: ITEM_PREFIXES.default,
});

export function useNewListContext() {
  return useContext<ListContextType>(ListContext);
}

function extractListProps<T extends ListContextType>({
  size,
  marker,
  flattenItems,
  focusFlattenItems,
  contentRender,
  firstItemId,
  virtualized,
}: T) {
  return { size, marker, contentRender, flattenItems, focusFlattenItems, firstItemId, virtualized };
}

export function NewListContextProvider({ children, ...props }: ListContextType & Child) {
  return <ListContext.Provider value={extractListProps(props)}>{children}</ListContext.Provider>;
}
