import { Editor, OnMount, useMonaco } from '@monaco-editor/react';
import cn from 'classnames';
import { useCallback, useMemo, useState } from 'react';

import { Spinner } from '@snack-uikit/loaders';
import { extractSupportProps, isBrowser, WithSupportProps } from '@snack-uikit/utils';

import { CODE_EDITOR_OPTIONS, DEFAULT_THEME_OPTIONS, DEFAULT_THEME_VALUES } from './constants';
import { useApplyJsonSchema, useCalculatedThemeValues } from './hooks';
import styles from './styles.module.scss';
import { EditorBaseProps, EditorWithJsonSchemaProps } from './types';
import { initLoaderConfig, isDark } from './utils';

initLoaderConfig();

export type CodeEditorProps = WithSupportProps<{
  /**
   * Название текущей темы. Значение не важно, важно что смена значения запускает пересчет стилей.
   */
  themeName?: string;
  /**
   * Включение/отключение псевдобекграунда
   */
  hasBackground?: boolean;
}> &
  (EditorBaseProps | EditorWithJsonSchemaProps);

export function CodeEditor({
  themeName,
  className,
  theme,
  options,
  loading,
  hasBackground = true,
  onMount,
  language,
  ...props
}: CodeEditorProps) {
  const monaco = useMonaco();
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null);

  const { jsonSchemaProps, jsonSchemaOptions } = useApplyJsonSchema(
    language,
    'jsonSchema' in props ? props.jsonSchema : undefined,
  );

  const onEditorMount = useCallback<OnMount>(
    (editor, monaco) => {
      monaco && isBrowser() && document?.fonts?.ready.finally(monaco.editor.remeasureFonts);
      onMount?.(editor, monaco);
    },
    [onMount],
  );

  const themeValues = useCalculatedThemeValues({ themeName, stylesOriginNode: wrapperElement });

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
              'editor.background': '#00000000',
              'editor.foreground': themeValues.sys.neutral.textMain,
              'editor.selectionBackground': themeValues.sys.primary.decorHovered,
              'editor.lineHighlightBackground': themeValues.sys.neutral.decorDefault + '3F',
              'editorCursor.foreground': themeValues.sys.primary.accentDefault,
              'editorWhitespace.foreground': themeValues.sys.neutral.decorDefault,
              'scrollbarSlider.background': themeValues.sys.neutral.accentDefault + '52',
              'scrollbarSlider.hoverBackground': themeValues.sys.neutral.accentDefault + '7B',
              'scrollbarSlider.activeBackground': themeValues.sys.neutral.accentDefault + 'A4',
              'editorLineNumber.foreground': themeValues.sys.neutral.textLight,
              'editorLineNumber.activeForeground': themeValues.sys.neutral.textMain,
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

  const mergedOptions = useMemo(
    () => ({
      ...CODE_EDITOR_OPTIONS,
      ...jsonSchemaOptions,
      ...(themeValues?.mono
        ? {
            fontSize: Number.parseFloat(themeValues.mono.body.s['font-size']),
            fontWeight: themeValues.mono.body.s['font-weight'],
            fontFamily: themeValues.mono.body.s['font-family'],
          }
        : DEFAULT_THEME_OPTIONS.mono.s),
      ...options,
    }),
    [options, themeValues?.mono, jsonSchemaOptions],
  );

  return (
    <div className={className} {...extractSupportProps(props)} ref={setWrapperElement}>
      <Editor
        {...props}
        {...jsonSchemaProps}
        theme={theme ?? (dark ? 'snackDark' : 'snack')}
        className={cn({ [styles.editor]: hasBackground })}
        loading={loading ?? <Spinner />}
        options={mergedOptions}
        onMount={onEditorMount}
        language={language}
      />
    </div>
  );
}
