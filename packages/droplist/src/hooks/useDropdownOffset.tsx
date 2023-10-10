import { RefObject, useEffect, useState } from 'react';

export function useGetDropdownOffset<T extends HTMLElement>(elementRef: RefObject<T>, ccsField?: string) {
  const [dropdownOffset, setDropdownOffset] = useState<number>(0);

  const rawOffset = elementRef.current
    ? getComputedStyle(elementRef.current, null).getPropertyValue(ccsField ?? 'top')
    : undefined;

  useEffect(() => {
    if (!rawOffset) {
      return;
    }

    const num = parseInt(rawOffset);
    if (Number.isNaN(num) || num < 1) {
      return;
    }

    setDropdownOffset(num);
  }, [rawOffset]);

  return dropdownOffset;
}
