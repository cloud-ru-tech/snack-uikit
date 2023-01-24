export const PLATFORM = 'web';
export const BASE = 'base';
export const BASE_VARIABLES = 'base-variables';
export const THEME_VARIABLES = 'theme-variables';
export const TYPOGRAPHY = 'typography';
export const COMPOSITION = 'composition';
export const BASE_INDENT = '  ';

export enum FormatName {
  SCSSBase = 'scss/base',
  SCSSBaseVariables = 'scss/base-variables',
  SCSSTheme = 'scss/theme',
  SCSSThemeVariables = 'scss/theme-variables',
  SCSSComponent = 'scss/component',
}

export enum TransformName {
  TypographyTheme = 'typography/theme',
  TypographyThemeVariables = 'typography/theme-variables',
  TypographyComponents = 'typography/components',
}

export enum FilterName {
  SourceTokens = 'source-tokens',
}
