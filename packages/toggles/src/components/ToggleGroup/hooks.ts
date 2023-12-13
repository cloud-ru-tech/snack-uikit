import { useCallback, useMemo } from 'react';

import { SELECTION_MODE } from '../../constants';
import { useToggleGroupContext } from '../../context';

type UseToggleGroupProps = {
  value: string;
};

export function useToggleGroup({ value: itemValue }: UseToggleGroupProps) {
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
    multipleSelection: selectionMode === SELECTION_MODE.Multiple,
  };
}
