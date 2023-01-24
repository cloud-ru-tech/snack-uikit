import StyleDictionaryPackage from 'style-dictionary';

import { BASE, BASE_VARIABLES, FormatName, PLATFORM, THEME_VARIABLES, TransformName } from '../constants';

export function getThemeStylesConfig(theme: string) {
  return {
    source: [
      `tokens/build/themes/tokens-${
        {
          [THEME_VARIABLES]: 'green',
          [BASE_VARIABLES]: 'base',
        }[theme] ?? theme
      }.json`,
    ],
    platforms: {
      [PLATFORM]: {
        transforms: [
          ...StyleDictionaryPackage.transformGroup.scss,
          {
            [THEME_VARIABLES]: TransformName.TypographyThemeVariables,
            [BASE]: '',
            [BASE_VARIABLES]: '',
          }[theme] ?? TransformName.TypographyTheme,
        ].filter(item => item),
        buildPath: `tokens/build/themes/`,
        files: [
          {
            destination: `styles-${theme}.scss`,
            format:
              {
                [THEME_VARIABLES]: FormatName.SCSSThemeVariables,
                [BASE]: FormatName.SCSSBase,
                [BASE_VARIABLES]: FormatName.SCSSBaseVariables,
              }[theme] ?? FormatName.SCSSTheme,
            options: {
              theme,
            },
          },
        ],
      },
    },
  };
}
