import { ColumnDefinition } from '../../../types';

export type PinnedGroupsState<TData extends object> = {
  left: ColumnDefinition<TData>[];
  right: ColumnDefinition<TData>[];
  unpinned: ColumnDefinition<TData>[];
};

export function getPinnedGroups<TData extends object>(columnDefinitions: ColumnDefinition<TData>[]) {
  return columnDefinitions.reduce(
    (accPinnedState: PinnedGroupsState<TData>, colDef: ColumnDefinition<TData>) => {
      switch (colDef.pinned) {
        case 'left':
          accPinnedState.left.push(colDef);
          break;

        case 'right':
          accPinnedState.right.push(colDef);
          break;

        default:
          accPinnedState.unpinned.push(colDef);
      }

      return accPinnedState;
    },
    {
      left: [],
      right: [],
      unpinned: [],
    },
  );
}
