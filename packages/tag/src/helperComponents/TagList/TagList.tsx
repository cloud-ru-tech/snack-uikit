import { Ref } from 'react';

import { Tag } from '../../components';
import { Size } from '../../constants';
import { TagRowItemInner } from '../../types';

type SetTagRef = (item: TagRowItemInner, index: number) => Ref<HTMLDivElement>;

type TagListProps = {
  items: TagRowItemInner[];
  size?: Size;
  onItemRemove?(item: string): void;
  setTagRef?: SetTagRef;
};

type OnDeleteHandler = () => void;

function renderTag(size: Size, handleRemoveItem?: (item: TagRowItemInner) => OnDeleteHandler, setRef?: SetTagRef) {
  return function TagRowItem(item: TagRowItemInner, index: number) {
    return (
      <div key={item.label} ref={setRef?.(item, index)}>
        <Tag label={item.label} appearance={item.color} size={size} onDelete={handleRemoveItem?.(item)} />
      </div>
    );
  };
}

export function TagList({ items, size = Size.Xs, onItemRemove, setTagRef }: TagListProps) {
  const handleRemoveItem = onItemRemove ? (item: TagRowItemInner) => () => onItemRemove(item.label) : undefined;

  return <>{items.map(renderTag(size, handleRemoveItem, setTagRef))}</>;
}
