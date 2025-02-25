import copyToClipboard from 'copy-to-clipboard';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { CheckSVG, CopySVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

export type CopyCellProps = {
  value?: string | number;
};

export function CopyCell({ value }: CopyCellProps) {
  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<NodeJS.Timeout>();
  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleClick: MouseEventHandler<HTMLElement> = event => {
    event.stopPropagation();
    value && copyToClipboard(String(value), { format: 'text/plain' });
    openChecked();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeChecked, 1000);
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <div className={styles.copyCell} onClick={handleClick} role='presentation'>
      <TruncateString text={String(value)} maxLines={1} />

      <ButtonFunction
        data-test-id='button-copy-value'
        type='button'
        icon={isChecked ? <CheckSVG /> : <CopySVG />}
        size='xs'
        className={styles.copyButton}
      />
    </div>
  );
}
