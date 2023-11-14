import { ReactNode } from 'react';

import { Avatar } from '@snack-ui/avatar';
import { QuestionTooltip } from '@snack-ui/tooltip';
import { Typography } from '@snack-ui/typography';

import styles from './styles.module.scss';

type ContentProps = {
  'data-test-id'?: string;
};

export function Content(props: ContentProps) {
  return (
    <div className={styles.content} {...props}>
      <Typography.SansBodyM>Demo content, for replacement, use the property: ◆ Slot...</Typography.SansBodyM>
      <Typography.SansBodyM>Connect your local component with unique content to this property</Typography.SansBodyM>
    </div>
  );
}

export type CustomHeaderProps = {
  name?: string;
  metadata?: string;
  tip?: ReactNode;
};

export function CustomHeader({ tip, name = 'Ivan Petrov', metadata }: CustomHeaderProps) {
  return (
    <div className={styles.content}>
      <div className={styles.headline}>
        <Avatar name={name} showTwoSymbols />
        <Typography.SansHeadlineS>{name}</Typography.SansHeadlineS>
        {tip && <QuestionTooltip tip={tip} />}
      </div>

      {metadata && <Typography.SansLabelM>{metadata}</Typography.SansLabelM>}
    </div>
  );
}
