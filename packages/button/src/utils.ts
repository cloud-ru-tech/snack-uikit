import { CommonButtonProps } from './types';

export function extractCommonButtonProps({ disabled, href, icon, label, loading, onClick }: CommonButtonProps) {
  return { disabled, href, icon, label, loading, onClick };
}
