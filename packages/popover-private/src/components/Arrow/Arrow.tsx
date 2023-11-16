import { Placement } from '@floating-ui/react';
import { MutableRefObject } from 'react';

import { getArrowPositionStyles } from '../../utils';

export type ArrowProps = {
  placement: Placement;
  x?: number;
  y?: number;
  arrowContainerClassName?: string;
  arrowElementClassName?: string;
  arrowRef: MutableRefObject<HTMLDivElement | null>;
};

export function Arrow({ placement, x, y, arrowContainerClassName, arrowElementClassName, arrowRef }: ArrowProps) {
  return (
    <div
      className={arrowContainerClassName}
      ref={arrowRef}
      style={getArrowPositionStyles({ x, y, placement, ref: arrowRef })}
    >
      <svg className={arrowElementClassName} viewBox='0 0 4 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M4 0V8L0.707106 4.70711C0.316582 4.31658 0.316583 3.68342 0.707107 3.29289L4 0Z' />
      </svg>
    </div>
  );
}
