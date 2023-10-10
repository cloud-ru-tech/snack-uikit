import { forwardRef } from 'react';

import { BaseDroplistItem } from './BaseDroplistItem';
import { DroplistItemExpandable, DroplistItemExpandableProps } from './DroplistItemExpandable';

export type DroplistItemProps = DroplistItemExpandableProps;

const DroplistItemComponent = forwardRef<HTMLButtonElement, DroplistItemProps>(function DroplistItem(
  { children, ...props },
  ref,
) {
  if (children) {
    // TODO: добавить проверку что childrenы это именно компоненты списка дроплиста
    return (
      <DroplistItemExpandable {...props} ref={ref}>
        {children}
      </DroplistItemExpandable>
    );
  }

  return <BaseDroplistItem {...props} ref={ref} />;
});

export const DroplistItem = DroplistItemComponent as typeof DroplistItemComponent & {
  variants: typeof BaseDroplistItem.variants;
};

DroplistItem.variants = BaseDroplistItem.variants;
