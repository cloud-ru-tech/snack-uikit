import { forwardRef } from 'react';

import { DroplistItem } from './DroplistItem';
import { BaseDroplistItemProps } from './types';

export type DroplistItemMultipleProps = BaseDroplistItemProps & {
  checked: boolean;
  onChange(checked: boolean): void;
};

export const DroplistItemMultiple = forwardRef<HTMLInputElement, DroplistItemMultipleProps>((props, ref) => (
  <DroplistItem variant={DroplistItem.variants.Multiple} ref={ref} {...props} />
));
