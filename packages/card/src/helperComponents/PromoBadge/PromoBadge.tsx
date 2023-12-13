import { PromoTag } from '@snack-uikit/promo-tag';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type PromoBadgeProps = {
  text: string;
};

export function PromoBadge({ text }: PromoBadgeProps) {
  return (
    <div className={styles.promoBadge}>
      <PromoTag appearance='primary' text={text} data-test-id={TEST_IDS.promoBadge} />
    </div>
  );
}
