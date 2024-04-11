import cn from 'classnames';

import { TruncateString, TruncateStringProps } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { useNewListContext } from '../../components/Lists/contexts';
import styles from './styles.module.scss';

export type ItemContentProps = WithSupportProps<{
  option: string | number;
  caption?: string;
  description?: string;
  truncate?: {
    option?: number;
    description?: number;
    variant?: TruncateStringProps['variant'];
  };
  disabled?: boolean;
  className?: string;
}>;

export function ItemContent({
  truncate,
  caption,
  description,
  option,
  className,
  disabled,
  ...rest
}: ItemContentProps) {
  const { size = 's' } = useNewListContext();

  return (
    <div
      className={cn(styles.content, className)}
      {...extractSupportProps(rest)}
      data-size={size ?? 's'}
      data-disabled={disabled || undefined}
    >
      <div className={styles.headline}>
        <span className={styles.label}>
          <TruncateString
            variant={truncate?.variant}
            text={String(option)}
            maxLines={truncate?.option ?? 1}
            data-test-id='list__base-item-option'
          />
        </span>
        {caption && <span className={styles.caption}>{caption}</span>}
      </div>

      {description && (
        <div className={styles.description}>
          <TruncateString
            text={description}
            maxLines={truncate?.description ?? 2}
            data-test-id='list__base-item-description'
          />
        </div>
      )}
    </div>
  );
}
