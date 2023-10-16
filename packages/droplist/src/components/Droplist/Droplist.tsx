import cn from 'classnames';
import {
  Children,
  cloneElement,
  isValidElement,
  KeyboardEvent,
  ReactNode,
  RefCallback,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Scroll } from '@snack-ui/scroll';

import { SCROLL_APPLYING_ITEMS_COUNT, Size } from '../../constants';
import { Dropdown, DropdownProps } from '../Dropdown';
import { DroplistContext } from './DroplistContext';
import { useKeyboardNavigation } from './hooks';
import styles from './styles.modules.scss';

export type DroplistProps = Omit<DropdownProps, 'content' | 'children' | 'isTreeRoot'> & {
  firstElementRefCallback?: RefCallback<HTMLElement>;
  triggerElement: DropdownProps['children'];
  children: ReactNode;
  onFocusLeave?: (direction: 'common' | 'top' | 'bottom' | 'left') => void;
  size?: Size;
  scrollRef?: RefObject<HTMLElement>;
  useScroll?: boolean;
};

export function Droplist({
  triggerElement,
  children,
  firstElementRefCallback,
  onFocusLeave,
  className,
  size = Size.S,
  scrollRef,
  useScroll = true,
  open,
  closeOnEscapeKey,
  ...rest
}: DroplistProps) {
  const [focusIndex, setFocusIndex] = useState<number | undefined>();

  const { items, enabledPositions, count } = useMemo(() => {
    const enabledPositions: number[] = [];

    const items = Children.map(children, (item, position) => {
      if (isValidElement(item)) {
        const props = typeof item.props === 'object' ? item.props : {};

        if (!props.disabled) {
          enabledPositions.push(position);
        }

        return cloneElement(item, {
          ...props,
          position,
        });
      }
      return item;
    });

    return { items, enabledPositions, count: enabledPositions.length };
  }, [children]);

  const focusPosition = focusIndex !== undefined ? enabledPositions[focusIndex] : undefined;

  const setFocusPosition = useCallback(
    (position: number) => {
      const newFocusIndex = enabledPositions.indexOf(position);
      setFocusIndex(newFocusIndex >= 0 ? newFocusIndex : undefined);
    },
    [enabledPositions],
  );

  const resetFocusPosition = useCallback(() => setFocusIndex(undefined), []);

  const itemKeyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (focusIndex === undefined) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          setFocusIndex((prev = 0) => {
            if (prev >= count - 1) {
              onFocusLeave?.('bottom');
              return count - 1;
            }
            return prev + 1;
          });

          e.preventDefault();

          return;
        case 'ArrowUp':
          setFocusIndex((prev = 0) => {
            if (!prev) {
              onFocusLeave?.('top');
              return 0;
            }
            return prev - 1;
          });

          e.preventDefault();

          return;
        case 'Escape':
          if (!closeOnEscapeKey) {
            onFocusLeave?.('common');
          }
          return;
        case 'ArrowLeft':
          onFocusLeave?.('left');
          return;
        case 'Tab':
          onFocusLeave?.('common');
          e.preventDefault();
          return;
        default:
          break;
      }
    },
    [focusIndex, closeOnEscapeKey, onFocusLeave, count],
  );

  useEffect(() => {
    if (!open) {
      setFocusIndex(undefined);
    }
  }, [open]);

  const { isNested } = useContext(DroplistContext);

  const scroll = useScroll && count >= SCROLL_APPLYING_ITEMS_COUNT;

  const scrollRefInside = useRef<HTMLElement>(null);

  const resultRef = useMemo(() => (scrollRef !== undefined ? scrollRef : scrollRefInside), [scrollRef]);

  const itemsJSX = (
    <DroplistContext.Provider
      value={{
        size,
        isNested: true,
        focusPosition,
        scrollRefCurrent: resultRef?.current,
        setFocusPosition,
        resetFocusPosition,
        itemKeyDownHandler,
        firstElementRefCallback,
      }}
    >
      <Scroll
        untouchableScrollbars={true}
        className={cn({
          [styles.scrollContainerS]: scroll && size === Size.S,
          [styles.scrollContainerM]: scroll && size === Size.M,
          [styles.scrollContainerL]: scroll && size === Size.L,
        })}
        ref={resultRef}
        barHideStrategy={Scroll.barHideStrategies.Never}
        size={Scroll.sizes.S}
      >
        {items}
      </Scroll>
    </DroplistContext.Provider>
  );

  return (
    <Dropdown
      {...rest}
      open={open}
      content={itemsJSX}
      closeOnEscapeKey={!isNested}
      className={cn(className, { [styles.droplist]: isNested })}
    >
      {triggerElement}
    </Dropdown>
  );
}

Droplist.placements = Dropdown.placements;
Droplist.triggers = Dropdown.triggers;
Droplist.useKeyboardNavigation = useKeyboardNavigation;
