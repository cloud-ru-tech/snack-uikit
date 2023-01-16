import { promises as fs } from 'fs';

import StyleDictionaryPackage, { TransformedToken } from 'style-dictionary';

const PLATFORM = 'web';
const BASE = 'base';
const VARIABLES = 'variables';
const TYPOGRAPHY = 'typography';
const COMPOSITION = 'composition';

const TEXT_ELEMENT_TYPES = ['display', 'body', 'label', 'headline', 'title', 'icon', 'text'];
const TEXT_VARIANT_TYPES = ['main', 'support', 'light'];
const IMPOSSIBLE_PROPS = ['paragraphSpacing'];

const figmaTokenToCssProp = ({ token, key }: { token: TransformedToken; key: string }) => {
  const possibleNames = ['', ...TEXT_VARIANT_TYPES].flatMap(variant =>
    TEXT_ELEMENT_TYPES.map(element => (variant ? element + '_' + variant : element)),
  );
  const fillProperty = possibleNames.includes(token.path[3]?.toLowerCase()) ? 'color' : 'background-color';

  return (
    {
      border: 'border-color',
      sizing: 'width',
      'item-spacing': 'gap',
      'text-case': 'text-transform',
      fill: fillProperty,
    }[key] ?? key
  );
};

const toKebabCase = (key: string) =>
  StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { path: [key] },
    { prefix: '' },
  );

// transforms

StyleDictionaryPackage.registerTransform({
  type: 'value',
  transitive: true,
  name: `${TYPOGRAPHY}/theme`,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name }) => {
    if (!value) return;

    const flattendedValue = Object.entries(value).map(([key, v]) => `$${name}-${toKebabCase(key)}: ${v},`, '\n');

    return `// ${name}
  ${flattendedValue.join('\n  ')}`;
  },
});

StyleDictionaryPackage.registerTransform({
  type: 'value',
  transitive: true,
  name: `${TYPOGRAPHY}/theme-variables`,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name }) => {
    if (!value) return;

    const flattendedValue = Object.entries(value).map(([key]) => {
      const varName = `${name}-${toKebabCase(key)}`;
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

    const newEntries = Object.entries(value).map(([key]) => [key, `$${name}-${toKebabCase(key)}`]);

    return Object.fromEntries(newEntries);
  },
});

// formats

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
  name: 'scss/theme-variables',
  formatter: ({ dictionary }) =>
    dictionary.allTokens
      .map(token => (token.type === TYPOGRAPHY ? token.value : `$${token.name}: --${token.name};`))
      .join('\n'),
});

StyleDictionaryPackage.registerFormat({
  name: 'scss/component',
  formatter: function ({ dictionary }) {
    const filteredTokens = dictionary.allTokens.filter(token => token.isSource);
    const compositeTokens: TransformedToken[] = [];
    const otherTokens: TransformedToken[] = [];

    filteredTokens.forEach(token =>
      ([TYPOGRAPHY, COMPOSITION].includes(token.type) ? compositeTokens : otherTokens).push(token),
    );

    return `@import '../themes/styles-base';
@import '../themes/styles-variables';
${compositeTokens
  .map(token => {
    const replaceRefs = (value: unknown, valueWithRefs: unknown) => {
      let replacedValue = String(value);

      if (dictionary.usesReference(valueWithRefs)) {
        const refs = dictionary.getReferences(valueWithRefs);

        refs.forEach(ref => {
          replacedValue = replacedValue.replace(ref.value, `$${ref.name}`);
        });
      }

      return replacedValue;
    };

    const printMixin = (name: string, value: Record<string, any>) => `@mixin ${name} {
  ${Object.entries(value)
    .filter(([key]) => !IMPOSSIBLE_PROPS.includes(key))
    .map(([key, value]) =>
      value && typeof value === 'object'
        ? `@include ${token.name}-${toKebabCase(key)};\n`
        : `${figmaTokenToCssProp({ token, key: toKebabCase(key) })}: var($${name}-${toKebabCase(key)});`,
    )
    .join('\n  ')}
}`;

    const printMixinWithVars = (name: string, value: Record<string, any>) => `
${Object.entries(value)
  .map(([key, value]) => `$${name}-${toKebabCase(key)}: ${value};`)
  .join('\n')}
${printMixin(name, value)}`;

    if (token.type === TYPOGRAPHY) {
      return printMixinWithVars(token.name, token.value);
    }

    const vars = Object.entries(token.value).map(([key, value]) =>
      value && typeof value === 'object'
        ? printMixinWithVars(`${token.name}-${toKebabCase(key)}`, value)
        : `$${token.name}-${toKebabCase(key)}: ${replaceRefs(value, token.original.value[key])};`,
    );

    return `
${vars.join('\n')}

${printMixin(token.name, token.value)}
`;
  })
  .join('')}

${StyleDictionaryPackage.formatHelpers.formattedVariables({
  format: 'sass',
  dictionary: { ...dictionary, allTokens: otherTokens },
  outputReferences: true,
})}`;
  },
});

function getThemeStylesConfig(theme: string) {
  return {
    source: [`tokens/build/themes/tokens-${theme === VARIABLES ? 'green' : theme}.json`],
    platforms: {
      [PLATFORM]: {
        transforms: [
          ...StyleDictionaryPackage.transformGroup.scss,
          {
            [VARIABLES]: `${TYPOGRAPHY}/theme-variables`,
            [BASE]: '',
          }[theme] ?? `${TYPOGRAPHY}/theme`,
        ].filter(item => item),
        buildPath: `tokens/build/themes/`,
        files: [
          {
            destination: `styles-${theme}.scss`,
            format:
              {
                [VARIABLES]: 'scss/theme-variables',
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
        transforms: [...StyleDictionaryPackage.transformGroup.scss, `${TYPOGRAPHY}/components`],
        buildPath: `tokens/build/components/`,
        files: [
          {
            destination: `styles-${componentName}.scss`,
            format: 'scss/component',
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
