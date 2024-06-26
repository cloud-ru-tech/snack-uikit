import { FocusEvent, forwardRef, KeyboardEvent, RefObject, useCallback } from 'react';

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

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <button
      type='button'
      aria-hidden
      ref={ref}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      className={styles.hiddenBtn}
      tabIndex={tabIndex}
    />
  );
});
