import cn from 'classnames';

import { ButtonFunction } from '@snack-uikit/button';
import { UpdateSVG } from '@snack-uikit/icons';
import { SearchPrivate } from '@snack-uikit/search';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { DeleteAction, MoreActions, SelectionMode, Separator } from '../../helperComponents';
import { extractDeleteActionProps, extractSearchPrivateProps, isDeleteActionProps } from './helpers';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps } from './types';

export type ToolbarProps = WithSupportProps<DefaultToolbarProps | CheckedToolbarProps>;

export function Toolbar({ className, actions, outline, moreActions, onRefresh, ...rest }: ToolbarProps) {
  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)} data-outline={outline || undefined}>
      {isDeleteActionProps(rest) && (
        <>
          <DeleteAction {...extractDeleteActionProps(rest)} />
          <Separator />
        </>
      )}

      {onRefresh && (
        <>
          <ButtonFunction
            icon={<UpdateSVG />}
            size={ButtonFunction.sizes.M}
            className={styles.updateButton}
            onClick={onRefresh}
            data-test-id={TEST_IDS.refreshButton}
          />
          <Separator />
        </>
      )}

      <SearchPrivate
        {...extractSearchPrivateProps(rest)}
        className={styles.search}
        size={SearchPrivate.sizes.M}
        data-test-id={TEST_IDS.search}
      />

      {actions && (
        <>
          <Separator />
          <div data-test-id={TEST_IDS.actions} className={styles.actions}>
            {actions}
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
  );
}

Toolbar.selectionModes = SelectionMode;
