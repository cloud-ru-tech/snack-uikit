import cn from 'classnames';
import { KeyboardEvent, RefObject } from 'react';

import { SearchPrivate } from '@snack-uikit/search-private';

import { ITEM_PREFIXES } from '../../../constants';
import { SearchState } from '../../../types';
import { stopPropagation } from '../../../utils';
import { useNewListContext } from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export type SearchItemProps = {
  search?: SearchState;
  itemRef?: RefObject<HTMLElement>;
};

export function SearchItem({ search, itemRef }: SearchItemProps) {
  const { size = 's', firstItemId } = useNewListContext();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
    }
  };

  if (!search) {
    return null;
  }

  return (
    <div className={cn(commonStyles.listItem, styles.searchItem)} data-size={size} data-test-id='list__search-item'>
      <SearchPrivate
        size={size}
        tabIndex={ITEM_PREFIXES.search === firstItemId ? 0 : -1}
        onKeyDown={handleKeyDown}
        onFocus={stopPropagation}
        {...search}
        ref={itemRef as RefObject<HTMLInputElement>}
      />
    </div>
  );
}
