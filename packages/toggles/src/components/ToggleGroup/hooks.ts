import { useCallback, useMemo } from 'react';

import { SelectionMode } from '../../constants';
import { useToggleGroupContext } from '../../context';

export function useToggleGroup(itemValue: string) {
  const { value, onChange, selectionMode } = useToggleGroupContext();

  const isChecked = useMemo(() => {
    if (typeof value === 'string') {
      return value === itemValue;
    }

    if (Array.isArray(value)) {
      return value.includes(itemValue);
    }

    return false;
  }, [value, itemValue]);

  const handleClick = useCallback(() => {
    onChange?.(itemValue);
  }, [itemValue, onChange]);

  return {
    isChecked,
    handleClick,
    multipleSelection: selectionMode === SelectionMode.Multiple,
  };
}
