import { useMemo } from 'react';

type UseOffsetProps = {
  triggerClassName?: string;
  offsetProp?: number;
};

export function useOffset({ triggerClassName, offsetProp }: UseOffsetProps) {
  const elem = document.querySelector('.' + String(triggerClassName).replace(/\s+/g, '.'));

  const styles = elem ? getComputedStyle(elem) : null;

  const rawOffset = styles ? styles.getPropertyValue('--offset') : null;

  return useMemo(() => {
    if (offsetProp !== undefined) {
      return offsetProp;
    }

    const tempSpan = document.createElement('span');
    tempSpan.style.width = rawOffset || '';
    document.body.appendChild(tempSpan);
    const rawOffsetValue = getComputedStyle(tempSpan).width;
    document.body.removeChild(tempSpan);

    const num = parseInt(rawOffsetValue || '');

    if (Number.isNaN(num) || num < 1) {
      return 0;
    }

    return num;
  }, [offsetProp, rawOffset]);
}
