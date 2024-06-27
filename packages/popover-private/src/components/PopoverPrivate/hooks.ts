import { useEffect, useState } from 'react';

type UseOffsetProps = {
  triggerClassName?: string;
  offsetProp?: number;
};

export function useOffset({ triggerClassName, offsetProp }: UseOffsetProps) {
  const [offset, setOffset] = useState(0);

  // TODO: change to useLayoutEffect when wrapper for browser/server check will be ready
  useEffect(() => {
    const elem = document.querySelector('.' + String(triggerClassName).split(/\s+/g).map(CSS.escape).join('.'));
    const styles = elem ? getComputedStyle(elem) : null;
    const rawOffset = styles ? styles.getPropertyValue('--offset') : null;

    if (offsetProp !== undefined) {
      setOffset(offsetProp);
      return;
    }

    const tempSpan = document.createElement('span');
    tempSpan.style.width = rawOffset || '';
    document.body.appendChild(tempSpan);
    const rawOffsetValue = getComputedStyle(tempSpan).width;
    document.body.removeChild(tempSpan);

    const num = parseInt(rawOffsetValue || '');

    if (Number.isNaN(num) || num < 1) {
      setOffset(0);
      return;
    }

    setOffset(num);
  }, [offsetProp, triggerClassName]);

  return offset;
}
