import { readFileSync } from 'fs';
import path from 'path';

import { globSync } from 'glob';

import globalPackageJson from '../../package.json';

export const getDependenciesLinks = () => {
  const links: Record<string, string[]> = {};
  const reversedLinks: Record<string, string[]> = {};

  try {
    const packagesPaths = globSync(`packages/*/package.json`);
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

    return { links, reversedLinks };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Не удалось получить данные по статистике', e);

    return { links, reversedLinks };
  }
};
