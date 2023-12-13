import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { ALIGN, TEST_IDS } from '../../constants';
import { Align } from '../../types';
import styles from './styles.module.scss';

export type ModalFooterProps = WithSupportProps<{
  /** Параметр для передачи кнопок */
  actions: ReactNode;
  /** Параметр для небольшого текста под кнопками */
  disclaimer?: ReactNode;
  /** Выравнивание контента */
  align?: Align;
  className?: string;
}>;

export function ModalFooter({ actions, disclaimer, align = ALIGN.Default, className, ...rest }: ModalFooterProps) {
  return (
    <div
      data-align={align}
      className={cn(styles.footer, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.footer}
    >
      <div className={styles.footerActions}>{actions}</div>

      {disclaimer && (
        <div className={styles.footerDisclaimer} data-test-id={TEST_IDS.disclaimer}>
          {disclaimer}
        </div>
      )}
    </div>
  );
}
