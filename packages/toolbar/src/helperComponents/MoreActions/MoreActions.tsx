import { ReactNode, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { MoreSVG } from '@snack-uikit/icons';
import { BaseItemProps, Droplist } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import { TEST_IDS } from '../../constants';

type Action = {
  tagLabel?: string;
  icon?: ReactNode;
} & Pick<BaseItemProps, 'content' | 'disabled' | 'onClick'>;

export type MoreActionsProps = {
  moreActions: Action[];
};

export function MoreActions({ moreActions }: MoreActionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Droplist
      trigger='clickAndFocusVisible'
      open={isOpen}
      data-test-id={TEST_IDS.droplist}
      onOpenChange={setIsOpen}
      placement='bottom-end'
      scroll
      size='s'
      items={moreActions.map(item => ({
        onClick: e => {
          item.onClick?.(e);
          setIsOpen(false);
          e.stopPropagation();
        },
        disabled: item.disabled,
        content: item.content,
        beforeContent: item.icon,
        afterContent: item.tagLabel ? <Tag label={item.tagLabel} /> : undefined,
        'data-test-id': TEST_IDS.option,
      }))}
    >
      <ButtonFunction icon={<MoreSVG size={24} />} size='m' data-test-id={TEST_IDS.moreActionsButton} />
    </Droplist>
  );
}
