import cn from 'classnames';
import { ForwardedRef, forwardRef, RefObject, useMemo } from 'react';

import { Spinner } from '@snack-uikit/loaders';
import { Scroll } from '@snack-uikit/scroll';
import { ToggleGroup } from '@snack-uikit/toggles';
import { extractSupportProps } from '@snack-uikit/utils';

import { ListEmptyState, useEmptyState } from '../../../helperComponents';
import { PinBottomGroupItem, PinTopGroupItem, SearchItem, useRenderItems } from '../../Items';
import { ListContextProvider } from '../contexts';
import commonStyles from '../styles.module.scss';
import { ListPrivateProps } from '../types';
import styles from './styles.module.scss';

export const ListPrivate = forwardRef<HTMLElement, ListPrivateProps>(
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
      scrollRef,
      scrollContainerRef,
      footer,
      loading,
      size = 's',
      marker,
      limitedScrollHeight,
      className,
      parent = 'list',
      noDataState,
      noResultsState,
      errorDataState,
      dataError,
      dataFiltered,
      ...props
    },
    ref,
  ) => {
    const itemsJSX = useRenderItems(items);
    const itemsPinTopJSX = useRenderItems(pinTop ?? []);
    const itemsPinBottomJSX = useRenderItems(pinBottom ?? []);

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
            itemsLength={items.length}
            dataFiltered={dataFiltered}
          />
        </div>
      ),
      [dataError, dataFiltered, emptyStates, items.length, itemsJSX, loading, loadingJSX],
    );

    const listJSX = (
      <ul
        className={cn(commonStyles.listContainer, className)}
        ref={ref as ForwardedRef<HTMLUListElement>}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onFocus={!nested ? onFocus : undefined}
        onBlur={onBlur}
        data-active={active || undefined}
        role='menu'
        {...extractSupportProps(props)}
      >
        <ToggleGroup selectionMode={'multiple'}>
          {(Number(pinTop?.length) > 0 || search) && (
            <PinTopGroupItem>
              {search && <SearchItem search={search} />}

              {Number(pinTop?.length) > 0 && itemsPinTopJSX}
            </PinTopGroupItem>
          )}

          {scroll ? (
            <Scroll
              className={cn({
                [commonStyles.scrollContainerS]: scroll && limitedScrollHeight && size === 's',
                [commonStyles.scrollContainerM]: scroll && limitedScrollHeight && size === 'm',
                [commonStyles.scrollContainerL]: scroll && limitedScrollHeight && size === 'l',
              })}
              barHideStrategy='never'
              size={size === 's' ? 's' : 'm'}
              ref={scrollContainerRef}
            >
              {content}

              <div className={styles.scrollStub} ref={scrollRef as RefObject<HTMLDivElement>} />
            </Scroll>
          ) : (
            <>{content}</>
          )}

          {Number(pinBottom?.length) > 0 && <PinBottomGroupItem>{itemsPinBottomJSX}</PinBottomGroupItem>}

          {footer && <div className={styles.footer}>{footer}</div>}
        </ToggleGroup>
      </ul>
    );

    if (!nested) {
      return (
        <ListContextProvider size={size} marker={marker} parent={parent}>
          {listJSX}
        </ListContextProvider>
      );
    }

    return (
      <li style={{ listStyleType: 'none' }} role='menuitem'>
        {listJSX}
      </li>
    );
  },
);
