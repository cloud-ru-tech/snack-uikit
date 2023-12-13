import { forwardRef } from 'react';

import { SELECTION_MODE } from './constants';
import { FieldSelectMulti } from './FieldSelectMulti';
import { FieldSelectSingle } from './FieldSelectSingle';
import { FieldSelectMultiProps, FieldSelectSingleProps } from './types';

export type FieldSelectProps =
  | ({
      selectionMode?: typeof SELECTION_MODE.Single;
    } & FieldSelectSingleProps)
  | ({
      selectionMode: typeof SELECTION_MODE.Multi;
    } & FieldSelectMultiProps);

export const FieldSelect = forwardRef<HTMLInputElement, FieldSelectProps>(
  ({ selectionMode = SELECTION_MODE.Single, ...props }, ref) => {
    switch (selectionMode) {
      case SELECTION_MODE.Multi:
        return <FieldSelectMulti {...(props as FieldSelectMultiProps)} ref={ref} />;
      case SELECTION_MODE.Single:
      default:
        return <FieldSelectSingle {...(props as FieldSelectSingleProps)} ref={ref} />;
    }
  },
);
