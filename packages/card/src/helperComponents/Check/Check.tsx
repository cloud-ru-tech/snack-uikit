import cn from 'classnames';

import { CheckSVG } from '@snack-ui/icons';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type CheckProps = {
  className?: string;
};

export function Check({ className }: CheckProps) {
  return (
    <div className={styles.checkWrapper}>
      <div className={cn(styles.checkContainer, className)} data-test-id={TEST_IDS.check}>
        <CheckSVG size={16} />
      </div>
    </div>
  );
}
