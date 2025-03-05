import { useVirtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import { ForwardedRef, forwardRef, RefObject, useEffect, useMemo, useRef } from 'react';

import { Spinner } from '@snack-uikit/loaders';
import { Scroll } from '@snack-uikit/scroll';
import { extractSupportProps } from '@snack-uikit/utils';

import { ListEmptyState, useEmptyState } from '../../../helperComponents';
import { stopPropagation } from '../../../utils';
import { PinBottomGroupItem, PinTopGroupItem, SearchItem, useRenderItems } from '../../Items';
import { useNewListContext, useSelectionContext } from '../contexts';
import commonStyles from '../styles.module.scss';
import { ListPrivateProps } from '../types';
import { ALL_SIZES } from './constants';
import styles from './styles.module.scss';

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

    const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });
    const hasNoItems = items.length === 0;

    const virtualizer = useVirtualizer({
      count: itemsJSX.length,
      getScrollElement: () => (scroll ? innerScrollRef.current : null),
      estimateSize: () => ALL_SIZES[size],
      enabled: virtualized,
    });
    const virtualItems = virtualizer.getVirtualItems();

    useEffect(() => {
      virtualizer.measure();
    }, [virtualizer]);

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
        <div className={styles.content}>
          {virtualized ? (
            <div className={styles.virtualizedContainer} style={{ height: virtualizer.getTotalSize() }} tabIndex={-1}>
              <div
                className={styles.virtualizedPositionBox}
                style={{ transform: `translateY(${virtualItems[0]?.start ?? 0}px)` }}
                tabIndex={-1}
              >
                {virtualItems.map(virtualRow => (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    tabIndex={-1}
                  >
                    {itemsJSX[virtualRow.index]}
                  </div>
                ))}
              </div>
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
          />
        </div>
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
        virtualItems,
        virtualized,
        virtualizer,
      ],
    );

    const onScrollInitialized = () => {
      if (scrollToSelectedItem) {
        if (!value) {
          return;
        }

        const selectedItem = isSelectionSingle ? flattenItems[value] : flattenItems[value[0]];

        if (!selectedItem?.id) {
          return;
        }

        const itemToScrollTo = Object.values(focusFlattenItems).find(item => item.originalId === selectedItem.id);
        itemToScrollTo?.itemRef?.current?.scrollIntoView({ block: 'center' });
      }
    };

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
            ref={ref => {
              innerScrollRef.current = ref;
              if (scrollContainerRef) (scrollContainerRef as React.MutableRefObject<HTMLElement | null>).current = ref;
            }}
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
