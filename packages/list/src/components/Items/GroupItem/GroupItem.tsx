import { Separator } from '../../../helperComponents';
import { useListContext } from '../../Lists/contexts';
import { useRenderItems } from '../hooks';
import { GroupItemProps } from '../types';

export function GroupItem({ label, truncate, divider, items, mode }: GroupItemProps) {
  const { size } = useListContext();

  const itemsJSX = useRenderItems(items);

  return (
    <>
      <Separator label={label} truncate={truncate} divider={divider} mode={mode} size={size} />
      {itemsJSX}
    </>
  );
}
