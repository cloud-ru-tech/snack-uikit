import { Ref } from 'react';

import { PopoverPrivate } from '@snack-uikit/popover-private';
import { Scroll } from '@snack-uikit/scroll';

import { TAG_ROW_TEST_IDS } from '../../components/TagRow/constants';
import { SIZE } from '../../constants';
import { Size, TagRowItemInner } from '../../types';
import { TagRowSimple } from '../TagRowSimple';
import styles from './styles.module.scss';

type TagMoreProps = {
  items: TagRowItemInner[];
  size: Size;
  text?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onItemRemove?(item: string): void;
};

export function TagMore({ items, text = '', size = SIZE.Xs, buttonRef, onItemRemove }: TagMoreProps) {
  return (
    <PopoverPrivate
      placement='bottom-end'
      trigger='hoverAndFocusVisible'
      triggerClassName={styles.triggerClassName}
      popoverContent={
        <div className={styles.tagRowDroplistContainer} data-size={size}>
          <Scroll className={styles.tagRowDroplistScroll} size='s' barHideStrategy='move' resize='none'>
            <TagRowSimple
              items={items}
              size={size}
              onItemRemove={onItemRemove}
              data-test-id={TAG_ROW_TEST_IDS.droplistTagsWrapper}
            />
          </Scroll>
        </div>
      }
      hasArrow={false}
    >
      <button
        type='button'
        className={styles.button}
        ref={buttonRef}
        data-size={size}
        data-test-id={TAG_ROW_TEST_IDS.moreButton}
      >{`${text}${items.length}`}</button>
    </PopoverPrivate>
  );
}
