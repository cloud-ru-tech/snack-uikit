import { promises as fs } from 'fs';

import StyleDictionaryPackage, { TransformedToken } from 'style-dictionary';

const PLATFORM = 'web';
const BASE = 'base';
const VARIABLES = 'variables';
const TYPOGRAPHY = 'typography';

// transforms

StyleDictionaryPackage.registerTransform({
  type: 'value',
  transitive: true,
  name: `${TYPOGRAPHY}/theme`,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name }) => {
    if (!value) return;

    const entries = Object.entries(value);

    const flattendedValue = entries.map(function ([key, v]) {
      return `$${name}-${StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { path: [key] },
        { prefix: '' },
      )}: ${v},`;
    }, '\n');

    return `// ${name}
  ${flattendedValue.join('\n  ')}`;
  },
});

StyleDictionaryPackage.registerTransform({
  type: 'value',
  transitive: true,
  name: `${TYPOGRAPHY}/variables-custom`,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name }) => {
    if (!value) return;

    const entries = Object.entries(value);

    const flattendedValue = entries.map(function ([key]) {
      const varName = `${name}-${StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { path: [key] },
        { prefix: '' },
      )}`;

      return `$${varName}: --${varName};`;
    }, '\n');

    return `// ${name}
${flattendedValue.join('\n')}`;
  },
});

StyleDictionaryPackage.registerTransform({
  type: 'value',
  transitive: true,
  name: `${TYPOGRAPHY}/components`,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name, isSource }) => {
    if (!value) return;

    if (isSource) {
      return value;
    }

    const entries = Object.entries(value);
    const newEntries = entries.map(([key]) => [
      key,
      `$${name}-${StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { path: [key] },
        { prefix: '' },
      )}`,
    ]);

    return Object.fromEntries(newEntries);
  },
});

const defaultSCSSTransforms = [
  'attribute/cti',
  'name/cti/kebab',
  'time/seconds',
  'content/icon',
  'size/rem',
  'color/css',
];

// formats

StyleDictionaryPackage.registerFormat({
  name: 'scss/variables-custom',
  formatter: ({ dictionary }) =>
    dictionary.allTokens
      .map(token => (token.type === TYPOGRAPHY ? token.value : `$${token.name}: --${token.name};`))
      .join('\n'),
});

StyleDictionaryPackage.registerFormat({
  name: 'scss/base',
  formatter: ({ dictionary }) => {
    const tokenVars = dictionary.allTokens.map(token => `$${token.name}: --${token.name};`).join('\n');
    const tokenValues = dictionary.allTokens.map(token => `$${token.name}: ${token.value},`).join('\n  ');

    return `${tokenVars}

@mixin spread-map($map: ()) {
  @each $key, $value in $map {
    #{$key}: $value;
  }
}

$tokens-base: (
  ${tokenValues}
);

body {
  @include spread-map($tokens-base);
}
`;
  },
});

StyleDictionaryPackage.registerFormat({
  name: 'scss/theme',
  formatter: ({ dictionary, options }) => {
    const { theme } = options;
    const tokenValues = dictionary.allTokens
      .map(token => (token.type === TYPOGRAPHY ? token.value : `$${token.name}: ${token.value},`))
      .join('\n  ');

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
});

StyleDictionaryPackage.registerFormat({
  name: 'scss/component',
  formatter: function ({ dictionary, options }) {
    const { outputReferences } = options;
    const filteredTokens = dictionary.allTokens.filter(token => token.isSource);
    const typographyTokens: TransformedToken[] = [];
    const otherTokens: TransformedToken[] = [];

    filteredTokens.forEach(token => (token.type === TYPOGRAPHY ? typographyTokens : otherTokens).push(token));

    return `@import '../themes/styles-base';
@import '../themes/styles-variables';
${typographyTokens
  .map(token => {
    const formatKey = (key: string) =>
      StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { path: [key] },
        { prefix: '' },
      );

    return `
${Object.entries(token.value)
  .map(([key, value]) => `$${token.name}-${formatKey(key)}: ${value};`)
  .join('\n')}

@mixin ${token.name} {
  ${Object.entries(token.value)
    .map(([key]) => `${formatKey(key)}: var($${token.name}-${formatKey(key)});`)
    .join('\n  ')}
}`;
  })
  .join('\n')}

${StyleDictionaryPackage.formatHelpers.formattedVariables({
  format: 'sass',
  dictionary: { ...dictionary, allTokens: otherTokens },
  outputReferences,
})}`;
  },
});

function getThemeStylesConfig(theme: string) {
  return {
    source: [`tokens/build/themes/tokens-${theme === VARIABLES ? 'green' : theme}.json`],
    platforms: {
      [PLATFORM]: {
        transforms: [
          ...defaultSCSSTransforms,
          {
            [VARIABLES]: `${TYPOGRAPHY}/variables-custom`,
            [BASE]: '',
          }[theme] ?? `${TYPOGRAPHY}/theme`,
        ].filter(item => item),
        buildPath: `tokens/build/themes/`,
        files: [
          {
            destination: `styles-${theme}.scss`,
            format:
              {
                [VARIABLES]: 'scss/variables-custom',
                [BASE]: 'scss/base',
              }[theme] ?? 'scss/theme',
            options: {
              theme,
            },
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
    platforms: {
      [PLATFORM]: {
        transforms: [...defaultSCSSTransforms, `${TYPOGRAPHY}/components`],
        buildPath: `tokens/build/components/`,
        files: [
          {
            destination: `styles-${componentName}.scss`,
            format: 'scss/component',
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
