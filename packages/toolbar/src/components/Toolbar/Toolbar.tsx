import cn from 'classnames';
import { useRef } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { UpdateSVG } from '@snack-uikit/icons';
import { SearchPrivate } from '@snack-uikit/search-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { BulkActions, MoreActions, Separator } from '../../helperComponents';
import { extractBulkActionsProps, isBulkActionsProps } from './helpers';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps } from './types';

export type ToolbarProps = WithSupportProps<DefaultToolbarProps | CheckedToolbarProps>;

export function Toolbar({ className, after, outline, moreActions, onRefresh, search, ...rest }: ToolbarProps) {
  const needsBulkActions = isBulkActionsProps(rest);
  const hasLeftSideElements = Boolean(needsBulkActions || onRefresh);
  const resizingContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-outline={outline || undefined}
      ref={resizingContainerRef}
    >
      {hasLeftSideElements && (
        <div className={styles.beforeSearch}>
          {needsBulkActions && (
            <BulkActions {...extractBulkActionsProps(rest)} resizingContainerRef={resizingContainerRef} />
          )}

          {needsBulkActions && <Separator />}

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

      {(moreActions || after) && (
        <div className={styles.flexRow} data-align-right={(!search && !hasLeftSideElements) || undefined}>
          {after && (
            <>
              {(search || hasLeftSideElements) && <Separator />}

              <div data-test-id={TEST_IDS.after} className={styles.actions}>
                {after}
              </div>
            </>
          )}

          {moreActions && (
            <>
              <Separator />
              <MoreActions moreActions={moreActions} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
