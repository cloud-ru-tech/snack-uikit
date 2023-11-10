import { ReactNode, useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-ui/button';
import { ChevronDownSVG } from '@snack-ui/icons';
import { QuestionTooltip } from '@snack-ui/tooltip';
import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type CollapseBlockTitleProps = {
  title: string;
  description?: string;
  tip?: ReactNode;
  toggleExpanded(): void;
  expanded: boolean;
  actions?: ReactNode;
};

export function CollapseBlockTitle({
  title,
  description,
  tip,
  toggleExpanded,
  expanded,
  actions,
}: CollapseBlockTitleProps) {
  const functionLayoutRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<string>('0px');

  useEffect(() => {
    setWidth(() => {
      if (functionLayoutRef.current) {
        return getComputedStyle(functionLayoutRef.current, null).getPropertyValue('width');
      }

      return '0px';
    });
  }, [functionLayoutRef]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.header} data-test-id={TEST_IDS.header} onClick={toggleExpanded}>
      <div className={styles.text} style={{ '--width': width }}>
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
      </div>

      <div className={styles.functionLayout} ref={functionLayoutRef}>
        {actions}

        <ButtonFunction
          className={styles.button}
          data-expanded={expanded || undefined}
          icon={<ChevronDownSVG />}
          size={ButtonFunction.sizes.Xs}
          data-test-id={TEST_IDS.chevron}
        />
      </div>
    </div>
  );
}
