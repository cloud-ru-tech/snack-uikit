import { Option, SelectionMode } from '../types';

export const getDisplayedValue = (
  props:
    | { selectionMode: SelectionMode.Single; selected: Option }
    | { selectionMode: SelectionMode.Multi; selected: Option[]; getSelectedItemsText(amount: number): string },
) => {
  if (props.selectionMode === SelectionMode.Single) {
    return props.selected.label;
  }

  const { selected, getSelectedItemsText } = props;

  const selectedOptions = selected;

  if (selectedOptions.length > 1) {
    return getSelectedItemsText(selectedOptions.length);
  }

  return selectedOptions.reduce(
    (res, cur, index, arr) => `${res}${cur.label}${index === arr.length - 1 ? '' : ','}`,
    '',
  );
};
