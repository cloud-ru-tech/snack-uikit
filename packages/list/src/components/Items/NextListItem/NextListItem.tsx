import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Dropdown } from '@snack-uikit/dropdown';
import { ChevronRightSVG } from '@snack-uikit/icons';

import { useCollapseContext, useFocusListContext, useNewListContext, useSelectionContext } from '../../Lists/contexts';
import { ListPrivate } from '../../Lists/ListPrivate';
import { BaseItem } from '../BaseItem';
import { useGroupItemSelection } from '../hooks';
import { CommonFlattenProps, FlattenNextListItem, ItemId } from '../types';
import { extractActiveItems, isNextListItem } from '../utils';
import { FALLBACK_PLACEMENTS } from './constants';

type NextListItemProps = Omit<FlattenNextListItem, 'type'> & CommonFlattenProps & { focusId?: ItemId };

export function NextListItem({
  items,
  placement = 'right-start',
  id,
  scroll,
  scrollRef,
  disabled,
  onSublistOpenChanged,
  allChildIds,
  loading = false,
  focusId = id,
  ...option
}: NextListItemProps) {
  const { flattenItems, focusFlattenItems } = useNewListContext();
  const { isSelectionMultiple } = useSelectionContext();
  const { openCollapseItems = [] } = useCollapseContext();

  const item = flattenItems[id];

  const { ids, expandedIds } = useMemo(() => {
    const { ids, expandedIds } = extractActiveItems({
      focusCloseChildIds: items,
      focusFlattenItems,
      openCollapseItems,
      isSelectionMultiple,
    });

    return { ids, expandedIds: expandedIds.concat([id]) };
  }, [focusFlattenItems, id, isSelectionMultiple, items, openCollapseItems]);

  const { handleListKeyDownFactory, activeItemId, forceUpdateActiveItemId } = useFocusListContext();

  const [open, setOpen] = useState<boolean>();

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      handleListKeyDownFactory(ids, expandedIds)(e);

      if (e.key === 'ArrowLeft') {
        forceUpdateActiveItemId?.(focusId);
        setOpen(false);
        e.stopPropagation();

        return;
      }
    },
    [handleListKeyDownFactory, ids, expandedIds, forceUpdateActiveItemId, focusId],
  );

  const { indeterminate, checked, handleOnSelect } = useGroupItemSelection({
    items: isNextListItem<FlattenNextListItem>(item) ? item.items : [],
    id,
    disabled,
    allChildIds,
  });

  const handleOutsideClick = useCallback(() => {
    forceUpdateActiveItemId?.('~drop-focus');
    setOpen(false);
    return true;
  }, [forceUpdateActiveItemId]);

  const isOpen = useMemo(
    () => Boolean(!disabled && activeItemId && focusFlattenItems[focusId].allChildIds.includes(activeItemId)),
    [activeItemId, disabled, focusFlattenItems, focusId],
  );

  useEffect(() => {
    setOpen(open => open && isOpen);
  }, [id, isOpen]);

  const listRef = useRef<HTMLElement>(null);

  return (
    <Dropdown
      outsideClick={handleOutsideClick}
      fallbackPlacements={FALLBACK_PLACEMENTS}
      content={
        <ListPrivate
          onKeyDown={handleListKeyDown}
          items={items}
          nested
          scroll={scroll}
          tabIndex={0}
          ref={listRef}
          onFocus={e => {
            e.stopPropagation();
            forceUpdateActiveItemId?.(ids[0]);
          }}
          scrollRef={scrollRef}
          limitedScrollHeight
          loading={loading}
        />
      }
      trigger='hover'
      open={isOpen || open}
      onOpenChange={value => {
        setOpen(value);
        onSublistOpenChanged?.(value, id);
      }}
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
        indeterminate={indeterminate}
        checked={checked}
        onOpenNestedList={() => {
          setOpen(true);
          setTimeout(() => {
            listRef.current?.focus();
          }, 0);
        }}
        onSelect={handleOnSelect}
      />
    </Dropdown>
  );
}
