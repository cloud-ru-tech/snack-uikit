import { Format, Named, TransformedToken, TransformedTokens } from 'style-dictionary';

import { BASE_INDENT, COMPOSITION, FormatName, TYPOGRAPHY } from './constants';
import { figmaTokenToCssProps, toKebabCase } from './utils';

export const SCSSBaseFormat: Named<Format> = {
  name: FormatName.SCSSBase,
  formatter: ({ dictionary }) => {
    const tokenValues = dictionary.allTokens.map(token => `$${token.name}: ${token.value},`).join('\n  ');

    return `@import './styles-base-variables';

$tokens-base: (
  ${tokenValues}
);

body {
  @include spread-map($tokens-base);
}
`;
  },
};

export const SCSSBaseVariablesFormat: Named<Format> = {
  name: FormatName.SCSSBaseVariables,
  formatter: ({ dictionary }) => {
    const tokenVars = dictionary.allTokens.map(token => `$${token.name}: --${token.name};`).join('\n');

    return `${tokenVars}

@mixin spread-map($map: ()) {
  @each $key, $value in $map {
    #{$key}: $value;
  }
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

    return `@import './styles-base-variables';
@import './styles-theme-variables';

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
    const compositeTokens: TransformedToken[] = [];
    const otherTokens: TransformedToken[] = [];

    dictionary.allTokens.forEach(token =>
      ([TYPOGRAPHY, COMPOSITION].includes(token.type) ? compositeTokens : otherTokens).push(token),
    );

    const replaceRefs = ({ value, valueWithRefs }: { value: unknown; valueWithRefs: unknown }) => {
      let replacedValue = String(value);

      if (dictionary.usesReference(valueWithRefs)) {
        const refs = dictionary.getReferences(valueWithRefs);

        refs.forEach(ref => {
          replacedValue = replacedValue.replace(ref.value, `$${ref.name}`);
        });
      }

      return replacedValue;
    };

    const isToken = (token: TransformedTokens): token is TransformedToken => Boolean(token.name);

    const buildTokenMapValue = (token: TransformedTokens, depth = 0): string => {
      const indent = new Array(depth).fill(BASE_INDENT).join('');
      const indentPlus1 = indent + BASE_INDENT;

      const tokenToString = (token: Record<string, any>, formatter: (key: string, value: any) => string) =>
        Object.entries(token)
          .map(([key, value]) => formatter(key, value))
          .join(`,\n${indentPlus1}`);

      const wrapInBrackets = (str: string) => `(
${indentPlus1}${str}
${indent})`;

      const tokenDictionaryTemplate = (token: TransformedTokens) =>
        wrapInBrackets(
          tokenToString(
            token,
            (key, tokenInner) => `${toKebabCase(key)}: ${buildTokenMapValue(tokenInner, depth + 1)}`,
          ),
        );

      const simpleTokenTemplate = (token: TransformedToken) =>
        `${replaceRefs({ value: token.value, valueWithRefs: token.original.value })}`;

      const compositeTokenTemplate = (token: TransformedToken) => {
        const cssEntryToString = (key: string, value: string) =>
          figmaTokenToCssProps({ token, key: toKebabCase(key) })
            .map(prop => `"${prop}": ${value}`)
            .join(`,\n${indentPlus1}`);

        return wrapInBrackets(
          tokenToString(token.value, (key, value) =>
            value && typeof value === 'object'
              ? `${tokenToString(value, cssEntryToString)}`
              : cssEntryToString(key, replaceRefs({ value, valueWithRefs: token.original.value[key] })),
          ),
        );
      };

      if (!isToken(token)) {
        return tokenDictionaryTemplate(token);
      }

      if (![TYPOGRAPHY, COMPOSITION].includes(token.type)) {
        return simpleTokenTemplate(token);
      }

      return compositeTokenTemplate(token);
    };

    return `@use 'sass:map';

@import '../themes/styles-base-variables';
@import '../themes/styles-theme-variables';

@mixin theme-map($map: (), $keys...) {
  @each $key, $value in map-get($map, $keys...) {
    #{$key}: var($value);
  }
}

${Object.entries(dictionary.tokens)
  .map(([key, value]) => `$${toKebabCase(key)}: ${buildTokenMapValue(value)}`)
  .join(';\n\n')}    
`;
  },
};
