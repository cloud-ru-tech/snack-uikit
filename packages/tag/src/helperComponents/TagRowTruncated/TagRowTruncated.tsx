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

const FIRST_TRUNCATED_TAG_WIDTH = 256;

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
  const [firstVisibleTagMaxWidth, setFirstVisibleTagMaxWidth] = useState<number>();

  const hiddenRowElementRef = useRef<HTMLDivElement>(null);

  const [firstTagElement, setFirstTagElement] = useState<HTMLElement | null>(null);
  const [hiddenMoreButtonElement, setHiddenMoreButtonElement] = useState<HTMLButtonElement | null>(null);
  const tagsMapRef = useRef(new Map<TagRowItemInner, HTMLElement | null>());

  const { width: maxWidth } = useResizeObserver(hiddenRowElementRef.current);
  const { width: firstVisibleTagWidth } = useResizeObserver(firstTagElement);
  const { width: moreButtonWidth } = useResizeObserver(hiddenMoreButtonElement);

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
    let newFirstVisibleTagMaxWidth: number | undefined;

    let currentRowWidth = 0;
    let currentRowCount = 1;
    let currentRowVisibleTagAmount = 0;
    let isFirstTagTruncated = false;

    tagsMapRef.current.forEach((tagElement, tagRowItem) => {
      if (isFirstTagTruncated) {
        newHiddenTags.push(tagRowItem);
        return;
      }

      const tagWidth = tagElement?.offsetWidth || 0;
      const sumRowWidth = currentRowWidth + tagWidth + gapWidth;
      if (currentRowCount > rowLimit) {
        newHiddenTags.push(tagRowItem);
        return;
      }

      if (currentRowCount === rowLimit) {
        if (sumRowWidth + moreButtonWidth > maxWidth) {
          const isFirstTag = newVisibleTags.length === 0 && currentRowVisibleTagAmount === 0;
          const firstTagMaxWidth = Math.min(FIRST_TRUNCATED_TAG_WIDTH, maxWidth - moreButtonWidth - gapWidth);

          if (isFirstTag && firstTagMaxWidth > 0) {
            newFirstVisibleTagMaxWidth = firstTagMaxWidth;
            currentRowWidth = firstTagMaxWidth + gapWidth;
            currentRowVisibleTagAmount++;
            isFirstTagTruncated = true;
            newVisibleTags.push(tagRowItem);
            return;
          }

          currentRowCount++;
          currentRowVisibleTagAmount = 0;
          newHiddenTags.push(tagRowItem);
          return;
        }

        currentRowWidth = sumRowWidth;
        newVisibleTags.push(tagRowItem);
        currentRowVisibleTagAmount++;
        return;
      }

      if (sumRowWidth > maxWidth) {
        currentRowWidth = currentRowVisibleTagAmount ? tagWidth + gapWidth : 0;
        currentRowCount++;
        currentRowVisibleTagAmount = 0;
        newVisibleTags.push(tagRowItem);
        return;
      }

      currentRowVisibleTagAmount++;
      currentRowWidth = sumRowWidth;
      newVisibleTags.push(tagRowItem);
    });

    setVisibleTags(newVisibleTags);
    setHiddenTags(newHiddenTags);
    setFirstVisibleTagMaxWidth(newHiddenTags.length > 0 ? newFirstVisibleTagMaxWidth : undefined);
  }, [items, rowLimit, maxWidth, moreButtonWidth, onItemRemove, gapWidth, firstVisibleTagWidth]);

  const getVisibleTagStyle = (_item: TagRowItemInner, index: number) =>
    index === 0 && firstVisibleTagMaxWidth
      ? { flex: `0 0 ${firstVisibleTagMaxWidth}px`, width: firstVisibleTagMaxWidth, maxWidth: firstVisibleTagMaxWidth }
      : undefined;

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)} data-size={size}>
      <div className={styles.hiddenRow} ref={hiddenRowElementRef} data-size={size}>
        <TagList items={items} size={size} onItemRemove={onItemRemove} setTagRef={setTagElement} />
      </div>
      <div className={styles.hiddenMoreButton}>
        <TagMore items={items} text={moreButtonLabel} size={size} buttonRef={setHiddenMoreButtonElement} />
      </div>
      <div
        className={styles.visibleRow}
        data-size={size}
        data-shrink-first-tag={Boolean(firstVisibleTagMaxWidth)}
        data-test-id={TAG_ROW_TEST_IDS.visibleTagsWrapper}
      >
        <TagList items={visibleTags} size={size} onItemRemove={onItemRemove} getTagStyle={getVisibleTagStyle} />
        {hiddenTags.length > 0 && (
          <TagMore items={hiddenTags} text={moreButtonLabel} size={size} onItemRemove={onItemRemove} />
        )}
      </div>
    </div>
  );
}

export const TagRowTruncated = memo(TagRowTruncatedInner);
