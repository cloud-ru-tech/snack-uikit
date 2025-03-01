import { MouseEvent, useCallback } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';

import { CollapseBlockPrivate } from '../../../helperComponents';
import {
  CollapseLevelContext,
  useCollapseContext,
  useCollapseLevelContext,
  useSelectionContext,
} from '../../Lists/contexts';
import { BaseItem } from '../BaseItem';
import { useGroupItemSelection, useRenderItems } from '../hooks';
import { CommonFlattenProps, FlattenAccordionItem } from '../types';

type AccordionItemProps = Omit<FlattenAccordionItem, 'type>'> & CommonFlattenProps;

export function AccordionItem({ id, disabled, allChildIds, items, ...option }: AccordionItemProps) {
  const { level = 0 } = useCollapseLevelContext();
  const { openCollapseItems = [], toggleOpenCollapseItem } = useCollapseContext();

  const { value, isSelectionSingle, isSelectionMultiple } = useSelectionContext();

  const {
    indeterminate,
    handleOnSelect,
    checked: checkedProp,
  } = useGroupItemSelection({
    items,
    id,
    disabled,
    allChildIds,
  });

  const isOpen = Boolean(openCollapseItems.includes(id ?? ''));

  const checked = Boolean(
    (indeterminate && !isOpen && isSelectionSingle && value && allChildIds.includes(value)) ||
      (isSelectionMultiple && checkedProp),
  );

  const handleKeyDown = useCallback(() => {
    toggleOpenCollapseItem?.(id ?? '');
  }, [id, toggleOpenCollapseItem]);

  const itemsJSX = useRenderItems(items);

  const handleItemClick = (e: MouseEvent<HTMLElement>) => {
    toggleOpenCollapseItem?.(id ?? '');
    option.onClick?.(e);
  };

  return (
    <CollapseBlockPrivate
      header={
        <BaseItem
          {...option}
          id={id}
          disabled={disabled}
          expandIcon={isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
          onClick={handleItemClick}
          isParentNode
          onOpenNestedList={handleKeyDown}
          checked={checked}
          indeterminate={indeterminate}
          onSelect={!disabled ? handleOnSelect : undefined}
        />
      }
      expanded={isOpen}
      data-test-id={`list__accordion-item-${id}`}
    >
      <CollapseLevelContext.Provider value={{ level: level + 1 }}>{itemsJSX}</CollapseLevelContext.Provider>
    </CollapseBlockPrivate>
  );
}
