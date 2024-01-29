import cn from 'classnames';
import { FocusEvent, RefObject } from 'react';

import { SearchPrivate } from '@snack-uikit/search-private';

import { SearchState } from '../../../types';
import { useListContext, useParentListContext } from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export type SearchItemProps = {
  search?: SearchState;
};

export function SearchItem({ search }: SearchItemProps) {
  const { parentItemRefs, parentSetActiveFocusIndex } = useParentListContext();
  const { size } = useListContext();

  if (!Boolean(search)) {
    return null;
  }

  return (
    <div className={cn(commonStyles.listItem, styles.searchItem)} data-size={size} data-test-id='list__search-item'>
      <SearchPrivate
        size={size}
        tabIndex={-1}
        onKeyDown={e => {
          if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
            e.preventDefault();
          }

          if (['ArrowRight'].includes(e.key)) {
            e.stopPropagation();
          }
        }}
        onFocus={(e: FocusEvent<HTMLInputElement>) => {
          if (e.target === parentItemRefs[0].current) {
            parentSetActiveFocusIndex?.(0);
          }
          e.stopPropagation();
        }}
        {...search}
        ref={parentItemRefs[0] as RefObject<HTMLInputElement>}
      />
    </div>
  );
}
