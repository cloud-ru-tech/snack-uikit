import { SELECTION_MODE } from '../constants';
import { Option } from '../types';

export const getDisplayedValue = (
  props:
    | { selectionMode: typeof SELECTION_MODE.Single; selected: Option }
    | { selectionMode: typeof SELECTION_MODE.Multi; selected: Option[]; getSelectedItemsText(amount: number): string },
) => {
  if (props.selectionMode === SELECTION_MODE.Single) {
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
