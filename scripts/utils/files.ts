import fs from 'fs';

import { logInfo } from './console';
import * as fileTemplates from './filesTemplate';

export const ExistingPackageNames = (() => fs.readdirSync('./packages/'))();

export const bootstrapFiles = ({
  packageRootFolderName,
  packageName,
  packageTitle,
  packageDescription,
  user,
  email,
  componentName,
}: {
  packageRootFolderName: string;
  packageName: string;
  packageTitle: string;
  packageDescription: string;
  user: string;
  email: string;
  componentName: string;
}) => {
  fileTemplates.createFolderStructure({ packageRootFolderName });
  logInfo('Created folder structure');

  fileTemplates.changelog({ packageRootFolderName });
  logInfo('Created changelog');

  fileTemplates.readme({
    packageRootFolderName,
    packageTitle,
    packageDescription,
    packageName,
  });
  logInfo('Created readme');

  fileTemplates.npmrc({ packageRootFolderName });
  logInfo('Created .npmrc');

  fileTemplates.packageJson({
    packageRootFolderName,
    user,
    email,
    packageTitle,
    packageName,
    packageDescription,
  });
  logInfo('Created package.json');

  fileTemplates.packageEntry({
    packageRootFolderName,
  });
  logInfo('Created package entry');

  fileTemplates.componentEntry({
    componentName,
    packageRootFolderName,
  });
  logInfo('Created component entry');

  fileTemplates.storyEntry({
    componentName,
    packageRootFolderName,
  });
  logInfo('Created story entry');
};
