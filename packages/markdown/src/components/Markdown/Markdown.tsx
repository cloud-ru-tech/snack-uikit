import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Blockquote, Code, Divider, Link, Table } from '../../helperComponents';
import styles from './styles.module.scss';

export type MarkdownProps = WithSupportProps<{
  /** Текст c разметкой */
  value?: string;
  /** CSS-класс */
  className?: string;
}>;

export function Markdown({ value, className, ...rest }: MarkdownProps) {
  return (
    <div className={className} {...extractSupportProps(rest)}>
      {value && (
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkGfm]}
          skipHtml
          components={{
            code: Code,
            table: Table,
            hr: Divider,
            blockquote: Blockquote,
            a: Link,
          }}
        >
          {value}
        </ReactMarkdown>
      )}
    </div>
  );
}
