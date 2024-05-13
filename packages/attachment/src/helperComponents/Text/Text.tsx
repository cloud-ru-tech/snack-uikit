import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps } from '@snack-uikit/utils';

import { useAttachmentContext } from '../../contexts';

export type TextProps = {
  text?: string;
  className: string;
  maxLines?: number;
  'data-test-id'?: string;
};

export function Text({ text, className, maxLines = 1, ...rest }: TextProps) {
  const { truncateVariant } = useAttachmentContext();

  if (!text) {
    return null;
  }

  return (
    <div className={className}>
      <TruncateString text={text} maxLines={maxLines} variant={truncateVariant} {...extractSupportProps(rest)} />
    </div>
  );
}
