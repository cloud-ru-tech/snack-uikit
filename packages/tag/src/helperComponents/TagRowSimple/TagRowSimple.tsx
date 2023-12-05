import cn from 'classnames';
import { Ref } from 'react';

import { extractSupportProps } from '@snack-uikit/utils';

import { Size } from '../../constants';
import { TagRowItemInner } from '../../types';
import { TagList } from '../TagList';
import styles from './styles.module.scss';

type TagRowSimpleProps = {
  items: TagRowItemInner[];
  size: Size;
  onItemRemove?(item: string): void;
  setTagRef?(item: TagRowItemInner): Ref<HTMLDivElement>;
  className?: string;
};

export function TagRowSimple({ items, size, onItemRemove, setTagRef, className, ...rest }: TagRowSimpleProps) {
  return (
    <div className={cn(styles.tagRowSimpleWrapper, className)} {...extractSupportProps(rest)} data-size={size}>
      <TagList items={items} size={size} onItemRemove={onItemRemove} setTagRef={setTagRef} />
    </div>
  );
}
