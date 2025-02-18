import { execSync } from 'child_process';
import { resolve } from 'path';

import { logInfo } from '../utils/console';
import { getAllPackageFolders } from '../utils/getAllPackageFolders';
import { getChangedUnstagedFiles, getStagedFiles } from '../utils/git';
import { docgen } from './';

type Packages = {
  [key: string]: {
    staged: string[];
    unstaged: string[];
  };
};

const getReadmePath = (packagePath: string) => resolve(packagePath, 'README.md');

(async function () {
  const stagedList = getStagedFiles();
  const unstagedList = getChangedUnstagedFiles();
  const packagesList = getAllPackageFolders();

  const packages: Packages = {};

  for (const packageName of packagesList) {
    const staged = stagedList.filter(file => file.includes(packageName));
    const unstaged = unstagedList.filter(file => file.includes(packageName));

    if (staged.length || unstaged.length) {
      packages[packageName] = { staged, unstaged };
    }
  }

  const needDocGeneration: string[] = [];
  const needDocStage: string[] = [];

  Object.entries(packages).forEach(([packageName, { staged, unstaged }]) => {
    // если есть хоть какое-то изменение, генерируем доку
    if (staged.length || unstaged.length) {
      needDocGeneration.push(packageName);
    }
    // если что-то коммитится, тоже коммитим
    if (staged.length) {
      needDocStage.push(getReadmePath(packageName));
    }
  });

  if (needDocGeneration.length) {
    await docgen(needDocGeneration);
  }

  if (needDocStage.length) {
    execSync(`git add ${needDocStage.join(' ')}`);
    logInfo('Files added to stage:');
    needDocStage.map(logInfo);
  }
})();
