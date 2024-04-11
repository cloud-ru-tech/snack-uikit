import { Separator } from '../../../helperComponents';
import { useRenderItems } from '../hooks';
import { FlattenGroupListItem, ItemId } from '../types';

type GroupItemProps = Omit<FlattenGroupListItem, 'type'> & { items: ItemId[] };

export function GroupItem({ label, truncate, divider, items, mode }: GroupItemProps) {
  const itemsJSX = useRenderItems(items);

  return (
    <>
      <Separator label={label} truncate={truncate} divider={divider} mode={mode} />

      {itemsJSX}
    </>
  );
}
