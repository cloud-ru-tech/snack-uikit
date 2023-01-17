import { promises as fs } from 'fs';

import StyleDictionaryPackage from 'style-dictionary';

import { Themes } from '../../packages/theme/src/types/theme';
import { BASE, PLATFORM, VARIABLES } from './constants';
import { SCSSBaseFormat, SCSSComponentFormat, SCSSThemeFormat, SCSSThemeVariablesFormat } from './fileFormats';
import {
  TypographyComponentsTransform,
  TypographyThemeTransform,
  TypographyThemeVariablesTransform,
} from './tokenTransforms';
import { getComponentStylesConfig, getThemeStylesConfig } from './utils';

StyleDictionaryPackage.registerTransform(TypographyThemeTransform);
StyleDictionaryPackage.registerTransform(TypographyThemeVariablesTransform);
StyleDictionaryPackage.registerTransform(TypographyComponentsTransform);

StyleDictionaryPackage.registerFormat(SCSSBaseFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSComponentFormat);

[BASE, VARIABLES, ...Object.values(Themes)].map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getThemeStylesConfig(theme));
  StyleDictionary.buildPlatform(PLATFORM);
});

(async () => {
  const componentFiles = await fs.readdir('tokens/build/components');
  const jsons = componentFiles.filter(file => file.endsWith('.json'));

  for (const componentFile of jsons) {
    const StyleDictionary = StyleDictionaryPackage.extend(getComponentStylesConfig(componentFile));
    StyleDictionary.buildPlatform(PLATFORM);
  }
})();
