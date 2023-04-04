import { Icons } from '@storybook/components';
import React, { useRef, useState } from 'react';
import { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';

import styles from './styles.module.scss';
import { codeTheme } from './utils';

const TEXTS = {
  Copy: 'Копировать',
  Copied: 'Скопировано!',
};

const TIMEOUT = 1000;

export const Code: Components['code'] = ({ inline, className, children, ...rest }) => {
  const [copyText, setCopyText] = useState(TEXTS.Copy);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const match = /language-(\w+)/.exec(className || '');

  return !inline && match ? (
    <div
      role='button'
      tabIndex={0}
      className={styles.codeWrapper}
      onClick={() => {
        timer.current && clearTimeout(timer.current);
        copyToClipboard(String(children));
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
};
