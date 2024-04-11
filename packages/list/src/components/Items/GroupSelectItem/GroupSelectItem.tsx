import { Separator } from '../../../helperComponents';
import { useGroupItemSelection, useRenderItems } from '../hooks';
import { CommonFlattenProps, FlattenGroupSelectListItem } from '../types';

type GroupSelectItemProps = Omit<FlattenGroupSelectListItem, 'type'> & CommonFlattenProps;

export function GroupSelectItem({
  label,
  truncate,
  divider,
  items,
  mode,
  id,
  itemRef,
  allChildIds,
}: GroupSelectItemProps) {
  const { indeterminate, checked, handleOnSelect } = useGroupItemSelection({
    items,
    id,
    disabled: false,
    allChildIds,
  });

  const itemsJSX = useRenderItems(items);

  return (
    <>
      <Separator
        label={label}
        truncate={truncate}
        divider={divider}
        mode={mode}
        selectButton={{
          indeterminate,
          checked,
          itemRef,
          onClick: handleOnSelect,
        }}
      />

      {itemsJSX}
    </>
  );
}
