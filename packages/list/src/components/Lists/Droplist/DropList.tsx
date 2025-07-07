import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { cloneElement, isValidElement, KeyboardEvent, ReactNode, useCallback, useMemo, useRef } from 'react';

import { Dropdown, DropdownProps } from '@snack-uikit/dropdown';
import { useValueControl } from '@snack-uikit/utils';

import { ITEM_PREFIXES } from '../../../constants';
import { extractActiveItems, ItemId, kindFlattenItems, useCreateBaseItems } from '../../Items';
import {
  CollapseContext,
  FocusListContext,
  NewListContextProvider,
  OpenListContext,
  SelectionProvider,
} from '../contexts';
import { useNewKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import styles from '../styles.module.scss';
import { DroplistProps } from '../types';

const DEFAULT_FALLBACK_PLACEMENTS: DropdownProps['fallbackPlacements'] = ['top', 'right', 'bottom', 'left'];

export function Droplist({
  items: itemsProp,
  search,
  pinBottom: pinBottomProp = [],
  pinTop: pinTopProp = [],
  footerActiveElementsRefs,
  children,
  trigger,
  placement,
  widthStrategy,
  triggerElemRef: triggerElemRefProp,
  open: openProp,
  onOpenChange,
  collapse = {},
  triggerClassName,
  selection,
  contentRender,
  size = 's',
  marker = true,
  closeDroplistOnItemClick = false,
  className,
  listRef: listRefProp,
  untouchableScrollbars = false,
  virtualized = false,
  closeOnPopstate,
  ...props
}: DroplistProps) {
  const hasSearch = useMemo(() => Boolean(search), [search]);

  const [openCollapseItems = [], setOpenCollapsedItems] = useValueControl<ItemId[] | undefined>(collapse);
  const toggleOpenCollapseItem = useCallback(
    (id: ItemId) =>
      setOpenCollapsedItems((items: ItemId[]) =>
        items?.includes(id) ? items.filter(item => item !== id) : (items ?? []).concat([id]),
      ),
    [setOpenCollapsedItems],
  );

  const [open = false, setOpen] = useValueControl<boolean>({
    value: openProp,
    defaultValue: false,
    onChange: onOpenChange,
  });

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

  const triggerElemRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const firstItemId = ids[0];

  const { handleListKeyDownFactory, resetActiveItemId, activeItemId, forceUpdateActiveItemId } =
    useNewKeyboardNavigation({
      mainRef: triggerElemRefProp ?? triggerElemRef,
      focusFlattenItems,
      hasListInFocusChain: true,
      firstItemId,
    });

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => handleListKeyDownFactory(ids, expandedIds)(e),
    [handleListKeyDownFactory, ids, expandedIds],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      resetActiveItemId();

      setOpen(open);
    },
    [resetActiveItemId, setOpen],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>, cb?: (e: KeyboardEvent<HTMLElement>) => void) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);

        setTimeout(() => {
          resetActiveItemId();
          listRef.current?.focus();
        }, 0);
      }

      if (e.key === 'ArrowUp') {
        setOpen(false);
      }

      cb?.(e);
    },
    [resetActiveItemId, setOpen],
  );

  const isValid = useMemo(() => isValidElement(children), [children]);

  const triggerElem: ReactNode = useMemo(() => {
    if (isValidElement(children)) {
      const props = typeof children.props === 'object' ? children.props : {};

      return cloneElement(children, {
        ...props,
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
          onKeyDown(e, children.props?.onKeyDown);
        },
      });
    }

    if (typeof children === 'function') {
      return children({ onKeyDown });
    }

    return children;
  }, [onKeyDown, children]);

  return (
    <NewListContextProvider
      flattenItems={flattenItems}
      focusFlattenItems={focusFlattenItems}
      contentRender={contentRender}
      size={size}
      marker={marker}
      firstItemId={firstItemId}
      virtualized={virtualized}
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
            <OpenListContext.Provider
              value={{
                closeDroplistOnItemClick,
                closeDroplist: () => {
                  setOpen(false);
                  resetActiveItemId();
                  (triggerElemRefProp ?? triggerElemRef).current?.focus();
                },
              }}
            >
              <Dropdown
                content={
                  <div className={cn(styles.wrapper, className)}>
                    <ListPrivate
                      {...props}
                      items={memorizedItems.items.focusCloseChildIds}
                      pinTop={memorizedItems.pinTop.focusCloseChildIds}
                      pinBottom={memorizedItems.pinBottom.focusCloseChildIds}
                      virtualized={virtualized}
                      onKeyDown={handleListKeyDown}
                      searchItem={searchItem}
                      tabIndex={0}
                      ref={mergeRefs(listRef, listRefProp)}
                      search={search}
                      onFocus={e => {
                        e.stopPropagation();

                        forceUpdateActiveItemId?.(ids[0]);
                      }}
                      limitedScrollHeight
                      untouchableScrollbars={untouchableScrollbars}
                    />
                  </div>
                }
                outsideClick
                triggerClassName={triggerClassName}
                fallbackPlacements={DEFAULT_FALLBACK_PLACEMENTS}
                trigger={trigger}
                placement={placement}
                widthStrategy={widthStrategy}
                triggerRef={!triggerElemRefProp ? triggerElemRef : (isValid && triggerElemRefProp) || undefined}
                open={open}
                onOpenChange={handleOpenChange}
                closeOnPopstate={closeOnPopstate}
              >
                {triggerElem}
              </Dropdown>
            </OpenListContext.Provider>
          </FocusListContext.Provider>
        </CollapseContext.Provider>
      </SelectionProvider>
    </NewListContextProvider>
  );
}
