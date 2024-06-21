import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractDataTestProps, extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { WIDTH } from '../constants';
import { Segment } from '../helperComponents';
import { useFocusControl } from '../hooks';
import { IdType, Segment as SegmentType, SelectionPosition, Size, Width } from '../types';
import styles from './styles.module.scss';

export type SegmentedControlProps = WithSupportProps<{
  /**
   * Набор сегментов.
   */
  items: SegmentType[];
  /**
   * Value выбранного сегмента.
   */
  value?: IdType;
  /**
   * ID выбранного по умолчанию сегмента. (в uncontrolled режиме)
   */
  defaultValue?: IdType;
  /**
   * Колбек смены выбранного сегмента.
   */
  onChange?: (value: IdType) => void;
  /**
   * CSS-класс контейнера.
   */
  className?: string;
  /**
   * Размер компонента.
   */
  size?: Size;
  /**
   * Обводка
   */
  outline?: boolean;
  /**
   * Управление шириной компонента.
   */
  width?: Width;
}>;

/**
 * SegmentedControl
 */
export function SegmentedControl({
  defaultValue,
  size = 'm',
  className,
  onChange,
  items,
  value,
  outline,
  width = WIDTH.Auto,
  ...other
}: SegmentedControlProps) {
  const [selected, setSelected] = useUncontrolledProp(value, defaultValue, onChange);
  const { focusableSegmentValue, onGetFocusable, onKeyDown } = useFocusControl({ selected, items });
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedElementRef = useRef<HTMLButtonElement>();
  const [selectionPosition, setSelectionPosition] = useState<SelectionPosition>();
  const updateSelectionPosition = useCallback((element: HTMLButtonElement | undefined = selectedElementRef.current) => {
    if (!element) {
      return;
    }
    selectedElementRef.current = element;
    setTimeout(() => {
      setSelectionPosition({
        top: element.offsetTop,
        left: element.offsetLeft,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => updateSelectionPosition());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateSelectionPosition]);

  const itemsJSX = useMemo(
    () =>
      items.map(props => (
        <div className={styles.segmentHolder} key={props.value} data-width={width}>
          <Segment
            {...props}
            size={size}
            onGetFocusable={onGetFocusable}
            selected={selected === props.value}
            onClick={() => setSelected(props.value)}
            focusable={focusableSegmentValue === props.value}
            onSelectionUpdated={updateSelectionPosition}
          />
        </div>
      )),
    [items, width, size, onGetFocusable, selected, focusableSegmentValue, updateSelectionPosition, setSelected],
  );

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      ref={containerRef}
      data-size={size}
      onKeyDown={onKeyDown}
      className={cn(styles.container, className)}
      role='radiogroup'
      data-outline={outline || undefined}
      data-width={width}
      {...extractDataTestProps(other)}
      {...extractSupportProps(other)}
    >
      <div data-size={size} style={selectionPosition} className={styles.selection} aria-hidden={true} />
      {itemsJSX}
    </div>
  );
}
