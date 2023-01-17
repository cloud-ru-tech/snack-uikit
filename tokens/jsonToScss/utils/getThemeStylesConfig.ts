import StyleDictionaryPackage from 'style-dictionary';

import { BASE, FormatName, PLATFORM, TransformName, VARIABLES } from '../constants';

export function getThemeStylesConfig(theme: string) {
  return {
    source: [`tokens/build/themes/tokens-${theme === VARIABLES ? 'green' : theme}.json`],
    platforms: {
      [PLATFORM]: {
        transforms: [
          ...StyleDictionaryPackage.transformGroup.scss,
          {
            [VARIABLES]: TransformName.TypographyThemeVariables,
            [BASE]: '',
          }[theme] ?? TransformName.TypographyTheme,
        ].filter(item => item),
        buildPath: `tokens/build/themes/`,
        files: [
          {
            destination: `styles-${theme}.scss`,
            format:
              {
                [VARIABLES]: FormatName.SCSSThemeVariables,
                [BASE]: FormatName.SCSSBase,
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
