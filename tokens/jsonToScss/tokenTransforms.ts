import { Named, Transform } from 'style-dictionary';

import { TransformName, TYPOGRAPHY } from './constants';
import { toKebabCase } from './utils';

export const TypographyThemeTransform: Named<Transform> = {
  type: 'value',
  transitive: true,
  name: TransformName.TypographyTheme,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name }) => {
    if (!value) return;

    const flattendedValue = Object.entries(value).map(([key, v]) => `$${name}-${toKebabCase(key)}: ${v},`, '\n');

    return `// ${name}
  ${flattendedValue.join('\n  ')}`;
  },
};

export const TypographyThemeVariablesTransform: Named<Transform> = {
  type: 'value',
  transitive: true,
  name: TransformName.TypographyThemeVariables,
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
};

export const TypographyComponentsTransform: Named<Transform> = {
  type: 'value',
  transitive: true,
  name: TransformName.TypographyComponents,
  matcher: ({ type }) => [TYPOGRAPHY].includes(type),
  transformer: ({ value, name, isSource }) => {
    if (!value) return;

    if (isSource) {
      return value;
    }

    const newEntries = Object.entries(value).map(([key]) => [key, `$${name}-${toKebabCase(key)}`]);

    return Object.fromEntries(newEntries);
  },
};
