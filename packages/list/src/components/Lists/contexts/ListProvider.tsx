import { createContext, ReactNode, useContext } from 'react';

export type ListContextType = {
  /** Размер списка */
  size?: 's' | 'm' | 'l';
  // TODO
  // collapse?: 'single' | 'multiple';
  /** Отображать ли маркер у выбранного жлемента списка */
  marker?: boolean;
};

type Child = {
  children: ReactNode;
};

export const ListContext = createContext<ListContextType>({});

export const useListContext = () => useContext(ListContext);

function extractListProps<T extends ListContextType>({ size, marker }: T) {
  return { size, marker };
}

export function ListContextProvider({ children, ...props }: ListContextType & Child) {
  return <ListContext.Provider value={extractListProps(props)}>{children}</ListContext.Provider>;
}
