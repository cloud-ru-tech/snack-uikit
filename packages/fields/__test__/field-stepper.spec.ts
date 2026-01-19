import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';

test.describe('Field Stepper', () => {
  const TEST_ID = 'field-stepper-test';
  const COMPONENT_PREFIX = 'field-stepper';
  const MINUS_BUTTON_TEST_ID = 'field-stepper__minus-button';
  const PLUS_BUTTON_TEST_ID = 'field-stepper__plus-button';
  const LIMIT_TOOLTIP_TEST_ID = 'field-stepper__limit-tooltip';

  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-stepper',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: false,
    hasPlaceholder: false,
    hasPrefixIcon: false,
    hasPrefix: true,
    hasPostfix: true,
    hasClearButton: false,
    hasCopyButton: false,
    hasValidationStates: true,
    emptyValue: '0',
  });

  test('Should not accept letters', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 6 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.focus();
    await input.selectText();
    await page.keyboard.press('a');

    await expect(input).toHaveValue('0');
  });

  test('Should increase/decrease by buttons', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 4, step: 2, min: 0, max: 6 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const minusButton = getByTestId(MINUS_BUTTON_TEST_ID);
    const plusButton = getByTestId(PLUS_BUTTON_TEST_ID);

    await minusButton.click();
    await expect(input).toHaveValue('2');
    await plusButton.click();
    await expect(input).toHaveValue('4');

    // min
    await minusButton.click();
    await minusButton.click();
    await minusButton.click({ force: true });
    await expect(input).toHaveValue('0');

    // max
    await plusButton.click();
    await plusButton.click();
    await plusButton.click();
    await plusButton.click({ force: true });
    await expect(input).toHaveValue('6');
  });

  test('Should handle float precision correctly (0.1 + 0.2 = 0.3)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 0.2, step: 0.1 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const plusButton = getByTestId(PLUS_BUTTON_TEST_ID);

    // 0.2 + 0.1 = 0.3 (common JS precision issue check, should not be 0.30000000000000004)
    await plusButton.click();
    await expect(input).toHaveValue('0.3');
  });

  test('Should not click buttons in disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 6, disabled: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const minusButton = getByTestId(MINUS_BUTTON_TEST_ID);
    const plusButton = getByTestId(PLUS_BUTTON_TEST_ID);

    await minusButton.click({ force: true });
    await expect(input).toHaveValue('6');
    await plusButton.click({ force: true });
    await expect(input).toHaveValue('6');
  });

  test('Should not click buttons in readonly state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: 6, readonly: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const minusButton = getByTestId(MINUS_BUTTON_TEST_ID);
    const plusButton = getByTestId(PLUS_BUTTON_TEST_ID);

    await minusButton.click({ force: true });
    await expect(input).toHaveValue('6');
    await plusButton.click({ force: true });
    await expect(input).toHaveValue('6');
  });

  test('Can enter value out of limits', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 8, min: 5, max: 15, allowMoreThanLimits: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.click();
    await input.type('0');
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(input).toHaveValue('80');

    await input.focus();
    await input.selectText();
    await input.pressSequentially('1');
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(input).toHaveValue('1');
  });

  test('Should not enter value out of limits if not allowed', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 8, min: 5, max: 15, allowMoreThanLimits: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.click();
    await input.pressSequentially('0');
    await page.locator('body').click({ position: { x: 0, y: 0 } });

    await expect(input).toHaveValue('15');
    await expect(getByTestId(LIMIT_TOOLTIP_TEST_ID)).toHaveText('Value should be less or equal 15');

    await input.focus();
    await input.selectText();
    await input.pressSequentially('1');
    await page.locator('body').click({ position: { x: 0, y: 0 } });

    await expect(input).toHaveValue('5');
    await expect(getByTestId(LIMIT_TOOLTIP_TEST_ID)).toHaveText('Value should be greater or equal 5');
  });
});
