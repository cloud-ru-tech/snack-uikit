import cn from 'classnames';
import { Dispatch, ReactElement, SetStateAction } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { BaseItemProps, Droplist } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import { TEST_IDS } from '../../components/NotificationCard/constants';
import { stopPropagationClick } from '../../components/NotificationCard/helpers';
import { NotificationCardProps } from '../../components/NotificationCard/NotificationCard';
import styles from './styles.module.scss';

export type Action = {
  icon?: ReactElement;
  tagLabel?: string;
} & Pick<BaseItemProps, 'content' | 'onClick' | 'disabled'>;

export type NotificationCardFunctionProps = Required<Pick<NotificationCardProps, 'actions'>> & {
  actions: Action[];
  open: boolean;
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  size: 's' | 'xs';
  icon: ReactElement;
  className?: string;
};

export function ActionsButton({
  actions,
  open,
  setDroplistOpen,
  size,
  icon,
  className,
}: NotificationCardFunctionProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(styles.container, className)}
      data-test-id={TEST_IDS.actions.wrapper}
      onClick={stopPropagationClick}
    >
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
        <ButtonFunction size={size} icon={icon} data-test-id={TEST_IDS.actions.droplistTrigger} />
      </Droplist>
    </div>
  );
}
