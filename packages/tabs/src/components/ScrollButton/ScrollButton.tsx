import { ButtonElevated } from '@snack-uikit/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@snack-uikit/icons';

import { Type } from '../../constants';
import styles from './styles.module.scss';

export type ScrollButtonProps = {
  type: Type;
  direction: 'left' | 'right';
  onClick: () => void;
};

const MAP_TYPE_TO_ICON_SIZE = {
  [Type.Primary]: ButtonElevated.sizes.S,
  [Type.Secondary]: ButtonElevated.sizes.Xs,
};

export function ScrollButton({ type, onClick, direction }: ScrollButtonProps) {
  return (
    <div
      className={styles.scrollButton}
      data-direction={direction}
      data-type={type}
      data-test-id={`tabs__scroll-button-${direction}`}
    >
      <ButtonElevated
        tabIndex={-1}
        icon={direction === 'left' ? <ChevronLeftSVG /> : <ChevronRightSVG />}
        size={MAP_TYPE_TO_ICON_SIZE[type]}
        onClick={onClick}
      />
    </div>
  );
}
