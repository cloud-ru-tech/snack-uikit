module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-recess-order'],
  plugins: ['stylelint-scss'],
  rules: {
    'color-no-hex': [
      true,
      {
        message: `Don't use hex colors like HEX or named color, you should use token instead`,
      },
    ],
    'color-named': [
      'never',
      {
        message: `Don't use hex colors like HEX or named color, you should use token instead`,
      },
    ],
    'declaration-no-important': true,
    'no-descending-specificity': true,
    'at-rule-empty-line-before': ['always', { except: ['first-nested', 'blockless-after-same-name-blockless'] }],
  },
};
