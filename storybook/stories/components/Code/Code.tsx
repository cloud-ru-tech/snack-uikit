import { Icons } from '@storybook/components';
import copyToClipboard from 'copy-to-clipboard';
import { useRef, useState } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useDarkMode } from 'storybook-dark-mode';

import { dark } from './dark';
import { light } from './light';
import styles from './styles.module.scss';

const TEXTS = {
  Copy: 'Копировать',
  Copied: 'Скопировано!',
};

const TIMEOUT = 1000;
const CODE_THEME = {
  light: light,
  dark: dark,
};
export function Code({ inline, className, children, ...rest }: CodeProps) {
  const isDark = useDarkMode();
  const theme = isDark ? 'dark' : 'light';
  const [copyText, setCopyText] = useState(TEXTS.Copy);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const match = /language-(\w+)/.exec(className || '');
  const codeTheme = CODE_THEME[theme];
  return !inline && match ? (
    <div
      role='button'
      tabIndex={0}
      className={styles.codeWrapper}
      onClick={() => {
        timer.current && clearTimeout(timer.current);
        copyToClipboard(String(children), { format: 'text/plain' });
        setCopyText(TEXTS.Copied);
        timer.current = setTimeout(() => setCopyText(TEXTS.Copy), TIMEOUT);
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <SyntaxHighlighter style={codeTheme} language={match[1]} PreTag='div' {...rest}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <div className={styles.copyButton}>
        {copyText}
        <Icons icon='copy' />
      </div>
    </div>
  ) : (
    <code className={className}>{children}</code>
  );
}
