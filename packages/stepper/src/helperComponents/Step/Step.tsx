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
  hideTailLine?: boolean;
  step: StepViewData;
  className?: string;
}>;

const getTailTestId = getTestIdBuilder('_element-tail');
const getStepTestId = getTestIdBuilder('_element-step');

export function Step({ step, className, 'data-test-id': testId, hideTailLine, ...props }: StepProps) {
  return (
    <div className={cn(styles.step, className)} data-state={step.state} {...extractSupportProps(props)}>
      <div className={styles.track}>
        <button
          type='button'
          className={styles.statusContainer}
          onClick={step.onClick}
          disabled={!step.onClick}
          data-test-id={getStepTestId(testId)}
          data-state={step.state}
        >
          <Icon {...step} className={styles.icon} />
        </button>

        {!hideTailLine && (
          <div
            className={styles.tail}
            data-completed={step.state === STEP_STATE.Completed || undefined}
            data-test-id={getTailTestId(testId)}
          >
            <div className={styles.tailLine} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <Typography.SansBodyM className={styles.title} tag='div'>
          <TruncateString text={step.title} />
        </Typography.SansBodyM>

        {step.description && (
          <Typography.SansBodyS className={styles.description} tag='div'>
            <TruncateString text={step.description} maxLines={2} />
          </Typography.SansBodyS>
        )}
      </div>
    </div>
  );
}
