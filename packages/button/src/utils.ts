import { CommonButtonProps, CounterButtonProps } from './types';

export function extractCounterButtonProps({ counter }: CounterButtonProps) {
  return { counter };
}

export function extractCommonButtonProps({
  disabled,
  href,
  icon,
  label,
  loading,
  onClick,
  onKeyDown,
}: CommonButtonProps) {
  return { disabled, href, icon, label, loading, onClick, onKeyDown };
}
