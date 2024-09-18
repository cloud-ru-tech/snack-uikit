module.exports = {
  extends: [
    '@cloud-ru/eslint-config/monorepo',
    'plugin:testcafe-community/recommended',
    'plugin:@cloud-ru/ssr-safe-react/recommended',
  ],
  plugins: ['testcafe-community'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'prettier/prettier': 'off',
  },
  ignorePatterns: 'packages/icons/src/components',
  overrides: [
    {
      files: ['packages/**/__e2e__/**/*.ts'],
      rules: {
        'testcafe-community/missing-expect': 'off',
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
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['scripts/check-dependencies.ts', 'scripts/test-coverage/packages.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
