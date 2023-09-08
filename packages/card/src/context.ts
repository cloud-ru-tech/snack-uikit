import { createContext, useContext } from 'react';

import { Size } from './constants';

type CardContextValue = {
  size: Size;
};

export const CardContext = createContext<CardContextValue>({
  size: Size.M,
});

export function useCardContext() {
  return useContext(CardContext);
}

type FunctionBadgeContextValue = {
  visible?: boolean;
  setVisible?(v: boolean): void;
};

export const FunctionBadgeContext = createContext<FunctionBadgeContextValue>({
  visible: false,
  setVisible: () => {},
});
