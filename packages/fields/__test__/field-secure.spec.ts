import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { getButtonHideValue, getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';

test.describe('Field Secure', () => {
  const TEST_ID = 'field-secure-test';
  const COMPONENT_PREFIX = 'field-secure';
  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-secure',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: true,
    hasPlaceholder: true,
    hasPrefixIcon: true,
    hasPrefix: false,
    hasPostfix: false,
    hasClearButton: false,
    hasCopyButton: true,
    hasValidationStates: true,
  });

  // hide button
  test('Should toggle value visibility by clicking the button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 'Test value' }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const hideButton = getButtonHideValue(wrapper);

    await expect(input).toHaveAttribute('type', 'password');

    await hideButton.click();

    await expect(input).toHaveAttribute('type', 'text');

    await hideButton.click();

    await expect(input).toHaveAttribute('type', 'password');
  });

  // hide with keyboard
  test('Should toggle value visibility with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 'Test value' }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await expect(input).toHaveAttribute('type', 'password');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(input).toHaveAttribute('type', 'text');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(input).toHaveAttribute('type', 'password');

    // not working in FF
    const browserName = page.context().browser()?.browserType().name();
    if (browserName === 'chromium') {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press(' ');
      await expect(input).toHaveAttribute('type', 'text');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press(' ');
      await expect(input).toHaveAttribute('type', 'password');
    }
  });
});
