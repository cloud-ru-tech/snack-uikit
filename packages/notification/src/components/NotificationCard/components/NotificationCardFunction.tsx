import { Dispatch, SetStateAction } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { KebabSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import { TEST_IDS } from '../constants';
import { NotificationCardProps } from '../NotificationCard';
import styles from '../styles.module.scss';

export type NotificationCardFunctionProps = Required<Pick<NotificationCardProps, 'actions'>> & {
  open: boolean;
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
};

export function NotificationCardFunction({ actions, open, setDroplistOpen }: NotificationCardFunctionProps) {
  return (
    <div className={styles.notificationCardFunction} data-test-id={TEST_IDS.actions.wrapper}>
      <Droplist
        trigger='clickAndFocusVisible'
        open={open}
        onOpenChange={setDroplistOpen}
        placement='bottom-end'
        scroll
        data-test-id={TEST_IDS.actions.droplist}
        items={actions.map(({ onClick, disabled, content, tagLabel, icon }) => ({
          onClick: e => {
            setDroplistOpen(false);
            onClick?.(e);
          },
          disabled,
          content,
          beforeContent: icon,
          afterContent: tagLabel ? <Tag label={tagLabel} /> : undefined,
          'data-test-id': TEST_IDS.actions.droplistAction,
        }))}
      >
        <ButtonFunction size='s' icon={<KebabSVG />} data-test-id={TEST_IDS.actions.droplistTrigger} />
      </Droplist>
    </div>
  );
}
