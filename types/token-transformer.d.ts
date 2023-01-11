declare module 'token-transformer' {
  type TransformerOptions = {
    expandTypography?: boolean;
    expandShadow?: boolean;
    expandComposition?: boolean;
    preserveRawValue?: boolean;
    throwErrorWhenNotResolved?: boolean;
    resolveReferences?: boolean;
  };

  function transformTokens(
    rawTokens: Record<string, any>,
    setsToUse?: string[],
    excludes?: string[],
    transformerOptions?: TransformerOptions,
  ): Record<string, any>;
}
