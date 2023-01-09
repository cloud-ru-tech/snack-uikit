const glob = require('glob');
const path = require('path');

const { readFileSync } = require('fs');

const getPackagesStatistics = () => {
  try {
    const packages = glob.sync(`packages/*/package.json`);

    const withVersion = packages.map(pkg => {
      const version = JSON.parse(readFileSync(path.resolve(__dirname, `../../${pkg}`), { encoding: 'utf-8' })).version;
      return { name: pkg.split('/')[1], version: version };
    });

    const pattern = /0\..+\..+/;
    const stable = [];
    const nonStable = [];

    withVersion.forEach(pkg => (pattern.test(pkg.version) ? nonStable.push(pkg) : stable.push(pkg)));

    const publicCount = packages.filter(pkg => pkg.indexOf('private') === -1).length;
    const privateCount = packages.length - publicCount;

    return {
      all: packages.length,
      stable: stable.length,
      nonStable: nonStable.length,
      public: publicCount,
      private: privateCount,
    };
  } catch (e) {
    console.log('Не удалось получить данные по статистике');
  }
};

module.exports = {
  getPackagesStatistics,
};
