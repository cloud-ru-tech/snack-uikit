import './theme/style.css';

import { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Themes, useTheme } from '@sbercloud/uikit-product-utils';

import { dark } from './theme/code/dark';
import { light } from './theme/code/light';

type MarkdownProps = {
  md: string;
};

const CODE_THEME: Record<Themes, { [key: string]: CSSProperties }> = {
  [Themes.Purple]: light,
  [Themes.Green]: light,
  [Themes.PurpleDark]: dark,
  [Themes.GreenDark]: dark,
};

export const Markdown = (props: MarkdownProps) => {
  const { theme } = useTheme();

  return (
    <ReactMarkdown
      children={props.md}
      className={'markdown-body'}
      components={{
        code({ inline, className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            // @ts-ignore
            <SyntaxHighlighter style={CODE_THEME[theme]} language={match[1]} PreTag='div' {...rest}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
