import cn from 'classnames';

import { ButtonFunction } from '@snack-ui/button';
import { UpdateSVG } from '@snack-ui/icons';
import { SearchPrivate } from '@snack-ui/search';
import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { TEST_IDS } from '../../constants';
import { CheckboxPrivate, MoreActions, Separator } from '../../helperComponents';
import { extractCheckboxPrivateProps, extractSearchPrivateProps, isCheckedToolbarProps } from './helpers';
import styles from './styles.module.scss';
import { CheckedToolbarProps, DefaultToolbarProps } from './types';

export type ToolbarProps = WithSupportProps<DefaultToolbarProps | CheckedToolbarProps>;

export function Toolbar({ className, actions, moreActions, onRefresh, ...rest }: ToolbarProps) {
  return (
    <div
      className={cn(styles.container, className)}
      data-no-button-more={Boolean(!moreActions) || undefined}
      {...extractSupportProps(rest)}
      {...extractDataProps(rest)}
    >
      {isCheckedToolbarProps(rest) && (
        <>
          <CheckboxPrivate {...extractCheckboxPrivateProps(rest)} />
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
