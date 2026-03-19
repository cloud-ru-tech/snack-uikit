module.exports = {
  extends: ['@cloud-ru/ft-config-stylelint', 'stylelint-config-clean-order'],
  rules: {
    'no-descending-specificity': true,
    'at-rule-empty-line-before': ['always', { except: ['first-nested', 'blockless-after-same-name-blockless'] }],
  },
  ignoreFiles: [
    '**/storybook/customBrands/**/*',
    '**/storybook/stories/**/*',
  ],
  overrides: [
    {
      files: ['**/storybook/**/*.scss', '**/stories/**/*.scss', '**/*.stories.scss'],
      rules: {
        'turbopack/no-pure-global-selector': null,
      },
    },
  ],
};
