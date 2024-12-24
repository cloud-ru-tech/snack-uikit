import cn from 'classnames';

import { useAttachmentContext } from '../../../../contexts';
import { Actions, TextBlock } from '../../../../helperComponents';
import { AttachmentProps } from '../../../../types';
import styles from '../styles.module.scss';

type HoverContentProps = Pick<AttachmentProps, 'title' | 'description' | 'error' | 'className'>;

export function HoverContent({ title, description, error, className = '' }: HoverContentProps) {
  const { disabled, size } = useAttachmentContext();

  return (
    <div
      className={cn(styles.composition, {
        [className]: !disabled && !error,
      })}
      data-size={size}
    >
      <TextBlock title={title} error={error} description={!error ? description : undefined} align='center' />

      <Actions hideDownload={Boolean(error)} hideRetry={!error} />
    </div>
  );
}
