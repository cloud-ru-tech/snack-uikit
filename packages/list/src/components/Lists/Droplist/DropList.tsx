import { cloneElement, isValidElement, KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Dropdown } from '@snack-uikit/dropdown';

import { extractItemIds, extractItemRefs, withCollapsedItems } from '../../../utils';
import { addItemsIds, getSlicedItems, useItemsWithIds } from '../../Items';
import { extractSelectionProps, ParentListContext, SelectionProvider } from '../contexts';
import { useKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import { DroplistProps } from '../types';

export function Droplist({
  items: itemsProp,
  search,
  pinBottom,
  pinTop,
  footerActiveElementsRefs,
  children,
  trigger,
  placement,
  widthStrategy,
  triggerElemRef: triggerElemRefProp,
  open: openProp,
  onOpenChange,
  ...props
}: DroplistProps) {
  const hasSearch = useMemo(() => Boolean(search), [search]);

  const memorizedItems = useMemo(
    () => addItemsIds((pinBottom ?? []).concat(itemsProp).concat(pinTop ?? [])),
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

  const triggerElemRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const {
    activeFocusIndex,
    setActiveFocusIndex,
    openNestedIndex,
    handleListKeyDown,
    resetNestedIndex,
    resetActiveFocusIndex,
  } = useKeyboardNavigation({ ids, expandedIds, parentRef: triggerElemRefProp ?? triggerElemRef, itemRefs });

  const [open, setOpen] = useUncontrolledProp<boolean>(openProp, false, onOpenChange);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetNestedIndex();
      resetActiveFocusIndex();
      setOpenCollapsedItems([]);
    }

    setOpen(open);
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>, cb?: (e: KeyboardEvent<HTMLElement>) => void) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);

        setTimeout(() => {
          listRef.current?.focus();
          setActiveFocusIndex(0);
        }, 0);
      }

      cb?.(e);
    },
    [setActiveFocusIndex, setOpen],
  );

  const triggerElem = useMemo(() => {
    if (isValidElement(children)) {
      const props = typeof children.props === 'object' ? children.props : {};

      return cloneElement(children, {
        ...props,
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
          onKeyDown(e, children.props?.onKeyDown);
        },
      });
    }
    return children;
  }, [onKeyDown, children]);

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
          triggerRef: triggerElemRefProp ?? triggerElemRef,
          parentRef: listRef,
          parentResetNestedIndex: resetNestedIndex,
          parentResetActiveFocusIndex: resetActiveFocusIndex,
          toggleOpenCollapsedItems: id =>
            setOpenCollapsedItems(items =>
              items.includes(id) ? items.filter(item => item !== id) : items.concat([id]),
            ),
        }}
      >
        <Dropdown
          content={
            <ListPrivate
              onKeyDown={handleListKeyDown}
              tabIndex={0}
              ref={listRef}
              search={search}
              {...slicedItems}
              {...props}
            />
          }
          trigger={trigger}
          placement={placement}
          widthStrategy={widthStrategy}
          {...(triggerElemRefProp
            ? {}
            : {
                triggerRef: triggerElemRef,
              })}
          open={open}
          onOpenChange={handleOpenChange}
        >
          {triggerElem}
        </Dropdown>
      </ParentListContext.Provider>
    </SelectionProvider>
  );
}
