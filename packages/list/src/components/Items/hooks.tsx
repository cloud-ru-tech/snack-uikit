import { createRef, RefObject, useEffect, useMemo } from 'react';

import { extractAllChildIds, extractChildIds } from '../../utils';
import { useSelectionContext } from '../Lists/contexts';
import { AccordionItem } from './AccordionItem';
import { BaseItem } from './BaseItem';
import { GroupItem } from './GroupItem';
import { NextListItem } from './NextListItem';
import { ItemProps } from './types';
import { addItemsIds, isAccordionItemProps, isGroupItemProps, isNextListItemProps } from './utils';

export function useRenderItems(items: ItemProps[]) {
  return useMemo(
    () =>
      items.map(item => {
        if (isGroupItemProps(item)) {
          return <GroupItem {...item} key={item.label} />;
        }

        if (isAccordionItemProps(item)) {
          return <AccordionItem {...item} key={item.key} />;
        }

        if (isNextListItemProps(item)) {
          return <NextListItem {...item} key={item.key} />;
        }

        return <BaseItem {...item} key={item.key} />;
      }),
    [items],
  );
}

type UseItemsWithIdsProps = {
  search?: boolean;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
};

export function useItemsWithIds({ search, footerActiveElementsRefs }: UseItemsWithIdsProps) {
  return useMemo(
    () => ({
      search: addItemsIds(
        search ? ([{ itemRef: createRef<HTMLInputElement>() }] as unknown as ItemProps[]) : [],
        'search',
      ),
      footerRefs: addItemsIds(
        footerActiveElementsRefs
          ? (footerActiveElementsRefs?.map(ref => ({ itemRef: ref })) as unknown as ItemProps[])
          : [],
        'footer',
      ),
    }),

    [footerActiveElementsRefs, search],
  );
}

type UseGroupItemSelectionProps = {
  items: ItemProps[];
  id?: string | number;
  disabled?: boolean;
};

export function useGroupItemSelection({ id, items, disabled }: UseGroupItemSelectionProps) {
  const { value, setValue, isSelectionMultiple } = useSelectionContext();
  const { childIds, allChildIds } = useMemo(
    () => ({ childIds: extractChildIds({ items }), allChildIds: extractAllChildIds({ items }) }),
    [items],
  );

  const isIndeterminate = isSelectionMultiple
    ? allChildIds.some(childId => value?.includes(childId))
    : allChildIds.includes(value ?? '');
  const checked = isSelectionMultiple ? allChildIds.every(childId => value?.includes(childId)) : undefined;

  useEffect(() => {
    if (isSelectionMultiple) {
      if (checked && !value?.includes(id)) {
        setValue?.((value: Array<number | string>) => (value ?? []).concat([id ?? '']));
      }
      if (!checked && value?.includes(id)) {
        setValue?.((value: Array<number | string>) => (value ?? []).filter(itemId => itemId !== id));
      }
    }
  }, [checked, disabled, id, isSelectionMultiple, setValue, value]);

  const handleOnSelect = () => {
    if (checked) {
      setValue?.((value: Array<string | number>) =>
        (value ?? []).filter(itemId => itemId !== id && !childIds.includes(itemId)),
      );
      return;
    }

    if (isIndeterminate) {
      setValue?.((value: Array<string | number>) => Array.from(new Set([...(value ?? []), ...childIds, id])));
      return;
    }

    setValue?.((value: Array<string | number>) => (value ?? []).concat([...childIds, id ?? '']));
  };

  return { checked, isIndeterminate, handleOnSelect };
}
