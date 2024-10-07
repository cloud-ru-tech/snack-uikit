import { createRef, KeyboardEventHandler, RefObject, useContext, useImperativeHandle, useMemo } from 'react';

import { getDefaultItemId, ItemProps, List, ListProps } from '@snack-uikit/list';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CalendarContext } from '../CalendarContext';

export type TimeListProps = WithSupportProps<{
  numberOfItems: number;
  value?: number;
  onChange(value: number): void;
  className?: string;
  onKeyDownGetter?: (id: number) => KeyboardEventHandler;
  keyboardNavigationRef?: ListProps['keyboardNavigationRef'];
  navigationStartRef?: RefObject<{ focus(): void }>;
}>;

export function TimeList({
  numberOfItems,
  value,
  onChange,
  className,
  onKeyDownGetter,
  keyboardNavigationRef,
  navigationStartRef,
  'data-test-id': dataTestId,
  ...rest
}: TimeListProps) {
  const { size } = useContext(CalendarContext);

  const itemsRef: RefObject<HTMLElement>[] = useMemo(
    () => new Array(numberOfItems).fill(null).map(() => createRef()),
    [numberOfItems],
  );

  useImperativeHandle(navigationStartRef, () => ({
    focus: () => {
      keyboardNavigationRef?.current?.focusItem(getDefaultItemId(value ? value : 0));
    },
  }));

  const items = useMemo<ItemProps[]>(
    () =>
      new Array(numberOfItems).fill(undefined).map((_, index) => ({
        id: index,
        content: {
          option: String(index).padStart(2, '0'),
        },
        'data-test-id': dataTestId,
        onKeyDown: onKeyDownGetter?.(index),
        itemRef: itemsRef[index],
      })),
    [dataTestId, itemsRef, numberOfItems, onKeyDownGetter],
  );

  return (
    <List
      {...extractSupportProps(rest)}
      size={size}
      items={items}
      scroll
      keyboardNavigationRef={keyboardNavigationRef}
      selection={{ mode: 'single', value, onChange }}
      className={className}
      hasListInFocusChain={false}
      scrollToSelectedItem
    />
  );
}
