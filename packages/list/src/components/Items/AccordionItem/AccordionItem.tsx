import { KeyboardEvent, MouseEvent } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { useToggleGroup } from '@snack-uikit/toggles';

import { CollapseBlockPrivate } from '../../../helperComponents';
import { CollapseContext, useCollapseContext, useParentListContext } from '../../Lists/contexts';
import { BaseItem } from '../BaseItem';
import { useGroupItemSelection, useRenderItems } from '../hooks';
import { AccordionItemProps } from '../types';

export function AccordionItem({ items: itemsProp, id, disabled, ...option }: AccordionItemProps) {
  const { level = 1 } = useCollapseContext();
  const { toggleOpenCollapsedItems } = useParentListContext();
  const { isIndeterminate, checked, handleOnSelect } = useGroupItemSelection({ items: itemsProp, id, disabled });

  const { isChecked: open, handleClick: handleChange } = useToggleGroup({ value: String(id) });

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      handleChange();
      toggleOpenCollapsedItems?.(id ?? '');

      e.preventDefault();
      e.stopPropagation();
    }
  };

  const itemsJSX = useRenderItems(itemsProp);

  const handleItemClick = (e: MouseEvent<HTMLElement>) => {
    handleChange();
    toggleOpenCollapsedItems?.(id ?? '');
    option.onClick?.(e);
  };

  return (
    <CollapseBlockPrivate
      header={
        <BaseItem
          {...option}
          id={id}
          disabled={disabled}
          expandIcon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
          onClick={handleItemClick}
          isParentNode
          onKeyDown={handleKeyDown}
          indeterminate={isIndeterminate && !checked}
          onSelect={!disabled ? handleOnSelect : undefined}
        />
      }
      expanded={open}
      data-test-id={`list__accordion-item-${id}`}
    >
      <CollapseContext.Provider value={{ level: level + 1 }}>{itemsJSX}</CollapseContext.Provider>
    </CollapseBlockPrivate>
  );
}
