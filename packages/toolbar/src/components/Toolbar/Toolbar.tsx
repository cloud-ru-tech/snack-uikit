import cn from 'classnames';
import { useRef } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChipChoiceRow, FiltersState } from '@snack-uikit/chips';
import { UpdateSVG } from '@snack-uikit/icons';
import { SearchPrivate } from '@snack-uikit/search-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { BulkActions, FilterButton, MoreActions, Separator } from '../../helperComponents';
import { extractBulkActionsProps, isBulkActionsProps } from './helpers';
import { useFilters, usePersistState } from './hooks';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps, FilterRow, ToolbarPersistConfig } from './types';

export type ToolbarProps<TState extends FiltersState = Record<string, unknown>> = WithSupportProps<
  DefaultToolbarProps | CheckedToolbarProps
> & {
  filterRow?: FilterRow<TState>;
  /** Конфиг для сохранения состояния в localStorage и queryParams. <br>
   *  Поле id должно быть уникальным для каждого инстанса компонента. <br>
   *  */
  persist?: ToolbarPersistConfig<TState>;
};

export function Toolbar<TState extends FiltersState = Record<string, unknown>>({
  className,
  after,
  outline,
  moreActions,
  onRefresh,
  search,
  filterRow: filterRowProps,
  persist,
  ...rest
}: ToolbarProps<TState>) {
  const needsBulkActions = isBulkActionsProps(rest);
  const hasLeftSideElements = Boolean(needsBulkActions || onRefresh);
  const resizingContainerRef = useRef<HTMLDivElement>(null);

  const { filterButton, filterRow } = useFilters<TState>({ filterRow: filterRowProps });

  usePersistState({ persist, filter: filterRow?.value, search: search?.value });

  return (
    <div className={styles.containerWrapper} {...extractSupportProps(rest)}>
      <div className={cn(styles.container, className)} data-outline={outline || undefined} ref={resizingContainerRef}>
        {hasLeftSideElements && (
          <div className={styles.beforeSearch}>
            {needsBulkActions && (
              <>
                <BulkActions {...extractBulkActionsProps(rest)} resizingContainerRef={resizingContainerRef} />
                <Separator />
              </>
            )}

            {onRefresh && (
              <>
                <ButtonFunction
                  icon={<UpdateSVG />}
                  size='m'
                  className={styles.updateButton}
                  onClick={onRefresh}
                  data-test-id={TEST_IDS.refreshButton}
                />
                <Separator />
              </>
            )}
          </div>
        )}

        {search && <SearchPrivate {...search} className={styles.search} size='m' data-test-id={TEST_IDS.search} />}

        {(moreActions || after || filterButton) && (
          <div className={styles.flexRow} data-align-right={(!search && !hasLeftSideElements) || undefined}>
            {after && (
              <>
                {(search || hasLeftSideElements) && <Separator />}

                <div data-test-id={TEST_IDS.after} className={styles.actions}>
                  {after}
                </div>
              </>
            )}

            {(moreActions || filterButton) && <Separator />}

            {filterButton && <FilterButton {...filterButton} />}

            {moreActions && <MoreActions moreActions={moreActions} />}
          </div>
        )}
      </div>

      {filterRow && <ChipChoiceRow<TState> {...filterRow} size='xs' data-test-id={TEST_IDS.filterRow} />}
    </div>
  );
}
