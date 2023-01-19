import StyleDictionaryPackage from 'style-dictionary';

import { FilterName, FormatName, PLATFORM, TransformName } from '../constants';

export function getComponentStylesConfig(componentFile: string) {
  const componentName = componentFile.split('.')[0];
  const componentPath = `tokens/build/components/${componentFile}`;

  return {
    source: [componentPath],
    include: ['tokens/build/themes/tokens-base.json', 'tokens/build/themes/tokens-green.json'],
    platforms: {
      [PLATFORM]: {
        transforms: [...StyleDictionaryPackage.transformGroup.scss, TransformName.TypographyComponents],
        buildPath: `tokens/build/components/`,
        files: [
          {
            destination: `styles-${componentName}.scss`,
            format: FormatName.SCSSComponent,
            filter: FilterName.SourceTokens,
          },
        ],
      },
    },
  };
}
