import { FiltersState } from '@snack-uikit/chips';

import { ToolbarProps } from './Toolbar';
import { ToolbarBulkActionProps } from './types';

export function extractBulkActionsProps({
  onCheck,
  checked,
  indeterminate,
  bulkActions = [],
  selectionMode,
}: ToolbarBulkActionProps) {
  return { onCheck, checked, indeterminate, actions: bulkActions, selectionMode };
}

export function isBulkActionsProps<TState extends FiltersState>(
  props: Partial<ToolbarProps<TState>>,
): props is ToolbarBulkActionProps {
  return (
    'bulkActions' in props &&
    Array.isArray(props.bulkActions) &&
    props.bulkActions.length > 0 &&
    'selectionMode' in props &&
    props.selectionMode === 'multiple'
  );
}
