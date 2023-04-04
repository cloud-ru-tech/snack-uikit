import { getPatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';
import { shouldRunAllTests } from './utils/shouldRunAllTests';

report({
  name: 'packages',
  include: getPatterns(shouldRunAllTests()),
  reporter: ['lcov', 'text-summary', 'cobertura'],
});
