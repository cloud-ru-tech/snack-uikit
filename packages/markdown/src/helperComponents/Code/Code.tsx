import { ReactNode } from 'react';

import { CodeEditor } from '@snack-uikit/code-editor';

import styles from './styles.module.scss';

type CodeProps = {
  inline?: boolean;
  className?: string;
  children: ReactNode & ReactNode[];
  onClick?(): void;
};

export function Code({ inline, className, children, onClick }: CodeProps) {
  const language = /language-(\w+)/.exec(className || '')?.[1];
  const value = String(children).replace(/\n$/, '');

  if (!inline) {
    return (
      <CodeEditor
        onCopyClick={onClick}
        height={200}
        className={styles.wrapper}
        language={language}
        hasHeader
        value={value}
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
        }}
      />
    );
  }

  return <code className={styles.code}>{children}</code>;
}
