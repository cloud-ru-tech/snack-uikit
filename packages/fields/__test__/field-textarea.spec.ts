import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';

test.describe('Field TextArea', () => {
  const TEST_ID = 'field-textarea-test';
  const COMPONENT_PREFIX = 'field-textarea';

  const getScrollArea = (wrapper: Locator) => wrapper.locator('[data-test-id="field-textarea__scroll-area"]');

  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-text-area',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: true,
    hasPlaceholder: true,
    hasPrefixIcon: false,
    hasPrefix: false,
    hasPostfix: false,
    hasClearButton: true,
    hasValidationStates: true,
    hasCopyButton: true,
  });

  // maxRows
  test("Shouldn't get bigger than maxRows param", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: '', maxRows: 4 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.pressSequentially('1\n2\n3\n4');

    const height1 = await getScrollArea(wrapper).evaluate(el => (el as HTMLElement).offsetHeight);
    const inputHeight1 = await input.evaluate(el => (el as HTMLElement).offsetHeight);
    await expect(inputHeight1).toBeLessThanOrEqual(height1);

    await input.pressSequentially('\n5');

    const height2 = await getScrollArea(wrapper).evaluate(el => (el as HTMLElement).offsetHeight);
    const inputHeight2 = await input.evaluate(el => (el as HTMLElement).offsetHeight);
    await expect(inputHeight2).toBeGreaterThanOrEqual(height2);
  });
});
