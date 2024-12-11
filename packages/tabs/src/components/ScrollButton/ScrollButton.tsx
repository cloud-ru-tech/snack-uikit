import { ReactElement } from 'react';

import { ButtonElevated, ButtonElevatedProps } from '@snack-uikit/button';
import { ChevronDownSVG, ChevronLeftSVG, ChevronRightSVG, ChevronUpSVG } from '@snack-uikit/icons';

import { TYPE } from '../../constants';
import { Direction, Orientation, Type } from '../../types';
import styles from './styles.module.scss';

export type ScrollButtonProps = {
  type: Type;
  direction: Direction;
  orientation: Orientation;
  onClick: () => void;
};

const MAP_TYPE_TO_ICON_SIZE: Record<Type, ButtonElevatedProps['size']> = {
  [TYPE.Primary]: 's',
  [TYPE.Secondary]: 'xs',
};

const MAP_DIRECTION_TO_ICON: Record<Direction, ReactElement> = {
  left: <ChevronLeftSVG />,
  right: <ChevronRightSVG />,
  top: <ChevronUpSVG />,
  bottom: <ChevronDownSVG />,
};

export function ScrollButton({ type, onClick, direction, orientation }: ScrollButtonProps) {
  return (
    <div
      className={styles.scrollButton}
      data-direction={direction}
      data-type={type}
      data-orientation={orientation}
      data-test-id={`tabs__scroll-button-${direction}`}
    >
      <ButtonElevated
        tabIndex={-1}
        icon={MAP_DIRECTION_TO_ICON[direction]}
        size={MAP_TYPE_TO_ICON_SIZE[type]}
        onClick={onClick}
      />
    </div>
  );
}
