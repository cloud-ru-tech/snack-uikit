import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Blockquote, Code, Divider, Link, Table } from '../../helperComponents';
import styles from './styles.module.scss';

export type MarkdownProps = WithSupportProps<{
  /** Текст c разметкой */
  value?: string;
  /** CSS-класс */
  className?: string;
  /** Переопределение компонентов по умолчанию и добавление новых в CodeEditor */
  components?: Components;
  /** Действие при клике на кнопку копирования кода */
  onCopyClick?(): void;
}>;

export function Markdown({ value, className, onCopyClick, components = {}, ...rest }: MarkdownProps) {
  return (
    <div className={className} {...extractSupportProps(rest)}>
      {value && (
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkGfm]}
          skipHtml
          components={{
            code: props => <Code {...props} onClick={onCopyClick} />,
            table: Table,
            hr: Divider,
            blockquote: Blockquote,
            a: Link,
            ...components,
          }}
        >
          {value}
        </ReactMarkdown>
      )}
    </div>
  );
}
