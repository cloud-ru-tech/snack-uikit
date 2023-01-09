require('ts-node').register({
  project: require('path').join(__dirname, './tsconfig.json'),
});
module.exports = require('./testcafe/config').Config;
