import { IconPredefined } from '@snack-uikit/icon-predefined';
import { Spinner } from '@snack-uikit/loaders';

import { useAttachmentContext } from '../../../../contexts';
import { Actions } from '../../../../helperComponents';
import { TEST_IDS } from '../../../../testIds';
import styles from '../styles.module.scss';

export function LoadingContent() {
  const { size } = useAttachmentContext();

  return (
    <div className={styles.composition} data-size={size}>
      <IconPredefined
        size={size}
        icon={() => <Spinner size='s' />}
        decor={false}
        appearance='neutral'
        shape='square'
        data-test-id={TEST_IDS.loading}
      />
      <Actions hideDownload hideRetry />
    </div>
  );
}
