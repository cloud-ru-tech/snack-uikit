import { getPatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';

const { RUN_ALL_TESTS } = process.env;

report({
  name: 'packages',
  include: getPatterns(RUN_ALL_TESTS === 'true'),
  reporter: ['lcov', 'text-summary', 'cobertura'],
});
