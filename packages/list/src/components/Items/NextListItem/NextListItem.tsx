import { useCallback, useMemo, useRef, useState } from 'react';

import { Dropdown, DropdownProps } from '@snack-uikit/dropdown';
import { ChevronRightSVG } from '@snack-uikit/icons';

import { withCollapsedItems } from '../../../utils';
import { ParentListContext, useParentListContext } from '../../Lists/contexts';
import { ListPrivate } from '../../Lists/ListPrivate';
import { BaseItem } from '../BaseItem';
import { useGroupItemSelection } from '../hooks';
import { NextListItemProps } from '../types';
import { useKeyboardNavigation } from './hooks';

const FALLBACK_PLACEMENTS: DropdownProps['fallbackPlacements'] = [
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
];

export function NextListItem({
  items: itemsProp,
  placement = 'right-start',
  id,
  search,
  scroll,
  scrollRef,
  disabled,
  onSublistOpenChanged,
  loading = false,
  ...option
}: NextListItemProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const [openCollapsedItems, setOpenCollapsedItems] = useState<Array<number | string>>([]);

  const { items, itemRefs, ids, expandedIds } = useMemo(
    () =>
      withCollapsedItems({
        items: itemsProp,
        openCollapsedItems,
      }),
    [itemsProp, openCollapsedItems],
  );

  const { parentOpenNestedIndex, parentIds, triggerRef, parentResetNestedIndex, parentResetActiveFocusIndex } =
    useParentListContext();

  const {
    open,
    setOpen,
    handleListKeyDown,
    activeFocusIndex,
    openNestedIndex,
    resetNestedIndex,
    resetActiveFocusIndex,
  } = useKeyboardNavigation({ ids, expandedIds, itemRefs, id });

  const { isIndeterminate, checked, handleOnSelect } = useGroupItemSelection({ items: itemsProp, id, disabled });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        resetActiveFocusIndex();
        resetNestedIndex();
        setOpenCollapsedItems([]);
      }
      onSublistOpenChanged?.(open, id);
      setOpen(open);
    },
    [id, onSublistOpenChanged, resetActiveFocusIndex, resetNestedIndex, setOpen],
  );

  const handleOutsideClick = useCallback(() => {
    parentResetNestedIndex?.();
    parentResetActiveFocusIndex?.();

    return true;
  }, [parentResetActiveFocusIndex, parentResetNestedIndex]);

  return (
    <Dropdown
      outsideClick={handleOutsideClick}
      fallbackPlacements={FALLBACK_PLACEMENTS}
      content={
        <ParentListContext.Provider
          value={{
            parentIds: ids,
            parentActiveFocusIndex: activeFocusIndex,
            parentExpandedIds: expandedIds,
            parentItemRefs: itemRefs,
            parentOpenNestedIndex: openNestedIndex,
            triggerRef,
            parentRef: listRef,
            parentResetNestedIndex: resetNestedIndex,
            parentResetActiveFocusIndex: resetActiveFocusIndex,
            toggleOpenCollapsedItems: id =>
              setOpenCollapsedItems(items =>
                items.includes(id) ? items.filter(item => item !== id) : items.concat([id]),
              ),
          }}
        >
          <ListPrivate
            onKeyDown={handleListKeyDown}
            items={items}
            nested
            search={search}
            scroll={scroll}
            scrollRef={scrollRef}
            limitedScrollHeight
            loading={loading}
          />
        </ParentListContext.Provider>
      }
      trigger='hover'
      open={(open || parentIds[parentOpenNestedIndex] === id) && !disabled}
      onOpenChange={handleOpenChange}
      placement={placement}
      widthStrategy='auto'
    >
      <BaseItem
        {...option}
        disabled={disabled}
        open={open}
        expandIcon={<ChevronRightSVG />}
        id={id}
        isParentNode
        indeterminate={isIndeterminate && !checked}
        onSelect={handleOnSelect}
      />
    </Dropdown>
  );
}
