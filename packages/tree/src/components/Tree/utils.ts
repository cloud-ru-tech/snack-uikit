import { SELECTION_MODE } from '../../constants';
import { TreeBaseProps, TreeMultiSelect, TreeSingleSelect, TreeView } from '../../types';

export function extractSelectableProps({
  selectionMode,
  selected,
  onSelect,
}: Pick<TreeBaseProps, 'selectionMode' | 'selected' | 'onSelect'>) {
  switch (selectionMode) {
    case SELECTION_MODE.Single:
      return {
        selectionMode,
        selected,
        onSelect,
      } as Pick<TreeSingleSelect, 'selectionMode' | 'selected' | 'onSelect'>;
    case SELECTION_MODE.Multi:
      return {
        selectionMode,
        selected,
        onSelect,
      } as Pick<TreeMultiSelect, 'selectionMode' | 'selected' | 'onSelect'>;
    case undefined:
    default:
      return {} as Pick<TreeView, 'selectionMode' | 'selected' | 'onSelect'>;
  }
}
