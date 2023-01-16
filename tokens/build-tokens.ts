import { promises as fs } from 'fs';

import { TransformerOptions, transformTokens } from 'token-transformer';

import * as themeConfig from '../../figma-tokens/New_Tokens/$themes.json';

const transformerOptions: TransformerOptions = {
  // expandTypography: true,
  // expandComposition: true,
  expandShadow: true,
  throwErrorWhenNotResolved: true,
  resolveReferences: true,
  // preserveRawValue: true,
};

const themeMap = {
  Cloud_Light_Mode: 'green',
  Cloud_Dark_Mode: 'greenDark',
  Ml_Space_Light_Mode: 'purple',
  Ml_Space_Dark_Mode: 'purpleDark',
};

(async () => {
  const dirName = `tokens/build`;

  await fs.mkdir(dirName, { recursive: true });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (const { name, selectedTokenSets } of themeConfig.default) {
    const theme = themeMap[name];
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
      subDir?: string;
      options?: TransformerOptions;
    }) => {
      const setDir = `${dirName}${subDir ? '/' + subDir : ''}`;

      await fs.mkdir(setDir, { recursive: true });

      const resolvedTokens = transformTokens(
        rawTokens,
        paths,
        paths.filter(item => !setsToInclude.includes(item)),
        {
          ...transformerOptions,
          ...options,
        },
      );

      const fileName = `${setDir}/tokens-${setName}.json`;

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
    if (theme === themeMap['Cloud_Light_Mode']) {
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
