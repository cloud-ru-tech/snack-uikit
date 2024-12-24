import monorepoEslintConfig from '@cloud-ru/eslint-config/monorepo';
import ssrSafe from '@cloud-ru/eslint-plugin-ssr-safe-react';

export default [
  ...monorepoEslintConfig,
  ssrSafe.recommended,
  {
    plugins: {
      '@cloud-ru/ssr-safe-react': ssrSafe,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      'prettier/prettier': 'off',
    },
  },
  {
    ignores: ['**/dist/**/*', 'packages/icons/src/**/*', 'packages/icons/templates/**/*'],
  },
  {
    files: ['packages/**/__e2e__/**/*.ts'],
    rules: {
      'testcafe-community/missing-expect': 'off',
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/**/scripts/**/*.ts'],
    rules: {
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/**/__tests__/**/*.ts'],
    rules: {
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/*/stories/**/*', 'storybook/stories/**/*'],
    rules: {
      'react/function-component-definition': 'off',
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: [
      'storybook/stories/**/*',
      'storybook/preview.tsx',
      'scripts/scss-extension-transformer.ts',
      'storybook/main.js',
      'eslint.config.mjs',
      'vitest.config.ts'
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
