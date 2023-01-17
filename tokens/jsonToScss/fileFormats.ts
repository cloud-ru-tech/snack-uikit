import StyleDictionaryPackage, { Format, Named, TransformedToken } from 'style-dictionary';

import { COMPOSITION, FormatName, TYPOGRAPHY } from './constants';
import { figmaTokenToCssProp, toKebabCase } from './utils';

const IMPOSSIBLE_PROPS = ['paragraphSpacing'];

export const SCSSBaseFormat: Named<Format> = {
  name: FormatName.SCSSBase,
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
};

export const SCSSThemeFormat: Named<Format> = {
  name: FormatName.SCSSTheme,
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
};

export const SCSSThemeVariablesFormat: Named<Format> = {
  name: FormatName.SCSSThemeVariables,
  formatter: ({ dictionary }) =>
    dictionary.allTokens
      .map(token => (token.type === TYPOGRAPHY ? token.value : `$${token.name}: --${token.name};`))
      .join('\n'),
};

export const SCSSComponentFormat: Named<Format> = {
  name: FormatName.SCSSComponent,
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
};
