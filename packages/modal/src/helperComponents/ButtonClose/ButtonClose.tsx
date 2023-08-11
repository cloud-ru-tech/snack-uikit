import { CrossSSVG } from '@snack-ui/icons';

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
      <CrossSSVG size={24} />
    </button>
  );
}
