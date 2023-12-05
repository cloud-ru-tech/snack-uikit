import { CrossSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type ButtonCloseProps = {
  onClick(): void;
};

export function ButtonClose({ onClick }: ButtonCloseProps) {
  return (
    <button
      className={styles.buttonClose}
      onClick={onClick}
      aria-label='close modal'
      data-test-id={TEST_IDS.closeButton}
    >
      <CrossSVG />
    </button>
  );
}
