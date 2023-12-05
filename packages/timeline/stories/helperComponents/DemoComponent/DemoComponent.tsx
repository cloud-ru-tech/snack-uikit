import { Typography } from '@snack-uikit/typography';

import styles from '../../styles.module.scss';

type DemoComponentProps = {
  title?: string;
  description?: string;
};

export function DemoComponent({ title, description }: DemoComponentProps) {
  return (
    <div className={styles.demoComponent}>
      {title && <Typography.SansTitleM>{title}</Typography.SansTitleM>}
      {description && <Typography.SansBodyM>{description}</Typography.SansBodyM>}
    </div>
  );
}
