import { Editor, EditorProps, useMonaco } from '@monaco-editor/react';
import { useMemo } from 'react';

import { excludeSupportProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { DEFAULT_THEME_OPTIONS, DEFAULT_THEME_VALUES } from './constants';
import { useCalculatedThemeValues } from './hooks';
import styles from './styles.module.scss';
import { isDark } from './utils';

export type CodeEditorProps = WithSupportProps<{
  /** Класснейм подключенной темы (из хука useThemeConfig() или ThemeProvider)
   * <br> По дефолту берется значение из useTheme внутри
   */
  themeClassName?: string;
}> &
  Omit<EditorProps, 'theme'>;

export function CodeEditor({ themeClassName, className, options, ...props }: CodeEditorProps) {
  const monaco = useMonaco();

  const themeValues = useCalculatedThemeValues(themeClassName);

  const themeDataWithoutBase = useMemo(
    () => ({
      inherit: true,
      ...(themeValues?.sys
        ? {
            semanticTokenColors: {
              enumMember: {
                foreground: themeValues.sys.blue.textLight,
              },
              'variable.constant': {
                foreground: themeValues.sys.orange.textSupport,
              },
              'variable.defaultLibrary': {
                foreground: themeValues.sys.yellow.textSupport,
              },
            },
            rules: [
              {
                foreground: themeValues.sys.neutral.textLight,
                token: 'comment',
              },
              {
                foreground: themeValues.sys.green.textSupport,
                token: 'string',
              },
              {
                foreground: themeValues.sys.yellow.textSupport,
                token: 'constant',
              },
              {
                foreground: themeValues.sys.blue.accentDefault,
                token: 'keyword',
              },
            ],
            colors: {
              'editor.foreground': themeValues.sys.neutral.textMain,
              'editor.selectionBackground': themeValues.sys.primary.decorHovered,
              'editor.lineHighlightBackground': themeValues.sys.neutral.decorDefault + '3F',
              'editorCursor.foreground': themeValues.sys.primary.accentDefault,
              'editorWhitespace.foreground': themeValues.sys.neutral.decorDefault,
              'scrollbarSlider.background': themeValues.sys.neutral.accentDefault + '52',
              'scrollbarSlider.hoverBackground': themeValues.sys.neutral.accentDefault + '7B',
              'scrollbarSlider.activeBackground': themeValues.sys.neutral.accentDefault + 'A4',
              "editorLineNumber.foreground": themeValues.sys.neutral.textLight,
              "editorLineNumber.activeForeground": themeValues.sys.neutral.textMain
            },
          }
        : DEFAULT_THEME_VALUES),
    }),
    [themeValues?.sys],
  );

  const dark = useMemo(
    () => isDark(themeValues?.sys.available.complementary ?? ''),
    [themeValues?.sys.available.complementary],
  );

  monaco?.editor.defineTheme('snackDark', { ...themeDataWithoutBase, base: 'vs-dark' });
  monaco?.editor.defineTheme('snack', { ...themeDataWithoutBase, base: 'vs' });

  return (
    <div className={className} {...extractSupportProps(props)}>
      <Editor
        theme={dark ? 'snackDark' : 'snack'}
        className={styles.editor}
        options={{
          minimap: {
            enabled: false,
          },
          ...(themeValues?.mono
            ? {
                fontSize: Number.parseFloat(themeValues.mono.body.s['font-size']),
                fontWeight: themeValues.mono.body.s['font-weight'],
              }
            : DEFAULT_THEME_OPTIONS),
          ...options,
        }}
        {...excludeSupportProps(props)}
      />
    </div>
  );
}
