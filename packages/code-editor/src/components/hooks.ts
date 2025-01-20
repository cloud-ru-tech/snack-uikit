import { EditorProps as MonacoEditorProps, useMonaco } from '@monaco-editor/react';
import { configureMonacoYaml, SchemasSettings } from 'monaco-yaml';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useThemeContext } from '@snack-uikit/utils';

import { THEME_VARS, YAML_CODE_EDITOR_OPTIONS } from './constants';
import { ConfigureJsonSchemaReturn, JsonSchema } from './types';
import { getJsonSchema } from './utils';

function getThemeVars(styles: CSSStyleDeclaration) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function mapComputedTree(tree: string | Record<string, any>): Record<string, any> | string {
    if (typeof tree === 'string') {
      return styles.getPropertyValue(tree);
    }

    const res = {} as Record<string, unknown>;

    Object.entries(tree).forEach(cur => {
      res[cur[0]] = mapComputedTree(cur[1]);
    });

    return res;
  };
}

type UseCalculatedThemeValuesProps = {
  stylesOriginNode: HTMLDivElement | null;
  themeName?: string;
};

export function useCalculatedThemeValues({ stylesOriginNode, themeName }: UseCalculatedThemeValuesProps) {
  const [values, setValues] = useState<typeof THEME_VARS | undefined>(undefined);

  const { themeClassName } = useThemeContext();

  const trigger = themeName ?? themeClassName;

  useEffect(() => {
    if (stylesOriginNode) {
      const styles = getComputedStyle(stylesOriginNode);
      setValues(getThemeVars(styles)(THEME_VARS) as typeof THEME_VARS);
    }
  }, [stylesOriginNode, trigger]);

  return values;
}

export function useApplyJsonSchema(language?: string, jsonSchema?: JsonSchema) {
  const monaco = useMonaco();

  const [jsonSchemaOptions, setJsonSchemaOptions] = useState<MonacoEditorProps['options']>({});
  const modelPath = jsonSchema?.fileMatch;

  const preparedJsonSchema: SchemasSettings | undefined = useMemo(() => getJsonSchema(jsonSchema), [jsonSchema]);

  const configureYamlLanguage = useCallback((): ConfigureJsonSchemaReturn => {
    if (!monaco || !preparedJsonSchema) {
      return;
    }

    const model = configureMonacoYaml(monaco, {
      enableSchemaRequest: true,
      schemas: [preparedJsonSchema],
    });

    return {
      options: YAML_CODE_EDITOR_OPTIONS,
      dispose: model.dispose,
    };
  }, [monaco, preparedJsonSchema]);

  const configureJsonLanguage = useCallback((): ConfigureJsonSchemaReturn => {
    if (!monaco || !preparedJsonSchema) {
      return;
    }

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [preparedJsonSchema],
    });
  }, [monaco, preparedJsonSchema]);

  const configureJsonSchema = useCallback(() => {
    switch (language) {
      case 'yaml':
        return configureYamlLanguage();
      case 'json':
        return configureJsonLanguage();
      default:
        break;
    }
  }, [language, configureYamlLanguage, configureJsonLanguage]);

  useEffect(() => {
    const jsonSchemaSettings = configureJsonSchema();
    setJsonSchemaOptions(jsonSchemaSettings?.options ?? {});

    return () => {
      setJsonSchemaOptions({});
      jsonSchemaSettings?.dispose?.();
    };
  }, [configureJsonSchema]);

  return useMemo(
    () => ({
      jsonSchemaProps: { path: modelPath } satisfies MonacoEditorProps,
      jsonSchemaOptions,
    }),
    [jsonSchemaOptions, modelPath],
  );
}
