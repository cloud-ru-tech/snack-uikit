import { fixture } from 'testcafe';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('Field Text');

const TEST_ID = 'field-text-test';
const COMPONENT_PREFIX = 'field-text';

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-text',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

runCommonTests(props => visit(props), TEST_ID, {
  componentPrefix: COMPONENT_PREFIX,
  hasCounter: true,
  hasPlaceholder: true,
  hasPrefixIcon: true,
  hasClearButton: true,
  hasCopyButton: true,
  hasValidationStates: true,
});
