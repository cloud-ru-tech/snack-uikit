import cn from 'classnames';

import { Card } from '@snack-uikit/card';
import { IconPredefined } from '@snack-uikit/icon-predefined';
import { FileSVG } from '@snack-uikit/icons';

import { useAttachmentContext } from '../../../../contexts';
import { TextBlock } from '../../../../helperComponents';
import { TEST_IDS } from '../../../../testIds';
import { AttachmentProps } from '../../../../types';
import styles from '../styles.module.scss';

type MainContentProps = {
  imageData?: string;
} & Pick<AttachmentProps, 'title' | 'icon' | 'className'>;

export function MainContent({ title, icon, imageData, className }: MainContentProps) {
  const { file, size } = useAttachmentContext();

  if (imageData) {
    return (
      <div className={cn(styles.composition, className)}>
        <Card.Image
          src={imageData}
          alt={file?.name ?? 'file'}
          mode='background'
          hideFading
          data-test-id={TEST_IDS.image}
        />
      </div>
    );
  }

  return (
    <div className={cn(styles.composition, className)} data-size={size}>
      <TextBlock title={title} align='center' />

      <IconPredefined
        size={size}
        icon={icon ?? FileSVG}
        decor
        appearance='neutral'
        shape='square'
        data-test-id={TEST_IDS.icon}
      />
    </div>
  );
}
