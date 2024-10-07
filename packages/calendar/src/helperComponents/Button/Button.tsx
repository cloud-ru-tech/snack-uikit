import { JSX, KeyboardEvent, useCallback, useContext, useImperativeHandle, useRef } from 'react';

import { extractSupportProps, useLayoutEffect, WithSupportProps } from '@snack-uikit/utils';

import { CalendarContext } from '../CalendarContext';
import styles from './styles.module.scss';

export type ButtonProps = WithSupportProps<{
  focusName?: string;
  label?: string;
  onClick?(): void;
  onLeftArrowKeyDown?(): void;
  onRightArrowKeyDown?(): void;
  onDownArrowKeyDown?(): void;
  tabIndex?: 0 | -1;
  disabled?: boolean;
  icon?: JSX.Element;
  useNavigationStartRef?: boolean;
}>;

export function Button({
  label,
  icon,
  onClick,
  focusName,
  tabIndex,
  onLeftArrowKeyDown,
  onRightArrowKeyDown,
  onDownArrowKeyDown,
  disabled,
  useNavigationStartRef,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { size, focus, setFocus, onFocusLeave, navigationStartRef } = useContext(CalendarContext);

  useLayoutEffect(() => {
    if (focus && focus === focusName) {
      ref.current?.focus();
    }
  }, [focus, focusName]);

  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onLeftArrowKeyDown?.();
          break;
        case 'ArrowRight':
          onRightArrowKeyDown?.();
          break;
        case 'ArrowDown':
          onDownArrowKeyDown?.();
          break;
        case 'ArrowUp':
          onFocusLeave?.('prev');
          break;
        case 'Tab':
          if (e.shiftKey) {
            onFocusLeave?.('prev');
          }
          break;
        default:
        // do nothing
      }
    },
    [onDownArrowKeyDown, onFocusLeave, onLeftArrowKeyDown, onRightArrowKeyDown],
  );

  useImperativeHandle(useNavigationStartRef ? navigationStartRef : undefined, () => ({
    focus: () => {
      ref.current?.focus();
    },
  }));

  return (
    <button
      type='button'
      tabIndex={tabIndex}
      className={styles.button}
      onClick={onClick}
      data-size={size}
      ref={ref}
      onKeyDown={onKeyDownHandler}
      onFocus={() => setFocus(focusName)}
      onBlur={() => setFocus(undefined)}
      disabled={disabled}
      {...extractSupportProps(rest)}
    >
      {label}
      <div className={styles.icon}>{icon}</div>
    </button>
  );
}
