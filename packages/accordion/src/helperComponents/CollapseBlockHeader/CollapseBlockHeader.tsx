import { ReactNode } from 'react';

import { QuestionTooltip } from '@snack-ui/tooltip';
import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';
import { WithSupportProps } from '@snack-ui/utils';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type CollapseBlockHeaderProps = WithSupportProps<{
  title: string;
  description?: string;
  tip?: ReactNode;
}>;

export function CollapseBlockHeader({ title, description, tip }: CollapseBlockHeaderProps) {
  return (
    <>
      <div className={styles.headline}>
        <Typography.SansTitleM className={styles.title} data-test-id={TEST_IDS.title}>
          <TruncateString text={title} maxLines={1} />
        </Typography.SansTitleM>

        {tip && <QuestionTooltip size={QuestionTooltip.sizes.S} tip={tip} triggerDataTestId={TEST_IDS.tooltip} />}
      </div>

      {description && (
        <Typography.SansBodyM className={styles.subtitle} data-test-id={TEST_IDS.description}>
          <TruncateString text={description} maxLines={2} />
        </Typography.SansBodyM>
      )}
    </>
  );
}