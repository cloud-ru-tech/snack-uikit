import { KeyboardEvent, useEffect, useMemo } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { useToggleGroup } from '@snack-uikit/toggles';

import { CollapseBlockPrivate } from '../../../helperComponents';
import { extractChildIds } from '../../../utils';
import { CollapseContext, useCollapseContext, useParentListContext, useSelectionContext } from '../../Lists/contexts';
import { BaseItem } from '../BaseItem';
import { useRenderItems } from '../hooks';
import { AccordionItemProps } from '../types';

export function AccordionItem({ items: itemsProp, ...option }: AccordionItemProps) {
  const { level = 1 } = useCollapseContext();
  const { toggleOpenCollapsedItems } = useParentListContext();
  const { value, selection, setValue } = useSelectionContext();

  const childIds = useMemo(() => extractChildIds({ items: itemsProp }), [itemsProp]);

  const isIndeterminate =
    selection === 'multiple' ? childIds.some(childId => value?.includes(childId)) : childIds.includes(value ?? '');
  const checked = selection === 'multiple' ? childIds.every(childId => value?.includes(childId)) : undefined;

  const { isChecked: open, handleClick: handleChange } = useToggleGroup({ value: String(option.id) });

  useEffect(() => {
    if (selection === 'multiple') {
      if (checked && !value?.includes(option.id)) {
        setValue?.((value: Array<number | string>) => (value ?? []).concat([option.id ?? '']));
      }
    }
  }, [checked, option.disabled, option.id, selection, setValue, value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') {
      handleChange();
      toggleOpenCollapsedItems?.(option.id ?? '');

      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleOnselect = () => {
    if (checked) {
      setValue?.((value: Array<string | number>) =>
        value.filter(itemId => itemId !== option.id && !childIds.includes(itemId)),
      );
      return;
    }

    if (isIndeterminate) {
      setValue?.((value: Array<string | number>) => Array.from(new Set([...value, ...childIds, option.id])));
      return;
    }

    setValue?.((value: Array<string | number>) => (value ?? []).concat([...childIds, option.id ?? '']));
  };

  const itemsJSX = useRenderItems(itemsProp);

  return (
    <li style={{ listStyleType: 'none' }}>
      <CollapseBlockPrivate
        header={
          <BaseItem
            {...option}
            expandIcon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
            onClick={e => {
              handleChange();
              toggleOpenCollapsedItems?.(option.id ?? '');
              option.onClick?.(e);
            }}
            isParentNode
            onKeyDown={handleKeyDown}
            indeterminate={isIndeterminate && !checked}
            onSelect={!option.disabled ? handleOnselect : undefined}
          />
        }
        expanded={open}
        data-test-id={`list__accordion-item-${option.id}`}
      >
        <CollapseContext.Provider value={{ level: level + 1 }}>{itemsJSX}</CollapseContext.Provider>
      </CollapseBlockPrivate>
    </li>
  );
}
