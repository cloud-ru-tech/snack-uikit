import './styles.css';

import ReactMarkdown from 'react-markdown';

import { Code } from '../Code';

type MarkdownProps = {
  md: string;
  darkMode?: boolean;
};

const README_THEME = {
  light: 'markdown-body-light',
  dark: 'markdown-body-dark',
} as const;

export const Markdown = ({ md, darkMode }: MarkdownProps) => {
  const theme = darkMode ? 'dark' : 'light';
  const mainTheme = README_THEME[theme];
  const markdownClassName = `markdown-body ${mainTheme}`;

  return (
    <ReactMarkdown
      className={markdownClassName}
      components={{ code: props => <Code {...props} darkMode={darkMode} /> }}
    >
      {md}
    </ReactMarkdown>
  );
};
