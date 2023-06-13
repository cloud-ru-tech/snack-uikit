const { exec } = require('shelljs');
const { RequestHook } = require('testcafe');

const { logDebug, logError } = require('../../scripts/utils/console');
const { DEPLOY_NAMESPACE } = require('../constants');

const { BRANCH_NAME, TEST_ON_BRANCH } = process.env;

function getBranchName() {
  let branchName = BRANCH_NAME || '';

  if (TEST_ON_BRANCH === 'true') {
    const currentBranch = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.replace('\n', '');

    if (currentBranch) {
      const isBranchExistsInRemote =
        exec(`git ls-remote origin ${currentBranch}`, { silent: true }).stdout.length !== 0;

      if (!isBranchExistsInRemote) {
        logError(`Branch ${currentBranch} does not exist in remote`);
        process.exit(1);
      }

      const mainBranch = exec('git rev-parse --abbrev-ref origin/HEAD', { silent: true }).stdout.replace(
        /(origin\/)|\\n/,
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

const branchName = getBranchName();

class CustomHeader extends RequestHook {
  constructor() {
    super();
  }

  async onRequest(e) {
    if (branchName) {
      e.requestOptions.headers[DEPLOY_NAMESPACE] = branchName;
    }
  }

  async onResponse() {
    // This method must also be overridden,
    // but you can leave it blank.
  }
}

module.exports = {
  customHeader: new CustomHeader(),
};
