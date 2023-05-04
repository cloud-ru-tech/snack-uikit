module.exports = {
  extends: ['@sbercloud/eslint-config/monorepo', 'plugin:testcafe-community/recommended'],
  plugins: ['testcafe-community'],
  rules: { '@typescript-eslint/no-namespace': 'off' },
  ignorePatterns: 'packages/icons/src',
  overrides: [
    {
      files: ['packages/**/__e2e__/**/*.ts'],
      rules: {
        'testcafe-community/missing-expect': 'off',
      },
    },
    {
      files: ['packages/**/__tests__/**/*.ts'],
      rules: {
        'vitest/consistent-test-it': ['error', { fn: 'it' }],
      },
    },
  ],
};
