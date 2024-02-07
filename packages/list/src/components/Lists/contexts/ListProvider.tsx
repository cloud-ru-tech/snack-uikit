import { createContext, ReactNode, useContext } from 'react';

export type ListContextType = {
  /** Размер списка */
  size?: 's' | 'm' | 'l';
  /** Отображать ли маркер у выбранного жлемента списка */
  marker?: boolean;
};

export type ListContextPrivateType = {
  parent?: 'list' | 'droplist';
};

type Child = {
  children: ReactNode;
};

export const ListContext = createContext<ListContextType & ListContextPrivateType>({});

export const useListContext = () => useContext(ListContext);

function extractListProps<T extends ListContextType & ListContextPrivateType>({ size, marker, parent }: T) {
  return { size, marker, parent };
}

export function ListContextProvider({ children, ...props }: ListContextType & Child & ListContextPrivateType) {
  return <ListContext.Provider value={extractListProps(props)}>{children}</ListContext.Provider>;
}
