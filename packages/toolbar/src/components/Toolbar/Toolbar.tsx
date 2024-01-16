import cn from 'classnames';

import { ButtonFunction } from '@snack-uikit/button';
import { UpdateSVG } from '@snack-uikit/icons';
import { SearchPrivate } from '@snack-uikit/search';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { DeleteAction, MoreActions, Separator } from '../../helperComponents';
import { extractDeleteActionProps, isDeleteActionProps } from './helpers';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps } from './types';

export type ToolbarProps = WithSupportProps<DefaultToolbarProps | CheckedToolbarProps>;

export function Toolbar({ className, before, after, outline, moreActions, onRefresh, search, ...rest }: ToolbarProps) {
  const needsDeleteAction = isDeleteActionProps(rest);
  const hasLeftSideElements = Boolean(needsDeleteAction || before || onRefresh);

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)} data-outline={outline || undefined}>
      {hasLeftSideElements && (
        <div className={styles.flexRow}>
          {needsDeleteAction && <DeleteAction {...extractDeleteActionProps(rest)} />}

          {before && (
            <div data-test-id={TEST_IDS.before} className={styles.actions}>
              {before}
            </div>
          )}

          {(needsDeleteAction || before) && <Separator />}

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
