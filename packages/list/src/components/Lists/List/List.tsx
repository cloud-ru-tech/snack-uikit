import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ForwardedRef, forwardRef, KeyboardEvent, useCallback, useMemo, useRef } from 'react';

import { isBrowser, useValueControl } from '@snack-uikit/utils';

import { ITEM_PREFIXES } from '../../../constants';
import { HiddenTabButton } from '../../../helperComponents';
import { extractActiveItems, ItemId, kindFlattenItems, useCreateBaseItems } from '../../Items';
import { CollapseContext, FocusListContext, NewListContextProvider, SelectionProvider } from '../contexts';
import { useNewKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import styles from '../styles.module.scss';
import { ListProps } from '../types';

export const List = forwardRef(
  (
    {
      items: itemsProp = [],
      search,
      pinBottom: pinBottomProp = [],
      pinTop: pinTopProp = [],
      footerActiveElementsRefs,
      onKeyDown,
      tabIndex = 0,
      className,
      collapse = {},
      selection,
      contentRender,
      size = 's',
      marker = true,
      keyboardNavigationRef,
      hasListInFocusChain = true,
      ...props
    }: ListProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const hasSearch = useMemo(() => Boolean(search), [search]);

    const [openCollapseItems = [], setOpenCollapsedItems] = useValueControl<ItemId[] | undefined>(collapse);
    const toggleOpenCollapseItem = useCallback(
      (id: ItemId) =>
        setOpenCollapsedItems((items: ItemId[]) =>
          items?.includes(id) ? items.filter(item => item !== id) : (items ?? []).concat([id]),
        ),
      [setOpenCollapsedItems],
    );

    const { searchItem, footerItems } = useCreateBaseItems({ footerActiveElementsRefs });

    /**
     * Объект с пропсами всех вложенных айтемов; ключ id
     */
    const { flattenItems, focusFlattenItems, ...memorizedItems } = useMemo(() => {
      const pinTop = kindFlattenItems({
        items: pinTopProp,
        prefix: ITEM_PREFIXES.pinTop,
        parentId: ITEM_PREFIXES.default,
      });
      const items = kindFlattenItems({
        items: itemsProp,
        prefix: ITEM_PREFIXES.default,
        parentId: ITEM_PREFIXES.default,
      });
      const pinBottom = kindFlattenItems({
        items: pinBottomProp,
        prefix: ITEM_PREFIXES.pinBottom,
        parentId: ITEM_PREFIXES.default,
      });

      const flattenItems = { ...pinTop.flattenItems, ...pinBottom.flattenItems, ...items.flattenItems };
      const focusFlattenItems = {
        ...pinTop.focusFlattenItems,
        ...pinBottom.focusFlattenItems,
        ...items.focusFlattenItems,
      };

      [...footerItems, searchItem].forEach(item => {
        flattenItems[item.id] = item;
        focusFlattenItems[item.id] = { ...item, originalId: item.id, items: [], key: item.id, allChildIds: [] };
      });

      return { items, pinTop, pinBottom, flattenItems, focusFlattenItems };
    }, [itemsProp, pinTopProp, pinBottomProp, searchItem, footerItems]);

    const { ids, expandedIds } = useMemo(() => {
      const { pinTop, items, pinBottom } = memorizedItems;

      let ids: ItemId[] = [];
      let expandedIds: ItemId[] = [];

      if (hasSearch) {
        ids.push(searchItem.id);
      }

      [pinTop, items, pinBottom].forEach(({ focusFlattenItems, focusCloseChildIds }) => {
        const activeItems = extractActiveItems({
          focusFlattenItems,
          focusCloseChildIds,
          openCollapseItems,
          isSelectionMultiple: selection?.mode === 'multiple',
        });

        ids = ids.concat(activeItems.ids);
        expandedIds = expandedIds.concat(activeItems.expandedIds);
      });

      footerItems.forEach(footerItem => {
        ids.push(footerItem.id);
      });

      return {
        ids,
        expandedIds,
      };
    }, [footerItems, hasSearch, memorizedItems, openCollapseItems, searchItem.id, selection?.mode]);

    const listRef = useRef<HTMLElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const firstItemId = ids[0];

    const { handleListKeyDownFactory, activeItemId, resetActiveItemId, forceUpdateActiveItemId } =
      useNewKeyboardNavigation({
        mainRef: listRef,
        btnRef,
        focusFlattenItems,
        keyboardNavigationRef,
        hasListInFocusChain,
        firstItemId,
      });

    const handleListKeyDown = useCallback(
      (e: KeyboardEvent<HTMLElement>) => handleListKeyDownFactory(ids, expandedIds)(e),
      [handleListKeyDownFactory, ids, expandedIds],
    );

    const isActive = isBrowser() && listRef.current === document.activeElement && activeItemId === undefined;

    const mergedHandlerKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(e);
      handleListKeyDown?.(e);
    };

    const handleOnFocus = () => {
      resetActiveItemId();
    };

    return (
      <NewListContextProvider
        flattenItems={flattenItems}
        focusFlattenItems={focusFlattenItems}
        contentRender={contentRender}
        size={size}
        marker={marker}
        firstItemId={firstItemId}
        virtualized={props.virtualized}
      >
        <SelectionProvider {...selection}>
          <CollapseContext.Provider
            value={{
              openCollapseItems,
              toggleOpenCollapseItem,
            }}
          >
            <FocusListContext.Provider
              value={{
                activeItemId,
                handleListKeyDownFactory,
                forceUpdateActiveItemId,
              }}
            >
              <div className={cn(styles.wrapper, className)} data-active={isActive || undefined}>
                <ListPrivate
                  {...props}
                  items={memorizedItems.items.focusCloseChildIds}
                  pinTop={memorizedItems.pinTop.focusCloseChildIds}
                  pinBottom={memorizedItems.pinBottom.focusCloseChildIds}
                  searchItem={searchItem}
                  ref={mergeRefs(ref, listRef)}
                  onFocus={handleOnFocus}
                  onKeyDown={mergedHandlerKeyDown}
                  tabIndex={hasListInFocusChain ? tabIndex : undefined}
                  search={search}
                  nested={false}
                />

                {hasListInFocusChain && <HiddenTabButton ref={btnRef} listRef={listRef} tabIndex={tabIndex} />}
              </div>
            </FocusListContext.Provider>
          </CollapseContext.Provider>
        </SelectionProvider>
      </NewListContextProvider>
    );
  },
);
