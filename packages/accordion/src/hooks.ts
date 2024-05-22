import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';

import { useToggleGroup } from '@snack-uikit/toggles';

export function useExpanded(id: string) {
  const { isChecked: isExpanded, handleClick: handleExpandedChange } = useToggleGroup({ value: id });
  const [isExpandedDebounced, setIsExpandedDebounced] = useState<boolean>(isExpanded);

  const debouncedSetIsExpandedDebounced = useMemo(() => debounce(setIsExpandedDebounced, 300), []);

  const handleToggleExpanded = useCallback(
    (expanded: boolean) => {
      handleExpandedChange();
      debouncedSetIsExpandedDebounced(expanded);
    },
    [debouncedSetIsExpandedDebounced, handleExpandedChange],
  );

  return { isExpanded, isExpandedDebounced, handleToggleExpanded };
}
