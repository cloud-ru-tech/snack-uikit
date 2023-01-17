import { promises as fs } from 'fs';

import { TransformerOptions, transformTokens } from 'token-transformer';

import themeConfig from '../../figma-tokens/New_Tokens/$themes.json';
import { Themes } from '../packages/theme/src/types/theme';

const TRANSFORMER_OPTIONS: TransformerOptions = {
  // expandTypography: true,
  // expandComposition: true,
  expandShadow: true,
  throwErrorWhenNotResolved: true,
  resolveReferences: true,
  // preserveRawValue: true,
};

const THEME_MAP = {
  Cloud_Light_Mode: Themes.Green,
  Cloud_Dark_Mode: Themes.GreenDark,
  Ml_Space_Light_Mode: Themes.Purple,
  Ml_Space_Dark_Mode: Themes.PurpleDark,
};

const BUILD_DIRECTORY = 'tokens/build';

(async () => {
  await fs.mkdir(BUILD_DIRECTORY, { recursive: true });

  for (const { name, selectedTokenSets } of themeConfig) {
    const theme = THEME_MAP[name];
    const paths = Object.keys(selectedTokenSets);
    const basePaths = paths.filter(tokens => tokens.startsWith('Base'));
    const themePaths = paths.filter(tokens => tokens.startsWith('Themes'));
    const componentsPaths = paths.filter(tokens => tokens.startsWith('Components'));

    const result = await Promise.all(
      paths.map(currentPath => fs.readFile(`../figma-tokens/New_Tokens/${currentPath}.json`, { encoding: 'utf8' })),
    );

    const rawTokens = result.reduce((result, currentFile, index) => {
      result[paths[index]] = JSON.parse(currentFile);

      return result;
    }, {});

    const generateTokens = async ({
      subDir,
      setName,
      setsToInclude,
      options,
    }: {
      setName: string;
      setsToInclude: string[];
      subDir: string;
      options?: TransformerOptions;
    }) => {
      const tokenSetDirectory = `${BUILD_DIRECTORY}/${subDir}`;

      await fs.mkdir(tokenSetDirectory, { recursive: true });

      const resolvedTokens = transformTokens(
        rawTokens,
        paths,
        paths.filter(item => !setsToInclude.includes(item)),
        {
          ...TRANSFORMER_OPTIONS,
          ...options,
        },
      );

      const fileName = `${tokenSetDirectory}/tokens-${setName}.json`;

      await fs.writeFile(fileName, JSON.stringify(resolvedTokens), 'utf8');

      // eslint-disable-next-line no-console
      console.log(`${fileName} - done`);
    };

    await generateTokens({
      subDir: 'themes',
      setName: `${theme}`,
      setsToInclude: themePaths,
    });

    // TODO: make correct condition for generation
    if (theme === Themes.Green) {
      await generateTokens({
        subDir: 'themes',
        setName: `base`,
        setsToInclude: basePaths,
      });

      for (const componentPath of componentsPaths) {
        await generateTokens({
          subDir: 'components',
          setName: componentPath.toLowerCase().replaceAll('/', '-'),
          setsToInclude: [componentPath],
          options: { resolveReferences: false },
        });
      }
    }
  }
})();
