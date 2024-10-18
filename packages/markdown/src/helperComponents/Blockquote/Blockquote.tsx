import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import styles from './styles.module.scss';

type BlockquoteProps =
  | keyof JSX.IntrinsicElements
  | (React.ClassAttributes<HTMLQuoteElement> & React.BlockquoteHTMLAttributes<HTMLQuoteElement> & ReactMarkdownProps)
  | undefined;

export function Blockquote(props: BlockquoteProps) {
  if (typeof props === 'object' && 'children' in props) {
    return (
      <div className={styles.wrapper}>
        <blockquote className={styles.blockquote}>{props.children}</blockquote>
      </div>
    );
  }
  return <div />;
}
