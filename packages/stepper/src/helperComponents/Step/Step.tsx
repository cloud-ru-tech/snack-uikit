import cn from 'classnames';

import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { STEP_STATE } from '../../constants';
import { StepViewData } from '../../types';
import { getTestIdBuilder } from '../../utils';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

export type StepProps = WithSupportProps<{
  step: StepViewData;
  className?: string;
  isLast: boolean;
}>;

const getTailTestId = getTestIdBuilder('_element-tail');
const getStepTestId = getTestIdBuilder('_element-step');

export function Step({ step, className, isLast, 'data-test-id': testId, ...props }: StepProps) {
  return (
    <div className={cn(styles.step, className)} data-state={step.state} {...extractSupportProps(props)}>
      <button
        className={styles.content}
        onClick={step.onClick}
        disabled={!step.onClick}
        data-test-id={getStepTestId(testId)}
        data-state={step.state}
      >
        <Icon {...step} className={styles.icon} />
        <Typography.SansBodyM className={styles.title} tag='div'>
          <TruncateString text={step.title} />
        </Typography.SansBodyM>
      </button>
      {!isLast && (
        <div
          className={styles.tail}
          data-completed={step.state === STEP_STATE.Completed || undefined}
          data-test-id={getTailTestId(testId)}
        >
          <div className={styles.tailLine} />
        </div>
      )}
    </div>
  );
}
