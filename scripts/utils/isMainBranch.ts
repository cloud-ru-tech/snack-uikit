export function isMainBranch() {
  const { CI_COMMIT_REF_NAME, CI_DEFAULT_BRANCH } = process.env;

  const runAllTests = CI_COMMIT_REF_NAME === CI_DEFAULT_BRANCH;

  console.log('should run all tests = ' + runAllTests);

  return runAllTests;
}
