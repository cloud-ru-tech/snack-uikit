import { IconPredefined } from '@snack-uikit/icon-predefined';
import { FileSVG } from '@snack-uikit/icons';
import { Spinner } from '@snack-uikit/loaders';

import { useAttachmentContext } from '../../../../contexts';
import { TEST_IDS } from '../../../../testIds';
import { AttachmentProps } from '../../../../types';
import styles from './styled.module.scss';

export type EmblemProps = {
  imageData?: string;
} & Pick<AttachmentProps, 'icon' | 'loading' | 'title'>;

export function Emblem({ loading, icon, imageData, title }: EmblemProps) {
  const { size } = useAttachmentContext();

  if (loading) {
    return (
      <IconPredefined
        size={size}
        icon={() => <Spinner size='s' />}
        decor={false}
        appearance='neutral'
        shape='square'
        data-test-id={TEST_IDS.loading}
      />
    );
  }

  if (imageData) {
    return (
      <IconPredefined
        size={size}
        icon={() => <img src={imageData} alt={title} data-size={size || undefined} className={styles.img} />}
        decor={false}
        shape='square'
        data-test-id={TEST_IDS.image}
      />
    );
  }

  return (
    <IconPredefined
      size={size}
      icon={icon ?? FileSVG}
      decor
      appearance='neutral'
      shape='square'
      data-test-id={TEST_IDS.icon}
    />
  );
}
