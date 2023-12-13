import { forwardRef } from 'react';

import { BaseDroplistItem } from './BaseDroplistItem';
import { DroplistItemExpandable, DroplistItemExpandableProps } from './DroplistItemExpandable';

export type DroplistItemProps = DroplistItemExpandableProps;

export const DroplistItem = forwardRef<HTMLButtonElement, DroplistItemProps>(function DroplistItem(
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
