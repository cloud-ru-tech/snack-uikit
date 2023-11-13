import { ToolbarProps } from './Toolbar';
import { CheckedToolbarProps } from './types';

export function extractSearchPrivateProps({ value, onChange, onSubmit, placeholder, loading }: Partial<ToolbarProps>) {
  return { value, onChange, onSubmit, placeholder, loading };
}

export function extractDeleteActionProps({
  onCheck,
  checked,
  indeterminate,
  onDelete,
  selectionMode,
}: Omit<CheckedToolbarProps, 'onRefresh'>) {
  return { onCheck, checked, indeterminate, onDelete, selectionMode };
}

export function isDeleteActionProps(props: Partial<ToolbarProps>): props is CheckedToolbarProps {
  return 'checked' in props && props.checked !== undefined && 'onCheck' in props && props.onCheck !== undefined;
}
