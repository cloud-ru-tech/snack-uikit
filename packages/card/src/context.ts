import { createContext, useContext } from 'react';

import { SIZE } from './constants';
import { Size } from './types';

type CardContextValue = {
  size: Size;
  disabled: boolean;
};

export const CardContext = createContext<CardContextValue>({
  size: SIZE.M,
  disabled: false,
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
