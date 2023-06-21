import { coverage } from './coverage';

// should be a .js file
// or testcafe will fail with error
// "An error has occurred while reading the "/testcafe.config.js" configuration file."
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { customHeader } = require('./customHeader.js');

export const hooks = {
  request: [customHeader],
  testRun: {
    before: () => {
      coverage.testRun.before();
    },
    after: () => {
      coverage.testRun.after();
    },
  },
  test: {
    after: async () => {
      await coverage.test.after();
    },
  },
  reporter: {
    onBeforeWrite: {
      xunit: (writeInfo: { initiator: string; formattedText: string }) => {
        if (writeInfo.initiator === 'reportTaskDone') {
          writeInfo.formattedText = writeInfo.formattedText.replaceAll(process.cwd(), '');
        }
      },
    },
  },
};
