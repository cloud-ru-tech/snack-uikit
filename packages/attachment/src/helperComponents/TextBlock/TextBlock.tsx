import cn from 'classnames';

import { useAttachmentContext } from '../../contexts';
import { TEST_IDS } from '../../testIds';
import { AttachmentProps } from '../../types';
import { Text } from '../Text';
import styles from './styles.module.scss';

export type TextBlockProps = Pick<AttachmentProps, 'title' | 'description' | 'error' | 'className'> & {
  align?: 'center' | 'left';
};

export function TextBlock({ title, description, error, className, align = 'left' }: TextBlockProps) {
  const { size, truncate = {} } = useAttachmentContext();

  return (
    <div className={cn(styles.content, className)} data-size={size} data-align={align}>
      <Text className={styles.title} text={title} data-test-id={TEST_IDS.title} maxLines={truncate?.title} />
      <Text
        className={styles.description}
        text={description}
        data-test-id={TEST_IDS.description}
        maxLines={truncate?.description}
      />
      <Text className={styles.error} text={error} data-test-id={TEST_IDS.error} maxLines={truncate?.error} />
    </div>
  );
}
