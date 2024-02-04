import { createContext, RefObject, useContext } from 'react';

export type ParentListContextType = {
  parentActiveFocusIndex: number;
  parentSetActiveFocusIndex?(idx: number): void;
  parentResetActiveFocusIndex?(): void;

  parentIds: Array<string | number>;
  parentExpandedIds: Array<string | number>;
  parentItemRefs: Array<RefObject<HTMLElement>>;

  parentOpenNestedIndex: number;
  parentResetNestedIndex?(): void;

  openCollapsedItems?: Array<string | number>;
  toggleOpenCollapsedItems?(id: string | number): void;

  triggerRef?: RefObject<HTMLElement>;
  parentRef?: RefObject<HTMLElement>;
};

export const ParentListContext = createContext<ParentListContextType>({
  parentActiveFocusIndex: -1,
  parentOpenNestedIndex: -1,

  parentIds: [],
  parentExpandedIds: [],
  parentItemRefs: [],
});

export const useParentListContext = () => useContext(ParentListContext);

export function ParentListProvider() {
  return null;
}
