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
