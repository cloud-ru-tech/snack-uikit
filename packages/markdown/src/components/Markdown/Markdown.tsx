import ReactMarkdown, { Components, Options } from 'react-markdown';
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
  /**
   * Игнор HTML в Markdown
   * @default true
   */
  skipHtml?: boolean;
  /**
   * Список remark плагинов для использования.
   * @see {@link https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins | Список remark плагинов}
   */
  remarkPlugins?: Options['remarkPlugins'];
  /**
   * Список rehype плагинов для использования.
   * @see {@link https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins | Список rehype плагинов}
   */
  rehypePlugins?: Options['rehypePlugins'];
}>;

export function Markdown({
  value,
  className,
  onCopyClick,
  skipHtml = true,
  remarkPlugins = [],
  rehypePlugins,
  components = {},
  ...rest
}: MarkdownProps) {
  return (
    <div className={className} {...extractSupportProps(rest)}>
      {value && (
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkGfm, ...remarkPlugins]}
          rehypePlugins={rehypePlugins}
          skipHtml={skipHtml}
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
