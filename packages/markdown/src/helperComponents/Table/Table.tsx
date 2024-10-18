import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import styles from './styles.module.scss';

type TableProps =
  | keyof JSX.IntrinsicElements
  | (React.ClassAttributes<HTMLTableElement> & React.TableHTMLAttributes<HTMLTableElement> & ReactMarkdownProps)
  | undefined;

export function Table(props: TableProps) {
  if (typeof props === 'object' && 'children' in props) {
    return <table className={styles.wrapper}>{props.children}</table>;
  }
  return <div />;
}
