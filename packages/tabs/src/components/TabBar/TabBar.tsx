import cn from 'classnames';
import { Children, KeyboardEvent, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { Divider } from '@snack-uikit/divider';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MARKER_POSITION, ORIENTATION, TYPE } from '../../constants';
import { TabBarContext, useTabsContext } from '../../context';
import { MarkerPosition, Orientation } from '../../types';
import { ScrollButton } from '../ScrollButton';
import { TabProps } from '../Tab';
import { useFocusControl, useScrollContainer } from './hooks';
import styles from './styles.module.scss';

const SCROLL_CONTAINER_ORIENTATION_MAP = {
  [ORIENTATION.Horizontal]: styles.horizontalScrollContainer,
  [ORIENTATION.Vertical]: styles.verticalScrollContainer,
};

export type TabBarProps = WithSupportProps<
  {
    /** Контент (элементы Tabs.Tab) */
    children: ReactElement<TabProps>[];

    /** Дополнительный слот для кастомного контента справа от табов */
    after?: ReactNode;

    /** Ориентация */
    orientation?: Orientation;

    /** Позиция маркера  */
    markerPosition?: MarkerPosition;

    className?: string;
  } & (
    | {
        /**
         * Тип панели табов: @default "primary"
         * <br> - `Primary` - когда панель табов является верхнеуровневым элементом страницы, замещающим заголовок.
         * <br> - `Secondary` - когда панель табов расположена на том же уровне что и остальной контент
         */
        type?: typeof TYPE.Primary;
        disableDivider?: never;
      }
    | {
        type: typeof TYPE.Secondary;
        disableDivider?: boolean;
      }
  )
>;

type MarkerScrollPosition = {
  left?: number;
  width?: number;
  height?: number;
  top?: number;
};

export function TabBar({
  children,
  className,
  type = TYPE.Primary,
  orientation = ORIENTATION.Horizontal,
  markerPosition = MARKER_POSITION.After,
  after,
  ...otherProps
}: TabBarProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const { selectedTab, setSelectedTab } = useTabsContext();
  const { hasOverflow, scrollLeft, scrollRight, scrollTop, scrollBottom } = useScrollContainer(scrollContainerRef);
  const selectedRef = useRef<HTMLButtonElement>();
  const [markerScrollPosition, setMarkerScrollPosition] = useState<MarkerScrollPosition>({});
  const [focusedTab, setFocusedTab] = useState<string | undefined>();

  useEffect(() => {
    /** Если "сверху" нет указания какой таб выбран, триггерим выбор первого доступного */
    if (!selectedTab) {
      const firsEnabled = Children.map(children, ({ props }) => props).find(({ disabled }) => !disabled);
      firsEnabled && setSelectedTab(firsEnabled.value);
    }
  }, [children, selectedTab, setSelectedTab]);

  const updateMarkPosition = useCallback(
    (element: HTMLButtonElement) => {
      if (orientation === 'horizontal') {
        setMarkerScrollPosition({
          left: element.offsetLeft,
          width: element.offsetWidth,
        });
      } else {
        setMarkerScrollPosition({
          top: element.offsetTop,
          height: element.offsetHeight,
        });
      }
      selectedRef.current = element;
    },
    [orientation],
  );

  useEffect(() => {
    if (!selectedRef.current) {
      return;
    }

    const updatePosition = () => selectedRef.current && updateMarkPosition(selectedRef.current);
    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(selectedRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, type, updateMarkPosition]);

  const scrollContainerToElement = useCallback(
    (element: HTMLElement) => {
      const container = scrollContainerRef.current;

      if (element && container) {
        if (orientation === 'vertical') {
          const overflowTop = element.offsetTop < container.scrollTop;
          const overflowBottom =
            element.offsetTop + element.offsetHeight > container.scrollTop + container.offsetHeight;

          if (overflowTop || overflowBottom) {
            const count = element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
            container.scroll({ top: count, behavior: 'smooth' });
          }
          return;
        }

        const overflowLeft = element.offsetLeft < container.scrollLeft;
        const overflowRight = element.offsetLeft + element.offsetWidth > container.scrollLeft + container.offsetWidth;

        if (overflowLeft || overflowRight) {
          const count = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
          container.scroll({ left: count, behavior: 'smooth' });
        }
      }
    },
    [orientation],
  );

  const onSelectHandler = useCallback(
    (element: HTMLButtonElement) => {
      updateMarkPosition(element);
      scrollContainerToElement(element);
    },
    [scrollContainerToElement, updateMarkPosition],
  );

  const onFocusHandler = useCallback(
    (element: HTMLButtonElement, value: string) => {
      setFocusedTab(value);
      scrollContainerToElement(element);
    },
    [scrollContainerToElement],
  );

  const [getPrev, getNext] = useFocusControl(children);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let newFocusTab: string | undefined;
      if (e.key === 'ArrowRight') newFocusTab = getNext(focusedTab || selectedTab);
      if (e.key === 'ArrowLeft') newFocusTab = getPrev(focusedTab || selectedTab);
      if (e.key === 'ArrowUp') newFocusTab = getPrev(focusedTab || selectedTab);
      if (e.key === 'ArrowDown') newFocusTab = getNext(focusedTab || selectedTab);
      if (newFocusTab) {
        e.preventDefault();
        setFocusedTab(newFocusTab);
      }
    },
    [getPrev, focusedTab, selectedTab, getNext, setFocusedTab],
  );

  return (
    <div
      className={cn(styles.tabBar, className)}
      role='tablist'
      data-orientation={orientation}
      {...extractSupportProps(otherProps)}
    >
      {!otherProps.disableDivider && (
        <Divider weight='regular' orientation={orientation} data-position={markerPosition} className={styles.divider} />
      )}
      <div className={styles.tabBarMain} data-test-id='tabs__bar-wrap'>
        <ScrollContainer className={SCROLL_CONTAINER_ORIENTATION_MAP[orientation]} innerRef={scrollContainerRef}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className={styles.tabsRow} data-type={type} data-orientation={orientation} onKeyDown={handleKeyDown}>
            <TabBarContext.Provider
              value={{ onSelect: onSelectHandler, type, orientation, focusedTab, onFocus: onFocusHandler }}
            >
              {children}
            </TabBarContext.Provider>

            <div
              className={styles.marker}
              style={markerScrollPosition}
              data-position={markerPosition}
              data-orientation={orientation}
            />
          </div>
        </ScrollContainer>

        {hasOverflow.left && (
          <ScrollButton direction='left' onClick={scrollLeft} orientation={orientation} type={type} />
        )}
        {hasOverflow.right && (
          <ScrollButton direction='right' onClick={scrollRight} orientation={orientation} type={type} />
        )}
        {hasOverflow.top && <ScrollButton direction='top' onClick={scrollTop} orientation={orientation} type={type} />}
        {hasOverflow.bottom && (
          <ScrollButton direction='bottom' onClick={scrollBottom} orientation={orientation} type={type} />
        )}
      </div>

      {after && (
        <div
          data-test-id='tabs__bar__after'
          data-orientation={orientation}
          data-type={type}
          className={styles.tabBarAfter}
        >
          {after}
        </div>
      )}
    </div>
  );
}
