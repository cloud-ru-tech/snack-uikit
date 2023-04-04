import ReactMarkdown from 'react-markdown';

import { Code } from '../Code';
import styles from './styles.module.scss';

type MarkdownProps = {
  md: string;
};

export const Markdown = ({ md }: MarkdownProps) => (
  <ReactMarkdown className={styles['markdown-body']} components={{ code: Code }}>
    {md}
  </ReactMarkdown>
);
