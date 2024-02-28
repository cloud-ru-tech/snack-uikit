import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type PromoBadgeProps = Pick<PromoTagProps, 'text' | 'appearance'>;

export function PromoBadge({ text, appearance = 'primary' }: PromoBadgeProps) {
  return (
    <div className={styles.promoBadge}>
      <PromoTag appearance={appearance} text={text} data-test-id={TEST_IDS.promoBadge} />
    </div>
  );
}
