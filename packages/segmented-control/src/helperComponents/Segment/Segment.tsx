import cn from 'classnames';
import { useEffect, useRef } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';

import { Segment as SegmentType, Size } from '../../types';
import { getLayout } from '../../utils';
import styles from './styles.module.scss';

type SegmentProps = SegmentType & {
  size: Size;
  selected: boolean;
  onClick: () => void;
  focusable?: boolean;
  onGetFocusable?: (ref: HTMLButtonElement | null) => void;
  onSelectionUpdated: (element: HTMLButtonElement) => void;
};

export function Segment({
  size,
  label,
  value,
  selected,
  onClick,
  disabled,
  icon,
  focusable,
  onGetFocusable,
  onSelectionUpdated,
  renderWrapSegment,
}: SegmentProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusable) {
      onGetFocusable?.(buttonRef.current);
    }
  }, [focusable, onGetFocusable]);

  useEffect(() => {
    if (selected && buttonRef.current) {
      onSelectionUpdated(buttonRef.current);
    }
  }, [selected, buttonRef, onSelectionUpdated]);

  const segment = (
    <button
      ref={buttonRef}
      data-test-id={`section-${value}`}
      data-active={selected || undefined}
      data-disabled={disabled || undefined}
      data-layout={getLayout(icon, label)}
      className={cn(styles.segment)}
      onClick={onClick}
      data-size={size}
      disabled={disabled}
      tabIndex={focusable ? 0 : -1}
      aria-checked={selected}
      role='radio'
      type='button'
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {label && <TruncateString className={styles.label} data-size={size} text={label} />}
    </button>
  );

  return renderWrapSegment ? renderWrapSegment(segment) : segment;
}
