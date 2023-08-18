const glob = require('glob');
const path = require('path');
const { readFileSync } = require('fs');
const globalPackageJson = require('../../package.json');

// remove unnecessary links between layers
function fixGraphHierachy(graphLinks) {
  const links = { ...graphLinks };

  for (const linkName in links) {
    const children = links[linkName] || [];

    const queue = [...children];

    const usedNodes = new Set();

    while (queue.length) {
      const item = queue.pop();

      if (!Array.isArray(links[item])) {
        continue;
      }

      links[item].forEach(el => {
        usedNodes.add(el);
      });

      queue.push(...links[item]);
    }

    links[linkName] = links[linkName].filter(el => !usedNodes.has(el));
  }
  return links;
}

const getDependenciesLinks = () => {
  let links = {};
  let reversedLinks = {};

  try {
    const packagesPaths = glob.sync(`packages/*/package.json`);
    const repositoryName = globalPackageJson.name;

    packagesPaths.map(pkgPath => {
      const pkgName = pkgPath.split(path.sep)[1];

      const dependencies =
        JSON.parse(readFileSync(path.resolve(__dirname, `../../${pkgPath}`), { encoding: 'utf-8' })).dependencies || {};

      const dependenciesNames = Object.keys(dependencies);

      const uikitComponents = dependenciesNames.filter(dep => dep.includes(repositoryName));

      uikitComponents.forEach(component => {
        const name = component.split('/')[1];

        links[pkgName] = links[pkgName] || [];
        links[pkgName].push(name);

        reversedLinks[name] = reversedLinks[name] || [];
        reversedLinks[name].push(pkgName);
      });
    });

    links = fixGraphHierachy(links);
    reversedLinks = fixGraphHierachy(reversedLinks);

    return { links, reversedLinks };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Не удалось получить данные по статистике', e);
  }
};
module.exports = {
  getDependenciesLinks,
};
