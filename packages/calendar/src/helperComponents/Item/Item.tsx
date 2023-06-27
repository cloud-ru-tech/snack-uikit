import cn from 'classnames';
import { useContext, useLayoutEffect, useRef } from 'react';

import { AUTOFOCUS, InRangePosition } from '../../constants';
import { Cell } from '../../types';
import { CalendarContext } from '../CalendarContext';
import { useKeyboardFocus } from './hooks';
import styles from './styles.module.scss';
import { stringifyAddress } from './utils';

export type CellProps = {
  className?: string;
  data: Cell;
};

export function Item({ data, className }: CellProps) {
  const {
    date,
    label,
    address,
    onSelect,
    onPreselect,
    onLeave,
    inRangePosition,
    isCurrent,
    isInCurrentLevelPeriod,
    isSelected,
    tabIndex,
  } = data;

  const ref = useRef<HTMLButtonElement>(null);

  const { focus, setFocus, size, getTestId, locale } = useContext(CalendarContext);

  useLayoutEffect(() => {
    if (stringifyAddress(address) === focus) {
      ref.current?.focus();
    }
  }, [focus, address]);

  useLayoutEffect(() => {
    if (tabIndex === 0 && focus === AUTOFOCUS) {
      ref.current?.focus();
    }
  }, [focus, tabIndex]);

  const keyDownHandler = useKeyboardFocus(address);

  const attributes = {
    'data-is-in-current-level-period': isInCurrentLevelPeriod || undefined,
    'data-is-selected': isSelected || undefined,
    'data-in-range-position': inRangePosition,
    'data-is-current': isCurrent || undefined,
    'data-size': size,
  };

  const isInRange = inRangePosition !== InRangePosition.Out;

  date.toLocaleString(locale, { weekday: 'short' });

  return (
    <div className={cn(className, styles.item)} {...attributes}>
      <button
        className={styles.button}
        onClick={() => onSelect?.(date)}
        onMouseEnter={() => onPreselect?.(date)}
        onFocus={() => {
          setFocus(stringifyAddress(address));
          onPreselect?.(date);
        }}
        onMouseLeave={onLeave}
        onBlur={() => {
          setFocus(undefined);
          onLeave?.();
        }}
        onKeyDown={keyDownHandler}
        ref={ref}
        {...attributes}
        data-test-id={getTestId('item')}
        tabIndex={tabIndex}
      >
        {isInRange && <div className={styles.range} {...attributes} />}
        <div className={styles.box} {...attributes} />
        <div className={styles.content} {...attributes}>
          <span>{label}</span>
          {isCurrent && <div className={styles.marker} {...attributes} />}
        </div>
      </button>
    </div>
  );
}
