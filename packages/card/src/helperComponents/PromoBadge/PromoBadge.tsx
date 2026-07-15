import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type PromoBadgeProps = Pick<PromoTagProps, 'text' | 'appearance' | 'color'>;

export function PromoBadge({ text, appearance = 'primary', color = 'accent' }: PromoBadgeProps) {
  return (
    <div className={styles.promoBadge}>
      <PromoTag
        appearance={appearance}
        text={text}
        color={color}
        data-test-id={TEST_IDS.promoBadge}
        className={styles.promoTag}
      />
    </div>
  );
}
