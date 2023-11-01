import { useCallback, useMemo } from 'react';

import { useAccordionContext } from './context';

export function useAccordion(id: string) {
  const { expanded, onExpandedChange } = useAccordionContext();

  const isExpanded = useMemo(() => {
    if (typeof expanded === 'string') {
      return expanded === id;
    }

    if (Array.isArray(expanded)) {
      return expanded.includes(id);
    }

    return false;
  }, [expanded, id]);

  const handleExpandedChange = useCallback(() => {
    onExpandedChange?.(id);
  }, [id, onExpandedChange]);

  return { isExpanded, handleExpandedChange };
}
