import cn from 'classnames';
import { ReactNode } from 'react';

import { Align, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalFooterProps = {
  /** Параметр для передачи кнопок */
  actions: ReactNode;
  /** Параметр для небольшого текста под кнопками */
  disclaimer?: ReactNode;
  /** Выравнивание контента */
  align?: Align;
  className?: string;
};

export function ModalFooter({ actions, disclaimer, align = Align.Default, className }: ModalFooterProps) {
  return (
    <div data-align={align} className={cn(styles.footer, className)} data-test-id={TEST_IDS.footer}>
      <div className={styles.footerActions}>{actions}</div>

      {disclaimer && (
        <div className={styles.footerDisclaimer} data-test-id={TEST_IDS.disclaimer}>
          {disclaimer}
        </div>
      )}
    </div>
  );
}

ModalFooter.aligns = Align;
