import { EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import { JSONSchema } from 'monaco-yaml';

export type EditorBaseProps = MonacoEditorProps;

export type SupportedSchemaLanguage = 'json' | 'yaml';

export type JsonSchema = {
  uri?: string;
  schema: JSONSchema;
  fileMatch: string;
};

export type WithJsonSchema = {
  /**
   * Схема для валидации
   */
  jsonSchema: JsonSchema;
  path?: never;
};

type WithoutJsonSchema = Pick<MonacoEditorProps, 'path'>;

export type EditorWithJsonSchemaProps = Omit<EditorBaseProps, 'language' | 'path'> & {
  language: SupportedSchemaLanguage;
} & (WithJsonSchema | WithoutJsonSchema);

export type ConfigureJsonSchemaReturn =
  | {
      options?: MonacoEditorProps['options'];
      dispose?: () => void;
    }
  | undefined;
