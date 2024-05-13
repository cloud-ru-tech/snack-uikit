import { createContext, useContext } from 'react';

export type OpenListContextType = {
  closeDroplistOnItemClick?: boolean;
  closeDroplist(): void;
};

export const OpenListContext = createContext<OpenListContextType>({
  closeDroplist: () => {},
  closeDroplistOnItemClick: false,
});

export const useOpenListContext = () => useContext(OpenListContext);
