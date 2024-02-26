import cn from 'classnames';
import { Children, KeyboardEvent, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { Divider } from '@snack-uikit/divider';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TYPE } from '../../constants';
import { TabBarContext, useTabsContext } from '../../context';
import { ScrollButton } from '../ScrollButton';
import { TabProps } from '../Tab';
import { useFocusControl, useScrollContainer } from './hooks';
import styles from './styles.module.scss';

export type TabBarProps = WithSupportProps<
  {
    /** Контент (элементы Tabs.Tab) */
    children: ReactElement<TabProps>[];

    /** Дополнительный слот для кастомного контента справа от табов */
    after?: ReactNode;

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

type MarkerPosition = {
  left: number;
  width: number;
};

export function TabBar({ children, className, type = TYPE.Primary, after, ...otherProps }: TabBarProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const { selectedTab, setSelectedTab } = useTabsContext();
  const { hasOverflow, scrollLeft, scrollRight } = useScrollContainer(scrollContainerRef);
  const selectedRef = useRef<HTMLButtonElement>();
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({ left: 0, width: 0 });
  const [focusedTab, setFocusedTab] = useState<string | undefined>();

  useEffect(() => {
    /** Если "сверху" нет указания какой таб выбран, триггерим выбор первого доступного */
    if (!selectedTab) {
      const firsEnabled = Children.map(children, ({ props }) => props).find(({ disabled }) => !disabled);
      firsEnabled && setSelectedTab(firsEnabled.value);
    }
  }, [children, selectedTab, setSelectedTab]);

  const updateMarkPosition = useCallback((element: HTMLButtonElement) => {
    setMarkerPosition({
      left: element.offsetLeft,
      width: element.offsetWidth,
    });
    selectedRef.current = element;
  }, []);

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
  }, [type, updateMarkPosition]);

  const scrollContainerToElement = useCallback((element: HTMLElement) => {
    const container = scrollContainerRef.current;

    if (element && container) {
      const overflowLeft = element.offsetLeft < container.scrollLeft;
      const overflowRight = element.offsetLeft + element.offsetWidth > container.scrollLeft + container.offsetWidth;

      if (overflowLeft || overflowRight) {
        const count = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
        container.scroll({ left: count, behavior: 'smooth' });
      }
    }
  }, []);

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
      if (newFocusTab) {
        e.preventDefault();
        setFocusedTab(newFocusTab);
      }
    },
    [getPrev, focusedTab, selectedTab, getNext, setFocusedTab],
  );

  return (
    <div className={cn(styles.tabBar, className)} role='tablist' {...extractSupportProps(otherProps)}>
      {!otherProps.disableDivider && <Divider weight='regular' className={styles.divider} />}
      <div className={styles.tabBarMain} data-test-id='tabs__bar-wrap'>
        <ScrollContainer className={styles.scrollContainer} innerRef={scrollContainerRef}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className={styles.tabsRow} data-type={type} onKeyDown={handleKeyDown}>
            <TabBarContext.Provider value={{ onSelect: onSelectHandler, type, focusedTab, onFocus: onFocusHandler }}>
              {children}
            </TabBarContext.Provider>

            <div className={styles.marker} style={markerPosition} data-type={type} />
          </div>
        </ScrollContainer>

        {hasOverflow.left && <ScrollButton direction='left' onClick={scrollLeft} type={type} />}
        {hasOverflow.right && <ScrollButton direction='right' onClick={scrollRight} type={type} />}
      </div>

      {after && <div data-test-id='tabs__bar__after'>{after}</div>}
    </div>
  );
}
