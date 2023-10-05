import { ToolbarProps } from './Toolbar';
import { CheckedToolbarProps } from './types';

export function extractSearchPrivateProps({ value, onChange, onSubmit, placeholder, loading }: Partial<ToolbarProps>) {
  return { value, onChange, onSubmit, placeholder, loading };
}

export function extractCheckboxPrivateProps({
  onCheck,
  checked,
  indeterminate,
  onDelete,
}: Omit<CheckedToolbarProps, 'onRefresh'>) {
  return { onCheck, checked, indeterminate, onDelete };
}

export function isCheckedToolbarProps(props: Partial<ToolbarProps>): props is CheckedToolbarProps {
  return 'checked' in props && props.checked !== undefined && 'onCheck' in props && props.onCheck !== undefined;
}
