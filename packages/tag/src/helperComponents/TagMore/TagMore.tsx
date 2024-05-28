import { Ref } from 'react';

import { Dropdown } from '@snack-uikit/dropdown';
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
    <Dropdown
      placement='bottom-end'
      trigger='hoverAndFocusVisible'
      triggerClassName={styles.triggerClassName}
      content={
        <div className={styles.tagRowDroplistContainer} data-size={size}>
          <Scroll className={styles.tagRowDroplistScroll} size='s' barHideStrategy='move'>
            <TagRowSimple
              items={items}
              size={size}
              onItemRemove={onItemRemove}
              data-test-id={TAG_ROW_TEST_IDS.droplistTagsWrapper}
            />
          </Scroll>
        </div>
      }
    >
      <button
        type='button'
        className={styles.button}
        ref={buttonRef}
        data-size={size}
        data-test-id={TAG_ROW_TEST_IDS.moreButton}
      >{`${text}${items.length}`}</button>
    </Dropdown>
  );
}
