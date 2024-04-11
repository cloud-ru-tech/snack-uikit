import { useEffect, useMemo } from 'react';

import { ItemProps, useSelectionContext } from '@snack-uikit/list';

import { extractAllChildIds, extractChildIds } from '../../utils';

type UseGroupItemSelectionProps = {
  items: ItemProps[];
  id?: string | number;
  disabled?: boolean;
};

export function useLegacyGroupItemSelection({ id = '', items, disabled }: UseGroupItemSelectionProps) {
  const { value, setValue, isSelectionMultiple } = useSelectionContext();
  const { childIds, allChildIds } = useMemo(
    () => ({ childIds: extractChildIds({ items }), allChildIds: extractAllChildIds({ items }) }),
    [items],
  );

  const isIndeterminate = isSelectionMultiple
    ? allChildIds.some(childId => value?.includes(childId))
    : allChildIds.includes(value ?? '');
  const checked = isSelectionMultiple ? allChildIds.every(childId => value?.includes(childId)) : undefined;

  useEffect(() => {
    if (isSelectionMultiple) {
      if (checked && !value?.includes(id)) {
        setValue?.((value: Array<number | string>) => (value ?? []).concat([id ?? '']));
      }
      if (!checked && value?.includes(id)) {
        setValue?.((value: Array<number | string>) => (value ?? []).filter(itemId => itemId !== id));
      }
    }
  }, [checked, disabled, id, isSelectionMultiple, setValue, value]);

  const handleOnSelect = () => {
    if (checked) {
      setValue?.((value: Array<string | number>) =>
        (value ?? []).filter(itemId => itemId !== id && !childIds.includes(itemId)),
      );
      return;
    }

    if (isIndeterminate) {
      setValue?.((value: Array<string | number>) => Array.from(new Set([...(value ?? []), ...childIds, id])));
      return;
    }

    setValue?.((value: Array<string | number>) => (value ?? []).concat([...childIds, id ?? '']));
  };

  return { checked, isIndeterminate, handleOnSelect };
}
