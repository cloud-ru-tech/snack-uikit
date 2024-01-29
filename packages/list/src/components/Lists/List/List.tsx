import { forwardRef, useMemo, useRef, useState } from 'react';

import { HiddenTabButton } from '../../../helperComponents';
import { extractItemIds, extractItemRefs, withCollapsedItems } from '../../../utils';
import { addItemsIds, getSlicedItems, useItemsWithIds } from '../../Items';
import { extractSelectionProps, ParentListContext, SelectionProvider, useParentListContext } from '../contexts';
import { useKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import styles from '../styles.module.scss';
import { ListProps } from '../types';

export const List = forwardRef<HTMLElement, ListProps>(
  ({ items: itemsProp, search, pinBottom, pinTop, footerActiveElementsRefs, ...props }) => {
    const hasSearch = useMemo(() => Boolean(search), [search]);

    const memorizedItems = useMemo(
      () => addItemsIds((pinTop ?? []).concat(itemsProp).concat(pinBottom ?? [])),
      [itemsProp, pinBottom, pinTop],
    );

    const [openCollapsedItems, setOpenCollapsedItems] = useState<Array<number | string>>([]);

    const { search: searchItem, footerRefs } = useItemsWithIds({
      search: hasSearch,
      footerActiveElementsRefs,
    });

    const { items, itemRefs, ids, expandedIds } = useMemo(() => {
      const res = withCollapsedItems({
        items: memorizedItems,
        openCollapsedItems,
      });

      const items = searchItem.concat(res.items).concat(footerRefs);

      return {
        items,
        ids: extractItemIds(searchItem).concat(res.ids).concat(extractItemIds(footerRefs)),
        itemRefs: extractItemRefs(searchItem).concat(res.itemRefs).concat(extractItemRefs(footerRefs)),
        expandedIds: res.expandedIds,
      };
    }, [footerRefs, memorizedItems, openCollapsedItems, searchItem]);

    const slicedItems = useMemo(
      () => getSlicedItems(items, hasSearch, pinTop?.length || 0, pinBottom?.length || 0, footerRefs.length),

      [items, hasSearch, pinTop?.length, pinBottom?.length, footerRefs.length],
    );

    const listRef = useRef<HTMLUListElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const { triggerRef } = useParentListContext();

    const {
      activeFocusIndex,
      openNestedIndex,
      handleListKeyDown,
      resetNestedIndex,
      resetActiveFocusIndex,
      setActiveFocusIndex,
    } = useKeyboardNavigation({
      ids,
      expandedIds,
      parentRef: listRef,
      btnRef,
      itemRefs,
    });

    const isActive = listRef.current === document.activeElement && activeFocusIndex === -1 && openNestedIndex === -1;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <SelectionProvider {...extractSelectionProps(props)}>
        <ParentListContext.Provider
          value={{
            parentIds: ids,
            parentActiveFocusIndex: activeFocusIndex,
            parentExpandedIds: expandedIds,
            parentItemRefs: itemRefs,
            parentOpenNestedIndex: openNestedIndex,
            triggerRef: triggerRef ?? listRef,
            parentRef: listRef,

            parentSetActiveFocusIndex: setActiveFocusIndex,
            parentResetNestedIndex: resetNestedIndex,
            parentResetActiveFocusIndex: resetActiveFocusIndex,
            openCollapsedItems,
            toggleOpenCollapsedItems: id =>
              setOpenCollapsedItems(items =>
                items.includes(id) ? items.filter(item => item !== id) : items.concat([id]),
              ),
          }}
        >
          <div className={styles.wrapper} data-active={isActive || undefined}>
            <ListPrivate
              {...props}
              {...slicedItems}
              ref={listRef}
              onFocus={e => {
                if (
                  e.relatedTarget === null ||
                  (e.relatedTarget && itemRefs.every(({ current }) => current !== e.relatedTarget))
                ) {
                  resetActiveFocusIndex();
                }
              }}
              onKeyDown={handleListKeyDown}
              tabIndex={0}
              search={search}
              nested={false}
            />

            <HiddenTabButton ref={btnRef} listRef={listRef} />
          </div>
        </ParentListContext.Provider>
      </SelectionProvider>
    );
  },
);