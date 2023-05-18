export type ToggleItemState<D = undefined> = {
  checked: boolean;
  data: D;
};

export type ToggleItem<D> = ToggleItemState<D> & {
  setChecked: (checked: boolean) => void;
};
