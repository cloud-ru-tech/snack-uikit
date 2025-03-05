import { FocusEvent, forwardRef, RefObject, useCallback } from 'react';

import { stopPropagation } from '../../utils';
import styles from './styles.module.scss';

type HiddenTabButtonProps = {
  listRef: RefObject<HTMLElement>;
  tabIndex?: number;
};

export const HiddenTabButton = forwardRef<HTMLButtonElement, HiddenTabButtonProps>(({ listRef, tabIndex }, ref) => {
  const handleFocus = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      if (e.relatedTarget !== listRef.current) {
        listRef.current?.focus();
      }

      e.preventDefault();
      e.stopPropagation();
    },
    [listRef],
  );

  return (
    <button
      type='button'
      aria-hidden
      ref={ref}
      onKeyDown={stopPropagation}
      onFocus={handleFocus}
      className={styles.hiddenBtn}
      tabIndex={tabIndex}
    />
  );
});
