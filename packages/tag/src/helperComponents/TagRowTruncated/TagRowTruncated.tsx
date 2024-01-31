import cn from 'classnames';
import { memo, useEffect, useRef, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TAG_ROW_TEST_IDS } from '../../components/TagRow/constants';
import { Size, TagRowItemInner } from '../../types';
import { TagList } from '../TagList';
import { TagMore } from '../TagMore';
import { useResizeObserver } from './hooks';
import styles from './styles.module.scss';
import { getGapWidth } from './utils';

type TagRowTruncatedProps = WithSupportProps<{
  items: TagRowItemInner[];
  rowLimit: number;
  moreButtonLabel?: string;
  size: Size;
  className?: string;
  onItemRemove?(item: string): void;
}>;

function TagRowTruncatedInner({
  items,
  rowLimit,
  size,
  moreButtonLabel = '',
  className,
  onItemRemove,
  ...rest
}: TagRowTruncatedProps) {
  const [visibleTags, setVisibleTags] = useState<TagRowItemInner[]>([]);
  const [hiddenTags, setHiddenTags] = useState<TagRowItemInner[]>([]);

  const hiddenRowElementRef = useRef<HTMLDivElement>(null);
  const hiddenMoreButtonRef = useRef<HTMLButtonElement>(null);
  const hiddenMoreButtonWrapperRef = useRef<HTMLDivElement>(null);

  const [firstTagElement, setFirstTagElement] = useState<HTMLElement | null>(null);
  const tagsMapRef = useRef(new Map<TagRowItemInner, HTMLElement | null>());

  const { width: maxWidth } = useResizeObserver(hiddenRowElementRef.current);
  const { width: firstVisibleTagWidth } = useResizeObserver(firstTagElement);

  function setTagElement(tag: TagRowItemInner, index: number) {
    return (tagElement: HTMLElement | null) => {
      if (index === 0 && tagElement) {
        setFirstTagElement(tagElement);
      }

      if (tagElement === null) {
        tagsMapRef.current.delete(tag);
      } else {
        tagsMapRef.current.set(tag, tagElement);
      }
    };
  }

  const gapWidth = getGapWidth(hiddenRowElementRef);

  useEffect(() => {
    if (maxWidth < 1) {
      return;
    }

    const newVisibleTags: TagRowItemInner[] = [];
    const newHiddenTags: TagRowItemInner[] = [];

    const moreButtonWidth = hiddenMoreButtonRef.current?.offsetWidth || 0;

    let currentRowWidth = 0;
    let currentRowCount = 1;

    tagsMapRef.current.forEach((tagElement, tagRowItem) => {
      const tagWidth = tagElement?.offsetWidth || 0;
      const sumRowWidth = currentRowWidth + tagWidth + gapWidth;

      if (currentRowCount > rowLimit) {
        newHiddenTags.push(tagRowItem);
        return;
      }

      if (currentRowCount === rowLimit) {
        if (sumRowWidth + moreButtonWidth > maxWidth) {
          currentRowCount++;
          newHiddenTags.push(tagRowItem);
          return;
        }

        currentRowWidth = sumRowWidth;
        newVisibleTags.push(tagRowItem);
        return;
      }

      if (sumRowWidth > maxWidth) {
        currentRowWidth = tagWidth + gapWidth;
        currentRowCount++;
        newVisibleTags.push(tagRowItem);
        return;
      }

      currentRowWidth = sumRowWidth;
      newVisibleTags.push(tagRowItem);
    });

    setVisibleTags(newVisibleTags);
    setHiddenTags(newHiddenTags);
  }, [items, rowLimit, maxWidth, onItemRemove, gapWidth, firstVisibleTagWidth]);

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)} data-size={size}>
      <div className={styles.hiddenRow} ref={hiddenRowElementRef} data-size={size}>
        <TagList items={items} size={size} onItemRemove={onItemRemove} setTagRef={setTagElement} />
      </div>
      <div className={styles.hiddenMoreButton} ref={hiddenMoreButtonWrapperRef}>
        <TagMore items={items} text={moreButtonLabel} size={size} buttonRef={hiddenMoreButtonRef} />
      </div>
      <div className={styles.visibleRow} data-size={size} data-test-id={TAG_ROW_TEST_IDS.visibleTagsWrapper}>
        <TagList items={visibleTags} size={size} onItemRemove={onItemRemove} />
        {hiddenTags.length > 0 && (
          <TagMore items={hiddenTags} text={moreButtonLabel} size={size} onItemRemove={onItemRemove} />
        )}
      </div>
    </div>
  );
}

export const TagRowTruncated = memo(TagRowTruncatedInner);
