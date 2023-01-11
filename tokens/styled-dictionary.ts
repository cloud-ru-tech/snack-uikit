import { promises as fs } from 'fs';

import StyleDictionaryPackage from 'style-dictionary';

type Token = Record<string, any>;

type FormatterProps = {
  dictionary: {
    allTokens: Token[];
    usesReference(value: any): boolean;
    getReferences(value: any): { name: string; value: any }[];
  };
};

const PLATFORM = 'web';
const BASE = 'base';

//
// function getStyleDictionaryConfig(theme: string) {
//   return {
//     source: [`tokens/build/tokens-${theme}.json`],
//     format: {
//       linaria: ({ dictionary }: { dictionary: { allTokens: Record<string, any>[] } }) => {
//         // const getTokenName = (name: string) =>
//         //   name
//         //     .split('-')
//         //     .map(part => part[0].toUpperCase() + part.substring(1))
//         //     .join('');
//         //
//         // const colors = dictionary.allTokens
//         //   .map(token => `${getTokenName(token.name)}: '--${token.name}',`)
//         //   .join('\n  ');
//         //
//         // const tokens = dictionary.allTokens
//         //   .map(token => `\${COLORS.${getTokenName(token.name)}}: ${String(token.value).toLowerCase()};`)
//         //   .join('\n      ');
//
//         const tokens = dictionary.allTokens
//           .map(token => `--${token.name}: ${String(token.value).toLowerCase()};`)
//           .join('\n      ');
//
//         return `import { css } from '@linaria/core';
//
// export const TOKENS_${theme.toUpperCase()} = css\`
//   :global() {
//     body[data-theme="${theme}"] {
//       ${tokens}
//     }
//   }
// \`;
// `;
//       },
//     },
//     platforms: {
//       [PLATFORM]: {
//         transformGroup: 'css',
//         buildPath: 'tokens/build/',
//         files: [
//           {
//             destination: `styled-${theme}.ts`,
//             format: 'linaria',
//             options: {
//               outputReferences: true,
//             },
//           },
//         ],
//       },
//     },
//   };
// }
// console.log('Build started...');
//
// ['green', 'greenDark', 'purple', 'purpleDark'].map(theme => {
//   console.log('\n==============================================');
//   console.log(`\nProcessing: [${theme}]`);
//
//   const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));
//
//   StyleDictionary.buildPlatform(PLATFORM);
//
//   console.log('\nEnd processing');
// });
//
// console.log('\n==============================================');
// console.log('\nBuild completed!');

function getThemeStylesConfig(theme: string, shouldAddAttribute = true) {
  return {
    source: [`tokens/build/themes/tokens-${theme}.json`],
    format: {
      linaria: ({ dictionary }: FormatterProps) => {
        const tokens = dictionary.allTokens.map(token => `--${token.name}: ${token.value};`).join('\n      ');

        return `import { css } from '@linaria/core';

export const THEME_${theme.toUpperCase()} = css\`
  :global() {
    body${shouldAddAttribute ? `[data-theme='${theme}']` : ''} {
      ${tokens}
    }
  }
\`;
`;
      },
    },
    platforms: {
      [PLATFORM]: {
        transformGroup: 'css',
        buildPath: `tokens/build/themes/`,
        files: [{ destination: `styled-${theme}.ts`, format: 'linaria' }],
      },
    },
  };
}

function getComponentStylesConfig(componentFile: string) {
  const componentName = componentFile.split('.')[0];
  const componentPath = `tokens/build/components/${componentFile}`;

  return {
    source: [componentPath],
    include: ['tokens/build/themes/tokens-base.json', 'tokens/build/themes/tokens-green.json'],
    format: {
      linaria: ({ dictionary }: FormatterProps) => {
        const tokens = dictionary.allTokens
          .filter(token => token.filePath === componentPath)
          .map(token => {
            let value = String(token.value);

            if (dictionary.usesReference(token.original.value)) {
              const refs = dictionary.getReferences(token.original.value);
              refs.forEach(ref => {
                value = value.replace(ref.value, function () {
                  return `var(--${ref.name})`;
                });
              });
            }
            return `--${token.name}: ${value};`;
          })
          .join('\n      ');

        return `import { css } from '@linaria/core';

export const ${componentName.replaceAll('-', '_').toUpperCase()} = css\`
  :global() {
    body {
      ${tokens}
    }
  }
\`;
`;
      },
    },
    platforms: {
      [PLATFORM]: {
        transformGroup: 'css',
        buildPath: `tokens/build/components/`,
        files: [
          {
            destination: `styled-${componentName}.ts`,
            format: 'linaria',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
}

[BASE, 'purple', 'green', 'greenDark', 'purpleDark'].map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getThemeStylesConfig(theme, theme !== BASE));
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
