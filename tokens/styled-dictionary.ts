import { promises as fs } from 'fs';

import StyleDictionaryPackage, { Dictionary, File, Options } from 'style-dictionary';

StyleDictionaryPackage.registerTransform({
  type: 'value',
  transitive: true,
  name: 'figma/web/flatten-properties',
  matcher: ({ type }) => ['typography', 'composition'].includes(type),
  transformer: ({ value, name, type }) => {
    if (!value) return;

    const entries = Object.entries(value);

    const flattendedValue = entries.reduce(
      (acc, [key, v], index) =>
        `${acc ? `${acc}\n  ` : ''}--${name}-${StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          { path: [key] },
          { prefix: '' },
        )}: ${v}${index + 1 === entries.length ? '' : ';'}`,
      `${name.includes(type) ? '' : `${type}-`}${name}-group;`,
    );

    return flattendedValue;
  },
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'scss-custom',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css',
    // 'figma/web/flatten-properties',
  ],
});

type FormatterProps = {
  dictionary: Dictionary;
  options: Options;
  file: File;
};

const PLATFORM = 'web';
const BASE = 'base';
const VARIABLES = 'variables';

function getThemeStylesConfig(theme: string, shouldAddAttribute = true) {
  return {
    source: [`tokens/build/themes/tokens-${theme === VARIABLES ? 'green' : theme}.json`],
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
      'scss/variables-custom': function ({ dictionary, options }: FormatterProps) {
        const { outputReferences } = options;
        const tokens = dictionary.allTokens.map(token => `--${token.name}: $${token.name};`).join('\n  ');

        return (
          StyleDictionaryPackage.formatHelpers.formattedVariables({
            format: 'sass',
            dictionary,
            outputReferences,
          }) +
          `

body${shouldAddAttribute ? `[data-theme='${theme}']` : ''} {
  ${tokens}
}
`
        );
      },
      'scss/variables-custom2': function ({ dictionary }: FormatterProps) {
        return dictionary.allTokens.map(token => `$${token.name}: --${token.name};`).join('\n');
      },
      'scss/base': function ({ dictionary }: FormatterProps) {
        const tokenVars = dictionary.allTokens.map(token => `$${token.name}: --${token.name};`).join('\n');
        const tokenValues = dictionary.allTokens.map(token => `$${token.name}: ${token.value},`).join('\n  ');

        return `${tokenVars}

@mixin spread-map($map: ()) {
  @each $key, $value in $map {
    #{$key}: $value;
  }
}

$theme-map-${theme}: (
  ${tokenValues}
);

body {
  @include spread-map($theme-map-${theme});
}
`;
      },
      'scss/theme': function ({ dictionary }: FormatterProps) {
        const tokenValues = dictionary.allTokens.map(token => `$${token.name}: ${token.value},`).join('\n  ');

        return `@import './styles-base';
@import './styles-variables';

$theme-map-${theme}: (
  ${tokenValues}
);

body[data-theme='${theme}'] {
  @include spread-map($theme-map-${theme});
}
`;
      },
    },
    platforms: {
      [PLATFORM]: {
        transformGroup: 'scss-custom',
        buildPath: `tokens/build/themes/`,
        files: [
          {
            destination: `styles-${theme}.scss`,
            format:
              {
                [VARIABLES]: 'scss/variables-custom2',
                [BASE]: 'scss/base',
              }[theme] ?? 'scss/theme',
          },
        ],
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
      'scss/variables-custom': function ({ dictionary, options }: FormatterProps) {
        const { outputReferences } = options;
        const filteredTokens = dictionary.allTokens.filter(token => token.filePath === componentPath);
        const tokens = filteredTokens.map(token => `--${token.name}: $${token.name};`).join('\n  ');

        return (
          StyleDictionaryPackage.formatHelpers.formattedVariables({
            format: 'sass',
            dictionary: { ...dictionary, allTokens: filteredTokens },
            outputReferences,
          }) +
          `

body {
  ${tokens}
}
`
        );
      },
      'scss/variables-custom2': function ({ dictionary, options }: FormatterProps) {
        const { outputReferences } = options;
        const filteredTokens = dictionary.allTokens.filter(token => token.filePath === componentPath);

        return (
          `@import '../themes/styles-base';
@import '../themes/styles-variables';

` +
          StyleDictionaryPackage.formatHelpers.formattedVariables({
            format: 'sass',
            dictionary: { ...dictionary, allTokens: filteredTokens },
            outputReferences,
          })
        );
      },
    },
    platforms: {
      [PLATFORM]: {
        transformGroup: 'scss-custom',
        buildPath: `tokens/build/components/`,
        files: [
          {
            destination: `styles-${componentName}.scss`,
            format: 'scss/variables-custom2',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
}

[BASE, VARIABLES, 'purple', 'green', 'greenDark', 'purpleDark'].map(theme => {
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
