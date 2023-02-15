const { defaultLintStagedConfig } = require('@sbercloud/ft-all-linters-pack');

module.exports = {
  ...defaultLintStagedConfig,
  '*.scss': ['stylelint --fix'],
};
