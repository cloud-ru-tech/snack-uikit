import { forwardRef } from 'react';

import { Size, ValidationState } from '../constants';
import { FieldSelectMulti } from './FieldSelectMulti';
import { FieldSelectSingle } from './FieldSelectSingle';
import { FieldSelectMultiProps, FieldSelectSingleProps, SelectionMode } from './types';

export type FieldSelectProps =
  | ({
      selectionMode?: SelectionMode.Single;
    } & FieldSelectSingleProps)
  | ({
      selectionMode: SelectionMode.Multi;
    } & FieldSelectMultiProps);

const ForwardedFieldSelect = forwardRef<HTMLInputElement, FieldSelectProps>(
  ({ selectionMode = SelectionMode.Single, ...props }, ref) => {
    switch (selectionMode) {
      case SelectionMode.Multi:
        return <FieldSelectMulti {...(props as FieldSelectMultiProps)} ref={ref} />;
      case SelectionMode.Single:
      default:
        return <FieldSelectSingle {...(props as FieldSelectSingleProps)} ref={ref} />;
    }
  },
);

export const FieldSelect = ForwardedFieldSelect as typeof ForwardedFieldSelect & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
  selectionModes: typeof SelectionMode;
};

FieldSelect.sizes = Size;
FieldSelect.validationStates = ValidationState;
FieldSelect.selectionModes = SelectionMode;
