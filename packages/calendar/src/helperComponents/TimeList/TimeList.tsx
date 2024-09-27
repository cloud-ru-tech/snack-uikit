import { KeyboardEventHandler, useContext, useEffect, useRef } from 'react';

import { List, ListProps } from '@snack-uikit/list';
import { isBrowser, WithSupportProps } from '@snack-uikit/utils';

import { CalendarContext } from '../CalendarContext';

export type TimeListProps = WithSupportProps<{
  numberOfItems: number;
  value?: number;
  onChange(value: number): void;
  className?: string;
  onKeyDown?: KeyboardEventHandler;
  keyboardNavigationRef?: ListProps['keyboardNavigationRef'];
}>;

export function TimeList({
  numberOfItems,
  value,
  onChange,
  className,
  onKeyDown,
  keyboardNavigationRef,
  ...rest
}: TimeListProps) {
  const { size } = useContext(CalendarContext);

  const valueRef = useRef(value);
  const dataTestId = rest['data-test-id'];

  useEffect(() => {
    const value = valueRef.current;

    if (value) {
      value && isBrowser() && document.querySelectorAll(`[data-test-id="${dataTestId}"]`)[value]?.scrollIntoView();
    }
  }, [dataTestId]);

  return (
    <List
      size={size}
      items={new Array(numberOfItems).fill(undefined).map((_, index) => ({
        id: index,
        content: {
          option: index,
        },
        'data-test-id': `${dataTestId}`,
        onKeyDown,
      }))}
      scroll
      keyboardNavigationRef={keyboardNavigationRef}
      selection={{ mode: 'single', value, onChange }}
      className={className}
    />
  );
}
