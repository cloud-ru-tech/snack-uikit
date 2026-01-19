import type { Locator } from '@playwright/test';

import { expect, test } from '../../../../playwright/fixtures';
import {
  getButtonClearValue,
  getButtonCopyValue,
  getContainerPrivate,
  getCounter,
  getCounterCurrentValue,
  getCounterLimitValue,
  getHint,
  getHintDefaultIcon,
  getHintErrorIcon,
  getHintSuccessIcon,
  getHintWarningIcon,
  getInput,
  getLabel,
  getLabelTooltip,
  getPostfix,
  getPrefix,
  getPrefixIcon,
  getRequiredSign,
} from './commonSelectors';

type StoryCallback = (props: Record<string, unknown>) => {
  name: string;
  group?: string;
  props?: Record<string, unknown>;
};

type Options = {
  componentPrefix: string;
  hasCounter: boolean;
  hasPlaceholder: boolean;
  hasPrefixIcon: boolean;
  hasPrefix: boolean;
  hasPostfix: boolean;
  hasClearButton: boolean;
  hasCopyButton: boolean;
  hasValidationStates: boolean;
  defaultValue?: string;
  emptyValue?: string;
  expectedValue?: string;
  valuePropName?: string;
};

export const runCommonTests = (getStory: StoryCallback, testId: string, options: Options) => {
  const getInputInner = (wrapper: Locator) => getInput(wrapper, options.componentPrefix);
  const value = options.defaultValue || 'Test value';
  const expectedValue = options.expectedValue || options.defaultValue || 'Test value';
  const emptyValue = options.emptyValue || '';
  const valuePropName = options.valuePropName || 'value';

  // disabled = true
  test('Should not allow to input data if disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ [valuePropName]: emptyValue, disabled: true }));
    const wrapper = getByTestId(testId);
    const input = getInputInner(wrapper);

    await input.fill('123', { force: true });

    await expect(input).toHaveValue(emptyValue);
    await expect(input, "attribute 'disabled' not present").toHaveAttribute('disabled', '');
  });

  // readonly = true
  test('Should not allow to input data if readonly', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ [valuePropName]: emptyValue, readonly: true }));
    const wrapper = getByTestId(testId);
    const input = getInputInner(wrapper);

    await input.fill('123', { force: true });
    await expect(input).toHaveValue(emptyValue);
    await expect(input, "attribute 'readonly' not present").toHaveAttribute('readonly', '');
  });

  // no label, label hint, hint, hintIcon, required sign, maxLength, placeholder, prefix icon
  test('Renders without label, hint, counter, prefixIcon, prefix, postfix and placeholder in case they are not specified', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(
      getStory({
        label: undefined,
        labelTooltip: undefined,
        required: false,
        hint: undefined,
        showHintIcon: false,
        maxLength: undefined,
        placeholder: undefined,
        prefixIcon: undefined,
        postfix: undefined,
        prefix: undefined,
      }),
    );
    const wrapper = getByTestId(testId);

    await expect(getLabel(wrapper), "label is present although shouldn't").not.toBeVisible();
    await expect(getLabelTooltip(getByTestId), "label hint is present although shouldn't").not.toBeVisible();
    await expect(getRequiredSign(wrapper), "required sign is present although shouldn't").not.toBeVisible();
    await expect(getHint(wrapper), "hint is present although shouldn't").not.toBeVisible();
    await expect(getHintDefaultIcon(wrapper), "hintIcon is present although shouldn't").not.toBeVisible();
    await expect(getCounter(wrapper), "length counter is present although shouldn't").not.toBeVisible();

    if (options.hasPlaceholder) {
      const input = getInputInner(wrapper);
      const placeholder = await input.getAttribute('placeholder');
      await expect(placeholder, "placeholder is present although shouldn't").toBeNull();
    }

    if (options.hasPrefixIcon) {
      await expect(getPrefixIcon(wrapper), "prefix icon is present although shouldn't").not.toBeVisible();
    }

    if (options.hasPrefix) {
      await expect(getPrefix(wrapper), "prefix is present although shouldn't").not.toBeVisible();
    }

    if (options.hasPostfix) {
      await expect(getPostfix(wrapper), "postfix is present although shouldn't").not.toBeVisible();
    }
  });

  // label, hint, hintIcon, required sign, placeholder, prefixIcon
  test('Renders with label, hint, prefixIcon, prefix, postfix and placeholder in case they are specified', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(
      getStory({
        label: 'Field Label',
        hint: 'Some instructions here',
        showHintIcon: true,
        required: true,
        placeholder: 'Enter something here',
        prefixIcon: 'PlaceholderSVG',
        prefix: 'PRE',
        postfix: 'POST',
      }),
    );
    const wrapper = getByTestId(testId);

    await expect(getLabel(wrapper)).toHaveText('Field Label');
    await expect(getHint(wrapper)).toHaveText('Some instructions here');
    await expect(getHintDefaultIcon(wrapper), 'hint icons is not present').toBeVisible();
    await expect(getRequiredSign(wrapper)).toHaveText('*');

    // TODO: return condition
    if (options.hasPrefixIcon /* || options.hasPrefix*/) {
      await expect(getPrefixIcon(wrapper), 'prefix icon is not present').toBeVisible();

      // TODO: return test
      // if (options.hasPrefix) {
      //   await expect(await getPrefix(wrapper).textContent()).toEqual('PRE');
      // }
    }

    // TODO: return test
    // if (options.hasPostfix) {
    //   await expect(await getPostfix(wrapper).textContent()).toEqual('POST');
    // }

    if (options.hasPlaceholder) {
      await expect(getInputInner(wrapper)).toHaveAttribute('placeholder', 'Enter something here');
    }
  });

  // hint but no hintIcon
  test('Renders with hint but without hintIcon if icon is disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ hint: 'Some instructions here', validationState: 'error', showHintIcon: false }));
    const wrapper = getByTestId(testId);

    await expect(getHint(wrapper)).toHaveText('Some instructions here');
    await expect(getHintErrorIcon(wrapper), "hint error icon is present altought shouldn't").not.toBeVisible();
  });

  // maxLength
  if (options.hasCounter) {
    test('Should limit amount of text characters in case a limit is set and should demonstrate a relevant indicator', async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(getStory({ [valuePropName]: '', maxLength: 2, allowMoreThanMaxLength: false }));
      const wrapper = getByTestId(testId);
      const counter = getCounter(wrapper);
      const input = getInputInner(wrapper);
      const sampleText = '42';
      const longText = '420';

      await expect(counter).toHaveText('0/2');

      await input.fill(sampleText);
      await expect(input).toHaveValue(sampleText);
      await expect(counter).toHaveText('2/2');

      await input.selectText();
      await page.keyboard.press('Delete');
      await expect(input).toHaveValue('');
      await expect(counter).toHaveText('0/2');

      await input.fill(longText);
      await expect(input).toHaveValue(sampleText);
      await expect(counter).toHaveText('2/2');
    });

    test('Should not limit amount of text characters if allowed', async ({ gotoStory, getByTestId }) => {
      await gotoStory(getStory({ [valuePropName]: '', maxLength: 2, allowMoreThanMaxLength: true }));
      const wrapper = getByTestId(testId);
      const counter = getCounter(wrapper);
      const counterCurrentValue = getCounterCurrentValue(wrapper);
      const counterLimitValue = getCounterLimitValue(wrapper);
      const input = getInputInner(wrapper);
      const longText = '420';

      await expect(counter).toHaveText('0/2');
      await expect(counterCurrentValue, "data attribute 'data-limit-exceeded' not present").not.toHaveAttribute(
        'data-limit-exceeded',
      );
      await expect(counterLimitValue, "data attribute 'data-limit-exceeded' not present").not.toHaveAttribute(
        'data-limit-exceeded',
      );

      await input.fill(longText);
      await expect(input).toHaveValue(longText);

      await expect(counter).toHaveText('3/2');
      await expect(counterCurrentValue, "data attribute 'data-limit-exceeded' present").toHaveAttribute(
        'data-limit-exceeded',
      );
      await expect(counterLimitValue, "data attribute 'data-limit-exceeded' present").toHaveAttribute(
        'data-limit-exceeded',
      );
    });
  }

  // showCopyButton = false
  test("Shouldn't have copy button when showCopyButton = false", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ [valuePropName]: value, readonly: true, showCopyButton: false }));
    const wrapper = getByTestId(testId);

    await expect(getButtonCopyValue(wrapper), "copy button is present although shouldn't").not.toBeVisible();
  });

  if (options.hasCopyButton) {
    // copy button
    test('Should copy value by clicking the button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(getStory({ [valuePropName]: value, readonly: true, showCopyButton: true }));
      const wrapper = getByTestId(testId);
      const input = getInputInner(wrapper);

      await expect(input).toHaveValue(expectedValue);
      // await expect(await input.getAttribute('readonly')).not.toBeNull('attribute readonly is not present');

      // await getButtonCopyValue(wrapper).click();
    });

    // copy with keyboard
    test('Should copy value with keyboard', async ({ gotoStory, page }) => {
      await gotoStory(getStory({ [valuePropName]: value, readonly: true, showCopyButton: true }));

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
    });
  }

  // clear button
  if (options.hasClearButton) {
    test('Should render without clear button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(getStory({ showClearButton: false }));
      const wrapper = getByTestId(testId);
      const clearButton = getButtonClearValue(wrapper);

      await expect(clearButton, 'Clear button should not be rendered').not.toBeVisible();
    });

    // mouse
    test('Should clear value by clicking the button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(getStory({ [valuePropName]: value }));
      const wrapper = getByTestId(testId);
      const input = getInputInner(wrapper);
      const clearButton = getButtonClearValue(wrapper);

      await expect(input).toHaveValue(expectedValue);

      await clearButton.click();

      await expect(input).toHaveValue('');
    });

    // keyboard = space
    test('Should clear value with space', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(getStory({ [valuePropName]: value }));
      const wrapper = getByTestId(testId);
      const input = getInputInner(wrapper);

      await expect(input).toHaveValue(expectedValue);
      await input.focus();
      await input.selectText();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press(' ');
      await expect(input).toHaveValue('');
    });

    // keyboard = enter
    test('Should clear value with enter', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(getStory({ [valuePropName]: value }));
      const wrapper = getByTestId(testId);
      const input = getInputInner(wrapper);

      await expect(input).toHaveValue(expectedValue);
      await input.focus();
      await input.selectText();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await expect(input).toHaveValue('');
    });
  } else {
    // no clear button
    test("Shouldn't have clear button", async ({ gotoStory, getByTestId }) => {
      await gotoStory(getStory({ [valuePropName]: value }));
      const wrapper = getByTestId(testId);
      const clearButton = getButtonClearValue(wrapper);

      await expect(clearButton, 'clear button is present').not.toBeVisible();
    });
  }

  if (options.hasValidationStates) {
    // validation state
    [
      { validationState: 'default' },
      { validationState: 'error' },
      { validationState: 'warning' },
      { validationState: 'success' },
      { validationState: 'error', readonly: true, expectedValidationState: 'default' },
      { validationState: 'error', disabled: true, expectedValidationState: 'default' },
    ].forEach(({ validationState, disabled, readonly, expectedValidationState = validationState }) => {
      test(`Renders correctly in validationState="${validationState}"${readonly ? ', readonly="true"' : ''}${
        disabled ? ', disabled="true"' : ''
      }`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(
          getStory({ hint: 'Hint', validationState, disabled, readonly, showHintIcon: true, maxLength: 20 }),
        );
        const wrapper = getByTestId(testId);

        await expect(getContainerPrivate(wrapper), "data attribute 'data-validation' not present").toHaveAttribute(
          'data-validation',
          expectedValidationState,
        );
        await expect(getHint(wrapper), "data attribute 'data-validation' not present").toHaveAttribute(
          'data-validation',
          expectedValidationState,
        );

        if (options.hasCounter && !readonly && !disabled) {
          await expect(getCounterCurrentValue(wrapper), "data attribute 'data-validation' not present").toHaveAttribute(
            'data-validation',
            expectedValidationState,
          );
          await expect(getCounterLimitValue(wrapper), "data attribute 'data-validation' not present").toHaveAttribute(
            'data-validation',
            expectedValidationState,
          );
        } else {
          await expect(getCounterCurrentValue(wrapper), 'counter current value is present').not.toBeVisible();
          await expect(getCounterLimitValue(wrapper), 'counter limit value is present').not.toBeVisible();
        }

        switch (expectedValidationState) {
          case 'error':
            await expect(getHintErrorIcon(wrapper), 'hint error icon is not present').toBeVisible();
            break;
          case 'warning':
            await expect(getHintWarningIcon(wrapper), 'hint warning icon is not present').toBeVisible();
            break;
          case 'success':
            await expect(getHintSuccessIcon(wrapper), 'hint success icon is not present').toBeVisible();
            break;
          case 'default':
          default:
            await expect(getHintDefaultIcon(wrapper), 'hint default icon is not present').toBeVisible();
            break;
        }
      });
    });
  }
};
