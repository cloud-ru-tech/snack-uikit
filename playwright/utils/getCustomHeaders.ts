import { exec } from 'shelljs';

import { logDebug, logError } from '../../scripts/utils/console';
import { CURRENT_BRANCH_NAME, DEPLOY_NAMESPACE, IS_TESTED_ON_BRANCH } from '../constants/common';

function getBranchName(): string {
  let branchName = CURRENT_BRANCH_NAME || '';

  if (IS_TESTED_ON_BRANCH === 'true') {
    const currentBranch = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.replace('\n', '');

    if (currentBranch) {
      const isBranchExistsInRemote =
        exec(`git ls-remote origin ${currentBranch}`, { silent: true }).stdout.length !== 0;

      if (!isBranchExistsInRemote) {
        logError(`Branch ${currentBranch} does not exist in remote`);
        process.exit(1);
      }

      const mainBranch = exec('git rev-parse --abbrev-ref origin/HEAD', { silent: true }).stdout.replace(
        /(origin\/)|\n/g,
        '',
      );

      if (mainBranch === currentBranch) {
        logDebug(`You are on ${mainBranch}. No headers will be applied`);
      } else {
        branchName = currentBranch;
      }
    }
  }

  return branchName;
}

/**
 * Получает кастомные HTTP заголовки для запросов.
 * Добавляет заголовок с именем ветки для тестирования на разных ветках
 */
export function getCustomHeaders(): Record<string, string> {
  const branchName = getBranchName();
  const headers: Record<string, string> = {};

  if (branchName) {
    headers[DEPLOY_NAMESPACE] = branchName;
  }

  return headers;
}
