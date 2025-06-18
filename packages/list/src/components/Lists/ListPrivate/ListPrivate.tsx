import { useVirtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ForwardedRef, forwardRef, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Spinner } from '@snack-uikit/loaders';
import { Scroll } from '@snack-uikit/scroll';
import { extractSupportProps } from '@snack-uikit/utils';

import { ListEmptyState, useEmptyState } from '../../../helperComponents';
import { stopPropagation } from '../../../utils';
import { ItemId, PinBottomGroupItem, PinTopGroupItem, SearchItem, useRenderItems } from '../../Items';
import { useNewListContext, useSelectionContext } from '../contexts';
import commonStyles from '../styles.module.scss';
import { ListPrivateProps } from '../types';
import { ALL_SIZES } from './constants';
import styles from './styles.module.scss';

type ScrollState = {
  virtualizer: ItemId | null;
  browser: ItemId | null;
  measured: boolean;
};

export const ListPrivate = forwardRef(
  (
    {
      items,
      pinTop,
      pinBottom,
      onKeyDown,
      onBlur,
      onFocus,
      tabIndex,
      active,
      scroll,
      nested,
      search,
      searchItem,
      scrollRef,
      scrollContainerRef,
      onScroll,
      footer,
      loading,
      limitedScrollHeight,
      untouchableScrollbars,
      className,
      noDataState,
      noResultsState,
      errorDataState,
      dataError,
      dataFiltered,
      scrollToSelectedItem = false,
      virtualized = false,
      scrollContainerClassName,
      barHideStrategy = 'never',
      ...props
    }: ListPrivateProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { size = 's', flattenItems, focusFlattenItems } = useNewListContext();
    const { value, isSelectionSingle } = useSelectionContext();
    const innerScrollRef = useRef<HTMLElement | null>(null);

    const itemsJSX = useRenderItems(items);
    const itemsPinTopJSX = useRenderItems(pinTop);
    const itemsPinBottomJSX = useRenderItems(pinBottom);

    const [scrollState, setScrollState] = useState<ScrollState>({ virtualizer: null, browser: null, measured: false });

    const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });
    const hasNoItems = items.length === 0;

    const { selectedItemIndex, selectedItem } = useMemo(() => {
      const result = {
        selectedItemIndex: -1,
        selectedItem: undefined,
      };

      if (!scrollToSelectedItem || !value) {
        return result;
      }

      const selectedItem = isSelectionSingle ? flattenItems[value] : flattenItems[value[0]];
      if (!selectedItem?.id) {
        return result;
      }

      const allFocusFlattenItems = Object.values(focusFlattenItems);
      const index = allFocusFlattenItems.findIndex(item => item.originalId === selectedItem.id);
      if (index < 0) {
        return result;
      }

      return {
        selectedItemIndex: index,
        selectedItem: allFocusFlattenItems[index],
      };
    }, [flattenItems, focusFlattenItems, isSelectionSingle, scrollToSelectedItem, value]);

    const virtualizer = useVirtualizer({
      count: itemsJSX.length,
      getScrollElement: () => (scroll ? innerScrollRef.current : null),
      estimateSize: () => ALL_SIZES[size],
      enabled: virtualized,
      overscan: 5, // Amount of elements in DOM before/after visible ones
    });
    const virtualItems = virtualizer.getVirtualItems();

    useEffect(() => {
      if (scrollState.measured) {
        return;
      }

      virtualizer.measure(); // TODO: перезамерять размер

      setScrollState(prevState => ({
        ...prevState,
        measured: true,
      }));
    }, [scrollState.measured, virtualizer]);

    const isScrollToItemEnabled = scroll && scrollToSelectedItem && virtualized;

    useEffect(() => {
      if (isScrollToItemEnabled) {
        if (!scrollState.measured) {
          return; // Not measured yet
        }
        if (selectedItemIndex < 0 || !selectedItem) {
          return; // Cannot scroll to non-existing item
        }
        if (scrollState.virtualizer === selectedItem.originalId) {
          return; // No need to re-scroll to the same item during re-renders
        }
        if (selectedItem?.itemRef && innerScrollRef.current?.contains(selectedItem?.itemRef.current)) {
          return; // No need to scroll to manually clicked item currently present in DOM
        }

        virtualizer.scrollToIndex(selectedItemIndex, { align: 'center' });

        setScrollState(prevState => ({
          ...prevState,
          virtualizer: selectedItem.originalId,
        }));
      }
    }, [isScrollToItemEnabled, scrollState, selectedItem, selectedItemIndex, virtualizer]);

    const isTargetPresentInDom = Boolean(selectedItem?.itemRef?.current);

    useEffect(() => {
      if (!selectedItem) {
        return;
      }
      if (scrollState.virtualizer === null) {
        return; // Not scrolled by virtualizer yet, no need for additional scroll
      }
      if (!isTargetPresentInDom) {
        return; // Target element is not present in DOM yet, additional scroll does not work without it
      }
      if (scrollState.virtualizer === scrollState.browser) {
        return; // Virtualizer scroll has not been executed => no need for additional scroll
      }

      selectedItem.itemRef?.current?.scrollIntoView({ block: 'center' });

      setScrollState(prevState => ({
        ...prevState,
        browser: selectedItem.originalId,
      }));
    }, [scrollState, selectedItem, isTargetPresentInDom, selectedItemIndex]);

    const loadingJSX = useMemo(
      () =>
        loading && (
          <div
            role={'spinbutton'}
            tabIndex={-1}
            className={styles.loader}
            data-size={size}
            data-no-items={hasNoItems || undefined}
            data-test-id='list__loader'
          >
            <Spinner size={size === 'l' ? 's' : 'xs'} />
          </div>
        ),
      [hasNoItems, loading, size],
    );

    const content = useMemo(
      () => (
        <>
          {virtualized ? (
            <div className={styles.virtualizedContainer} style={{ height: virtualizer.getTotalSize() }} tabIndex={-1}>
              {virtualItems.map(virtualRow => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  tabIndex={-1}
                  className={styles.virtualizedPositionBox}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {itemsJSX[virtualRow.index]}
                </div>
              ))}
            </div>
          ) : (
            itemsJSX
          )}
          {loadingJSX}

          <ListEmptyState
            loading={loading}
            dataError={dataError}
            emptyStates={emptyStates}
            hasNoItems={hasNoItems}
            dataFiltered={dataFiltered ?? Boolean(search?.value)}
            size={size}
          />
        </>
      ),
      [
        dataError,
        dataFiltered,
        emptyStates,
        hasNoItems,
        itemsJSX,
        loading,
        loadingJSX,
        search?.value,
        size,
        virtualItems,
        virtualized,
        virtualizer,
      ],
    );

    const onScrollInitialized = useCallback(() => {
      if (!selectedItem) {
        return;
      }

      selectedItem?.itemRef?.current?.scrollIntoView({ block: 'center' });
    }, [selectedItem]);

    const listJSX = (
      <ul
        className={cn(commonStyles.listContainer, className)}
        ref={ref as ForwardedRef<HTMLUListElement>}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onBlur={onBlur}
        data-active={active || undefined}
        role='menu'
        {...extractSupportProps(props)}
      >
        {(Number(pinTop?.length) > 0 || search) && (
          <PinTopGroupItem>
            {search && <SearchItem search={search} {...searchItem} />}

            {Number(pinTop?.length) > 0 && itemsPinTopJSX}
          </PinTopGroupItem>
        )}

        {scroll ? (
          <Scroll
            className={cn(
              {
                [commonStyles.scrollContainerS]: scroll && limitedScrollHeight && size === 's',
                [commonStyles.scrollContainerM]: scroll && limitedScrollHeight && size === 'm',
                [commonStyles.scrollContainerL]: scroll && limitedScrollHeight && size === 'l',
              },
              scrollContainerClassName,
            )}
            barHideStrategy={barHideStrategy}
            size={size === 's' ? 's' : 'm'}
            ref={mergeRefs(innerScrollRef, scrollContainerRef)}
            untouchableScrollbars={untouchableScrollbars}
            onScroll={onScroll}
            onInitialized={onScrollInitialized}
          >
            {content}

            <div className={styles.scrollStub} ref={scrollRef as RefObject<HTMLDivElement>} />
          </Scroll>
        ) : (
          <>{content}</>
        )}

        {Number(pinBottom?.length) > 0 && <PinBottomGroupItem>{itemsPinBottomJSX}</PinBottomGroupItem>}

        {footer && (
          <div className={styles.footer} onFocus={stopPropagation}>
            {footer}
          </div>
        )}
      </ul>
    );

    if (!nested) {
      return listJSX;
    }

    return (
      <li style={{ listStyleType: 'none' }} role='menuitem'>
        {listJSX}
      </li>
    );
  },
);
