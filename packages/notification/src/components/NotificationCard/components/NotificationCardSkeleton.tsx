import { Skeleton, SkeletonText } from '@snack-uikit/skeleton';

import { TEST_IDS } from '../../NotificationPanel/constants';
import styles from '../styles.module.scss';

const BORDER_RADIUS = 24;

export function NotificationCardSkeleton() {
  return (
    <div className={styles.notificationCard} data-test-id={TEST_IDS.skeleton} data-skeleton={true}>
      <Skeleton width={140} height={11} borderRadius={BORDER_RADIUS} />

      <div className={styles.notificationCardTitle} data-center={true}>
        <div className={styles.notificationCardTitleIcon}>
          <Skeleton width={16} height={16} borderRadius={BORDER_RADIUS} />
        </div>
        <Skeleton width={140} height={14} borderRadius={BORDER_RADIUS} />
      </div>

      <div className={styles.notificationCardContent}>
        <SkeletonText lines={3} borderRadius={BORDER_RADIUS} />
      </div>

      <div className={styles.notificationCardFooter}>
        <Skeleton width={140} borderRadius={BORDER_RADIUS} height={12} />
        <Skeleton width={140} borderRadius={BORDER_RADIUS} height={11} />
      </div>
    </div>
  );
}
