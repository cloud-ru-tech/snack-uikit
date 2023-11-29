export const DEFAULT_THEME_VALUES = {
  semanticTokenColors: {
    enumMember: { foreground: '#6b9fe3' },
    'variable.constant': { foreground: '#a2532f' },
    'variable.defaultLibrary': { foreground: '#80461b' },
  },
  rules: [
    { foreground: '#898989', token: 'comment' },
    { foreground: '#335747', token: 'string' },
    { foreground: '#80461b', token: 'constant' },
    { foreground: '#3280e8', token: 'keyword' },
  ],
  colors: {
    'editor.foreground': '#333333',
    'editor.selectionBackground': '#decdfb',
    'editor.lineHighlightBackground': '#decdfb',
    'editorCursor.foreground': '#794ed3',
    'editorWhitespace.foreground': '#dedede',
    'scrollbarSlider.background': '#75757552',
    'scrollbarSlider.hoverBackground': '#7575757B',
    'scrollbarSlider.activeBackground': '#757575A4',
    "editorLineNumber.foreground": "#333333",
    "editorLineNumber.activeForeground": "#898989"
  },
};

export const DEFAULT_THEME_OPTIONS = {
  body: {
    s: {
      fontWeight: '400',
      fontSize: 14,
    },
  },
};

export const THEME_VARS = {
  sys: {
    neutral: {
      decorDefault: '--sys-neutral-decor-default',
      accentDefault: '--sys-neutral-accent-default',
      textMain: '--sys-neutral-text-main',
      textLight: '--sys-neutral-text-light',
    },
    yellow: {
      textSupport: '--sys-yellow-text-support',
    },
    available: {
      complementary: '--sys-available-complementary',
    },
    blue: {
      accentDefault: '--sys-blue-accent-default',
      textLight: '--sys-blue-text-light',
    },
    orange: {
      textSupport: '--sys-orange-text-support',
    },
    primary: {
      decorHovered: '--sys-primary-decor-hovered',
      accentDefault: '--sys-primary-accent-default',
    },
    green: {
      textSupport: '--sys-green-text-support',
    },
  },
  mono: {
    body: {
      s: {
        'font-weight': '--mono-body-s-font-weight',
        'font-size': '--mono-body-s-font-size',
      },
    },
  },
};
