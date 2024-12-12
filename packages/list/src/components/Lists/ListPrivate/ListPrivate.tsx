import cn from 'classnames';
import { ForwardedRef, forwardRef, RefObject, useMemo } from 'react';

import { Spinner } from '@snack-uikit/loaders';
import { Scroll } from '@snack-uikit/scroll';
import { extractSupportProps } from '@snack-uikit/utils';

import { ListEmptyState, useEmptyState } from '../../../helperComponents';
import { PinBottomGroupItem, PinTopGroupItem, SearchItem, useRenderItems } from '../../Items';
import { useNewListContext, useSelectionContext } from '../contexts';
import commonStyles from '../styles.module.scss';
import { ListPrivateProps } from '../types';
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
      scrollContainerClassName,
      ...props
    }: ListPrivateProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { size = 's', flattenItems, focusFlattenItems } = useNewListContext();
    const { value, isSelectionSingle } = useSelectionContext();

    const itemsJSX = useRenderItems(items);
    const itemsPinTopJSX = useRenderItems(pinTop);
    const itemsPinBottomJSX = useRenderItems(pinBottom);

    const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });
    const hasNoItems = items.length === 0;

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
          {itemsJSX}
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
      [dataError, dataFiltered, emptyStates, hasNoItems, itemsJSX, loading, loadingJSX, search?.value],
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
            barHideStrategy='never'
            size={size === 's' ? 's' : 'm'}
            ref={scrollContainerRef}
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
          <div className={styles.footer} onFocus={e => e.stopPropagation()}>
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
