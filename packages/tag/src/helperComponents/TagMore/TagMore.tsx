import { Ref } from 'react';

import { PopoverPrivate } from '@snack-ui/popover-private';
import { Scroll } from '@snack-ui/scroll';

import { TAG_ROW_TEST_IDS } from '../../components/TagRow/constants';
import { Size } from '../../constants';
import { TagRowItemInner } from '../../types';
import { TagRowSimple } from '../TagRowSimple';
import styles from './styles.module.scss';

type TagMoreProps = {
  items: TagRowItemInner[];
  size: Size;
  text?: string;
  dropdownOffset?: number;
  buttonRef?: Ref<HTMLButtonElement>;
  onItemRemove?(item: string): void;
};

export function TagMore({
  items,
  text = '',
  size = Size.Xs,
  dropdownOffset = 4,
  buttonRef,
  onItemRemove,
}: TagMoreProps) {
  return (
    <PopoverPrivate
      placement={PopoverPrivate.placements.BottomEnd}
      trigger={PopoverPrivate.triggers.HoverAndFocusVisible}
      popoverContent={
        <div className={styles.tagRowDroplistContainer} data-size={size}>
          <Scroll
            className={styles.tagRowDroplistScroll}
            size={Scroll.sizes.S}
            barHideStrategy={Scroll.barHideStrategies.Move}
            resize={Scroll.resizes.None}
          >
            <TagRowSimple
              items={items}
              size={size}
              onItemRemove={onItemRemove}
              data-test-id={TAG_ROW_TEST_IDS.droplistTagsWrapper}
            />
          </Scroll>
        </div>
      }
      offset={dropdownOffset}
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
