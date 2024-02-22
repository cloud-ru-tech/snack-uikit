import { forwardRef } from 'react';

import { FieldSelectMultiple } from './FieldSelectMultiple';
import { FieldSelectSingle } from './FieldSelectSingle';
import { FieldSelectProps } from './types';
import { isFieldSelectMultipleProps, isFieldSelectSingleProps } from './utils';

export const FieldSelect = forwardRef<HTMLInputElement, FieldSelectProps>((props, ref) => {
  if (isFieldSelectMultipleProps(props)) {
    return <FieldSelectMultiple {...props} ref={ref} />;
  }

  if (isFieldSelectSingleProps(props)) {
    return <FieldSelectSingle {...props} ref={ref} />;
  }

  return null;
});
