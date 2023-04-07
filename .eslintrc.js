module.exports = {
  extends: ['@sbercloud/eslint-config/monorepo', 'plugin:testcafe-community/recommended'],
  plugins: ['testcafe-community'],
  rules: { '@typescript-eslint/no-namespace': 'off' },
  ignorePatterns: 'packages/icons/src',
  overrides: [
    {
      files: ['packages/**/__unit-tests__/**/*.ts'],
      rules: {
        'testcafe-community/missing-expect': 'off',
        'jest/consistent-test-it': ['error', { fn: 'it' }],
      },
    },
  ],
};
