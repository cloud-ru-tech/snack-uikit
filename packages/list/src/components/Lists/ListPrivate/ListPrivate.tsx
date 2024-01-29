import cn from 'classnames';
import { ForwardedRef, forwardRef, RefObject, useMemo } from 'react';

import { Spinner } from '@snack-uikit/loaders';
import { Scroll } from '@snack-uikit/scroll';
import { ToggleGroup } from '@snack-uikit/toggles';
import { extractSupportProps } from '@snack-uikit/utils';

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
      collapse = 'multiple',
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
      noData = 'No data',
      noResults = 'No results',
      size = 's',
      marker,
      ...props
    },
    ref,
  ) => {
    const itemsJSX = useRenderItems(items);
    const itemsPinTopJSX = useRenderItems(pinTop ?? []);
    const itemsPinBottomJSX = useRenderItems(pinBottom ?? []);
    const hasNoItems = items.length + (pinTop?.length ?? 0) + (pinBottom?.length ?? 0) === 0;

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
          {itemsJSX}
          {loadingJSX}
          {hasNoItems && !search?.value && !loading && (
            <div className={commonStyles.infoBlock} data-test-id='list__no-data'>
              {noData}
            </div>
          )}
          {hasNoItems && search?.value && !loading && (
            <div className={commonStyles.infoBlock} data-test-id='list__no-results'>
              {noResults}
            </div>
          )}
        </>
      ),
      [hasNoItems, itemsJSX, loading, loadingJSX, noData, noResults, search?.value],
    );

    const listJSX = (
      <ul
        className={commonStyles.listContainer}
        ref={ref as ForwardedRef<HTMLUListElement>}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onFocus={!nested ? onFocus : undefined}
        onBlur={onBlur}
        data-active={active || undefined}
        role='menu'
        {...extractSupportProps(props)}
      >
        <ToggleGroup selectionMode={collapse}>
          {(Number(pinTop?.length) > 0 || search) && (
            <PinTopGroupItem>
              {search && <SearchItem search={search} />}

              {Number(pinTop?.length) > 0 && itemsPinTopJSX}
            </PinTopGroupItem>
          )}

          {scroll ? (
            <Scroll
              className={cn({
                [commonStyles.scrollContainerS]: scroll && size === 's',
                [commonStyles.scrollContainerM]: scroll && size === 'm',
                [commonStyles.scrollContainerL]: scroll && size === 'l',
              })}
              barHideStrategy='never'
              size='s'
              ref={scrollContainerRef}
            >
              {content}

              <div className={styles.scrollStub} ref={scrollRef as RefObject<HTMLDivElement>} />
            </Scroll>
          ) : (
            <>{content}</>
          )}

          {(Number(pinBottom?.length) > 0 || footer) && (
            <PinBottomGroupItem>
              {Number(pinBottom?.length) > 0 && itemsPinBottomJSX}

              {footer && <div className={styles.footer}>{footer}</div>}
            </PinBottomGroupItem>
          )}
        </ToggleGroup>
      </ul>
    );

    if (!nested) {
      return (
        <ListContextProvider size={size} marker={marker}>
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
