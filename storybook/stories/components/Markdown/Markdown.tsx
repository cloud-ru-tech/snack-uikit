import './styles.css';

import ReactMarkdown from 'react-markdown';
import { useDarkMode } from 'storybook-dark-mode';

import { Code } from '../Code';

type MarkdownProps = {
  md: string;
};
const README_THEME = {
  light: 'markdown-body-light',
  dark: 'markdown-body-dark',
} as const;
export const Markdown = ({ md }: MarkdownProps) => {
  const isDark = useDarkMode();
  const theme = isDark ? 'dark' : 'light';
  const mainTheme = README_THEME[theme];
  const markdownClassName = `markdown-body ${mainTheme}`;
  return (
    <ReactMarkdown className={markdownClassName} components={{ code: Code }}>
      {md}
    </ReactMarkdown>
  );
};
