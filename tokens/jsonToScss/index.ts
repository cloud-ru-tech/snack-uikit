import { promises as fs } from 'fs';

import StyleDictionaryPackage from 'style-dictionary';

import { Themes } from '../../packages/theme/src/types/theme';
import { BASE, BASE_VARIABLES, PLATFORM, THEME_VARIABLES } from './constants';
import {
  SCSSBaseFormat,
  SCSSBaseVariablesFormat,
  SCSSComponentFormat,
  SCSSThemeFormat,
  SCSSThemeVariablesFormat,
} from './fileFormats';
import { SourceTokensFilter } from './tokenFilters';
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
StyleDictionaryPackage.registerFormat(SCSSBaseVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSComponentFormat);

StyleDictionaryPackage.registerFilter(SourceTokensFilter);

[BASE, BASE_VARIABLES, THEME_VARIABLES, ...Object.values(Themes)].map(theme => {
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
