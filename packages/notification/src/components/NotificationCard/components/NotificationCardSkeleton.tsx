import { SkeletonText } from '@snack-uikit/skeleton';

import { TEST_IDS } from '../../NotificationPanel/constants';
import styles from '../styles.module.scss';

export function NotificationCardSkeleton() {
  return (
    <div className={styles.notificationCard} data-test-id={TEST_IDS.skeleton} data-skeleton={true}>
      <SkeletonText width={140} typography='label-s' lines={1} />

      <div className={styles.notificationCardTitle} data-center={true}>
        <div className={styles.notificationCardTitleIcon}>
          <SkeletonText width={16} typography='title-s' lines={1} />
        </div>
        <SkeletonText width={140} typography='title-s' lines={1} />
      </div>

      <div className={styles.notificationCardContent}>
        <SkeletonText lines={3} typography='body-s' />
      </div>

      <div className={styles.notificationCardFooter}>
        <SkeletonText width={140} typography='body-s' lines={1} />
        <SkeletonText width={140} typography='label-s' lines={1} />
      </div>
    </div>
  );
}
