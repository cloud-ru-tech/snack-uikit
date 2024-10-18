import { ReactNode } from 'react';

import { CodeEditor } from '@snack-uikit/code-editor';

import styles from './styles.module.scss';

type CodeProps = { inline?: boolean; className?: string; children: ReactNode & ReactNode[] };

export function Code({ inline, className, children }: CodeProps) {
  const language = /language-(\w+)/.exec(className || '')?.[1];

  if (!inline) {
    return (
      <CodeEditor
        className={styles.wrapper}
        height={200}
        language={language}
        value={String(children).replace(/\n$/, '')}
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
