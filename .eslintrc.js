const baseConfig = require('@sbercloud/ft-all-linters-pack').defaultEslintConfig;

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:cypress/recommended'],
};
