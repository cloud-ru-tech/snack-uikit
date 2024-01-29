import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Dropdown, DropdownProps } from '@snack-uikit/dropdown';
import { ChevronRightSVG } from '@snack-uikit/icons';

import { extractChildIds, withCollapsedItems } from '../../../utils';
import { ParentListContext, useParentListContext, useSelectionContext } from '../../Lists/contexts';
import { ListPrivate } from '../../Lists/ListPrivate';
import { BaseItem } from '../BaseItem';
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

  const { value, selection, setValue } = useSelectionContext();

  const childIds = useMemo(() => extractChildIds({ items: itemsProp }), [itemsProp]);

  const isIndeterminate =
    selection === 'multiple' ? childIds.some(childId => value?.includes(childId)) : childIds.includes(value ?? '');
  const checked = selection === 'multiple' ? childIds.every(childId => value?.includes(childId)) : undefined;

  useEffect(() => {
    if (selection === 'multiple') {
      if (checked && !value?.includes(id)) {
        setValue?.((value: Array<number | string>) => value.concat([id ?? '']));
      }
    }
  }, [checked, id, selection, setValue, value]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        resetActiveFocusIndex();
        resetNestedIndex();
        setOpenCollapsedItems([]);
      }
      setOpen(open);
    },
    [resetActiveFocusIndex, resetNestedIndex, setOpen],
  );

  const handleOutsideClick = useCallback(() => {
    parentResetNestedIndex?.();
    parentResetActiveFocusIndex?.();

    return true;
  }, [parentResetActiveFocusIndex, parentResetNestedIndex]);

  return (
    <li style={{ listStyleType: 'none' }}>
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
            />
          </ParentListContext.Provider>
        }
        trigger='hover'
        open={(open || parentIds[parentOpenNestedIndex] === id) && !option.disabled}
        onOpenChange={handleOpenChange}
        placement={placement}
      >
        <BaseItem
          {...option}
          open={open}
          expandIcon={<ChevronRightSVG />}
          id={id}
          isParentNode
          indeterminate={isIndeterminate && !checked}
          onSelect={() => {
            if (checked) {
              setValue?.((value: Array<string | number>) =>
                value.filter(itemId => itemId !== id && !childIds.includes(itemId)),
              );
              return;
            }

            if (isIndeterminate) {
              setValue?.((value: Array<string | number>) => Array.from(new Set([...value, ...childIds, id])));
              return;
            }

            setValue?.((value: Array<string | number>) => (value ?? []).concat([...childIds, id ?? '']));
          }}
        />
      </Dropdown>
    </li>
  );
}
