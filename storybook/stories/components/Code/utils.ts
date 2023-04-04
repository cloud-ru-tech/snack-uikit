import { CSSProperties } from 'react';

export const codeTheme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    background: 'var(--index-gray-on-accent)',
    color: 'var(--sys-neutral-text-main-enabled)',
    fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    background: 'var(--index-gray-on-accent)',
    color: 'var(--sys-neutral-text-main-enabled)',
    fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
  },
  'code[class*="language-"]::-moz-selection': {
    background: 'var(--index-gray-container-enabled)',
    color: 'inherit',
  },
  'code[class*="language-"] *::-moz-selection': {
    background: 'var(--index-gray-container-enabled)',
    color: 'inherit',
  },
  'pre[class*="language-"] *::-moz-selection': {
    background: 'var(--index-gray-container-enabled)',
    color: 'inherit',
  },
  'code[class*="language-"]::selection': {
    background: 'var(--index-gray-container-enabled)',
    color: 'inherit',
  },
  'code[class*="language-"] *::selection': {
    background: 'var(--index-gray-container-enabled)',
    color: 'inherit',
  },
  'pre[class*="language-"] *::selection': {
    background: 'var(--index-gray-container-enabled)',
    color: 'inherit',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '0.2em 0.3em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: 'var(--index-gray-line-enabled)',
    fontStyle: 'italic',
  },
  prolog: {
    color: 'var(--index-gray-line-enabled)',
  },
  cdata: {
    color: 'var(--index-gray-line-enabled)',
  },
  doctype: {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  punctuation: {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  entity: {
    color: 'var(--sys-neutral-text-main-enabled)',
    cursor: 'help',
  },
  'attr-name': {
    color: 'var(--index-orange-accent-activated)',
  },
  'class-name': {
    color: 'var(--index-orange-accent-activated)',
  },
  boolean: {
    color: 'var(--index-orange-accent-activated)',
  },
  constant: {
    color: 'var(--index-orange-accent-activated)',
  },
  number: {
    color: 'var(--index-orange-accent-activated)',
  },
  atrule: {
    color: 'var(--index-orange-accent-activated)',
  },
  keyword: {
    color: 'var(--index-pink-accent-enabled)',
  },
  property: {
    color: 'var(--index-red-accent-enabled)',
  },
  tag: {
    color: 'var(--index-red-accent-enabled)',
  },
  symbol: {
    color: 'var(--index-red-accent-enabled)',
  },
  deleted: {
    color: 'var(--index-red-accent-enabled)',
  },
  important: {
    color: 'var(--index-red-accent-enabled)',
  },
  selector: {
    color: 'var(--index-green-accent-enabled)',
  },
  string: {
    color: 'var(--index-green-accent-enabled)',
  },
  char: {
    color: 'var(--index-green-accent-enabled)',
  },
  builtin: {
    color: 'var(--index-green-accent-enabled)',
  },
  inserted: {
    color: 'var(--index-green-accent-enabled)',
  },
  regex: {
    color: 'var(--index-green-accent-enabled)',
  },
  'attr-value': {
    color: 'var(--index-green-accent-enabled)',
  },
  'attr-value > .token.punctuation': {
    color: 'var(--index-green-accent-enabled)',
  },
  variable: {
    color: 'var(--index-blue-accent-enabled)',
  },
  operator: {
    color: 'var(--index-blue-accent-enabled)',
  },
  function: {
    color: 'var(--index-blue-accent-enabled)',
  },
  url: {
    color: 'var(--index-blue-line-hovered)',
  },
  'attr-value > .token.punctuation.attr-equals': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  'special-attr > .token.attr-value > .token.value.css': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.language-css .token.selector': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.language-css .token.property': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.language-css .token.function': {
    color: 'var(--index-blue-line-hovered)',
  },
  '.language-css .token.url > .token.function': {
    color: 'var(--index-blue-line-hovered)',
  },
  '.language-css .token.url > .token.string.url': {
    color: 'var(--index-green-accent-enabled)',
  },
  '.language-css .token.important': {
    color: 'var(--index-pink-accent-enabled)',
  },
  '.language-css .token.atrule .token.rule': {
    color: 'var(--index-pink-accent-enabled)',
  },
  '.language-javascript .token.operator': {
    color: 'var(--index-pink-accent-enabled)',
  },
  '.language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation': {
    color: 'var(--index-red-text-main-hovered)',
  },
  '.language-json .token.operator': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.language-json .token.null.keyword': {
    color: 'var(--index-orange-accent-activated)',
  },
  '.language-markdown .token.url': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.language-markdown .token.url > .token.operator': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.language-markdown .token.url-reference.url > .token.string': {
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.language-markdown .token.url > .token.content': {
    color: 'var(--index-blue-accent-enabled)',
  },
  '.language-markdown .token.url > .token.url': {
    color: 'var(--index-blue-line-hovered)',
  },
  '.language-markdown .token.url-reference.url': {
    color: 'var(--index-blue-line-hovered)',
  },
  '.language-markdown .token.blockquote.punctuation': {
    color: 'var(--index-gray-line-enabled)',
    fontStyle: 'italic',
  },
  '.language-markdown .token.hr.punctuation': {
    color: 'var(--index-gray-line-enabled)',
    fontStyle: 'italic',
  },
  '.language-markdown .token.code-snippet': {
    color: 'var(--index-green-accent-enabled)',
  },
  '.language-markdown .token.bold .token.content': {
    color: 'var(--index-orange-accent-activated)',
  },
  '.language-markdown .token.italic .token.content': {
    color: 'var(--index-pink-accent-enabled)',
  },
  '.language-markdown .token.strike .token.content': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.language-markdown .token.strike .token.punctuation': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.language-markdown .token.list.punctuation': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.language-markdown .token.title.important > .token.punctuation': {
    color: 'var(--index-red-accent-enabled)',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  namespace: {
    opacity: '0.8',
  },
  'token.tab:not(:empty):before': {
    color: 'var(--index-gray-container-opacity-activated)',
  },
  'token.cr:before': {
    color: 'var(--index-gray-container-opacity-activated)',
  },
  'token.lf:before': {
    color: 'var(--index-gray-container-opacity-activated)',
  },
  'token.space:before': {
    color: 'var(--index-gray-container-opacity-activated)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item': {
    marginRight: '0.4em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': {
    background: 'var(--index-gray-container-enabled)',
    color: 'var(--index-gray-text-main-hovered)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': {
    background: 'var(--index-gray-container-enabled)',
    color: 'var(--index-gray-text-main-hovered)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': {
    background: 'var(--index-gray-container-enabled)',
    color: 'var(--index-gray-text-main-hovered)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
    background: 'var(--index-gray-container-hovered)',
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
    background: 'var(--index-gray-container-hovered)',
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
    background: 'var(--index-gray-container-hovered)',
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
    background: 'var(--index-gray-container-hovered)',
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': {
    background: 'var(--index-gray-container-hovered)',
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': {
    background: 'var(--index-gray-container-hovered)',
    color: 'var(--sys-neutral-text-main-enabled)',
  },
  '.line-highlight.line-highlight': {
    background: 'var(--index-gray-container-opacity-enabled)',
  },
  '.line-highlight.line-highlight:before': {
    background: 'var(--index-gray-container-enabled)',
    color: 'var(--sys-neutral-text-main-enabled)',
    padding: '0.1em 0.6em',
    borderRadius: '0.3em',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
  },
  '.line-highlight.line-highlight[data-end]:after': {
    background: 'var(--index-gray-container-enabled)',
    color: 'var(--sys-neutral-text-main-enabled)',
    padding: '0.1em 0.6em',
    borderRadius: '0.3em',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
  },
  'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before': {
    backgroundColor: 'var(--index-gray-container-opacity-enabled)',
  },
  '.line-numbers.line-numbers .line-numbers-rows': {
    borderRightColor: 'var(--index-gray-container-opacity-activated)',
  },
  '.command-line .command-line-prompt': {
    borderRightColor: 'var(--index-gray-container-opacity-activated)',
  },
  '.line-numbers .line-numbers-rows > span:before': {
    color: 'var(--index-gray-line-hovered)',
  },
  '.command-line .command-line-prompt > span:before': {
    color: 'var(--index-gray-line-hovered)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-1': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-5': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-9': {
    color: 'var(--index-red-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-2': {
    color: 'var(--index-green-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-6': {
    color: 'var(--index-green-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-10': {
    color: 'var(--index-green-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-3': {
    color: 'var(--index-blue-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-7': {
    color: 'var(--index-blue-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-11': {
    color: 'var(--index-blue-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-4': {
    color: 'var(--index-pink-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-8': {
    color: 'var(--index-pink-accent-enabled)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-12': {
    color: 'var(--index-pink-accent-enabled)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)': {
    backgroundColor: 'var(--index-pink-container-opacity-hovered)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)': {
    backgroundColor: 'var(--index-pink-container-opacity-hovered)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection': {
    backgroundColor: 'var(--index-pink-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)': {
    backgroundColor: 'var(--index-green-container-opacity-hovered)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)': {
    backgroundColor: 'var(--index-green-container-opacity-hovered)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection': {
    backgroundColor: 'var(--index-green-container-opacity-activated)',
  },
  '.prism-previewer.prism-previewer:before': {
    borderColor: 'hsl(0, 0, 95%)',
  },
  '.prism-previewer-gradient.prism-previewer-gradient div': {
    borderColor: 'hsl(0, 0, 95%)',
    borderRadius: '0.3em',
  },
  '.prism-previewer-color.prism-previewer-color:before': {
    borderRadius: '0.3em',
  },
  '.prism-previewer-easing.prism-previewer-easing:before': {
    borderRadius: '0.3em',
  },
  '.prism-previewer.prism-previewer:after': {
    borderTopColor: 'hsl(0, 0, 95%)',
  },
  '.prism-previewer-flipped.prism-previewer-flipped.after': {
    borderBottomColor: 'hsl(0, 0, 95%)',
  },
  '.prism-previewer-angle.prism-previewer-angle:before': {
    background: 'hsl(0, 0%, 100%)',
  },
  '.prism-previewer-time.prism-previewer-time:before': {
    background: 'hsl(0, 0%, 100%)',
  },
  '.prism-previewer-easing.prism-previewer-easing': {
    background: 'hsl(0, 0%, 100%)',
  },
  '.prism-previewer-angle.prism-previewer-angle circle': {
    stroke: 'var(--sys-neutral-text-main-enabled)',
    strokeOpacity: '1',
  },
  '.prism-previewer-time.prism-previewer-time circle': {
    stroke: 'var(--sys-neutral-text-main-enabled)',
    strokeOpacity: '1',
  },
  '.prism-previewer-easing.prism-previewer-easing circle': {
    stroke: 'var(--sys-neutral-text-main-enabled)',
    fill: 'transparent',
  },
  '.prism-previewer-easing.prism-previewer-easing path': {
    stroke: 'var(--sys-neutral-text-main-enabled)',
  },
  '.prism-previewer-easing.prism-previewer-easing line': {
    stroke: 'var(--sys-neutral-text-main-enabled)',
  },
};
