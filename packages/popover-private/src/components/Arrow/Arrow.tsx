import { Placement } from '@floating-ui/react';
import cn from 'classnames';
import { MutableRefObject } from 'react';

import { ArrowSize } from '../../constants';
import { getArrowPositionStyles } from '../../utils';
import style from './styles.module.scss';

export type ArrowProps = {
  placement: Placement;
  size?: ArrowSize;
  x?: number;
  y?: number;
  className?: string;
  arrowRef: MutableRefObject<HTMLDivElement | null>;
};

export function Arrow({ placement, x, y, className, size = ArrowSize.S, arrowRef }: ArrowProps) {
  return (
    <div
      className={cn(style.arrowContainer, className)}
      ref={arrowRef}
      style={getArrowPositionStyles({ x, y, placement, ref: arrowRef })}
      data-size={size}
    >
      <svg className={style.arrowElement} viewBox='0 0 4 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M4 0V8L0.707106 4.70711C0.316582 4.31658 0.316583 3.68342 0.707107 3.29289L4 0Z' />
      </svg>
    </div>
  );
}
