import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';
import {
  getButtonClearValue,
  getButtonCopyValue,
  getContainerPrivate,
  getCopyValueTooltip,
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
  getLabelTooltipTrigger,
  getPrefixIcon,
  getRequiredSign,
} from './commonSelectors';

type VisitCallback = (props: Record<string, unknown>) => string;

type Options = {
  componentPrefix: string;
  hasCounter: boolean;
  hasPlaceholder: boolean;
  hasPrefixIcon: boolean;
  hasClearButton: boolean;
  defaultValue?: string;
  expectedValue?: string;
};

export const runCommonTests = (visit: VisitCallback, testId: string, options: Options) => {
  const getInputInner = (wrapper: Selector) => getInput(wrapper, options.componentPrefix);
  const value = options.defaultValue || 'Test value';
  const expectedValue = options.expectedValue || options.defaultValue || 'Test value';

  // disabled = true
  test.page(visit({ value: '', disabled: true }))('Should not allow to input data if disabled', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = getInputInner(wrapper);

    await t.typeText(input, '123');

    await t.expect(input.value).eql('');
    await t.expect(input.hasAttribute('disabled')).ok("attribute 'disabled' not present");
  });

  // readonly = true
  test.page(visit({ value: '', readonly: true }))('Should not allow to input data if readonly' + '', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = getInputInner(wrapper);

    await t.typeText(input, '123');
    await t.expect(input.value).eql('');
    await t.expect(input.hasAttribute('readonly')).ok("attribute 'readonly' not present");
  });

  // no label, label hint, hint, hintIcon, required sign, maxLength, placeholder, prefix icon
  test.page(
    visit({
      label: undefined,
      labelTooltip: undefined,
      required: false,
      hint: undefined,
      showHintIcon: false,
      maxLength: undefined,
      placeholder: undefined,
      prefixIcon: undefined,
    }),
  )('Renders without label, hint, counter, prefixIcon and placeholder in case they are not specified', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));

    await t
      .expect(getLabel(wrapper).exists)
      .notOk("label is present although shouldn't")
      .expect(getLabelTooltip().exists)
      .notOk("label hint is present although shouldn't")
      .expect(getRequiredSign(wrapper).exists)
      .notOk("required sign is present although shouldn't")
      .expect(getHint(wrapper).exists)
      .notOk("hint is present although shouldn't")
      .expect(getHintDefaultIcon(wrapper).exists)
      .notOk("hintIcon is present although shouldn't")
      .expect(getCounter(wrapper).exists)
      .notOk("length counter is present although shouldn't");

    if (options.hasPlaceholder) {
      const input = getInputInner(wrapper);
      await t.expect(input.hasAttribute('placeholder')).notOk("placeholder is present although shouldn't");
    }

    if (options.hasPrefixIcon) {
      await t.expect(getPrefixIcon(wrapper).exists).notOk("prefix icon is present although shouldn't");
    }
  });

  // label, hint, hintIcon, required sign, placeholder, prefixIcon
  test.page(
    visit({
      label: 'Field Label',
      hint: 'Some instructions here',
      showHintIcon: true,
      required: true,
      placeholder: 'Enter something here',
      prefixIcon: 'PlaceholderSVG',
    }),
  )('Renders with label, hint, prefixIcon and placeholder in case they are specified', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));

    await t
      .expect(getLabel(wrapper).textContent)
      .eql('Field Label')
      .expect(getHint(wrapper).textContent)
      .eql('Some instructions here')
      .expect(getHintDefaultIcon(wrapper).exists)
      .ok('hint icons is not present')
      .expect(getRequiredSign(wrapper).textContent)
      .eql('*');

    if (options.hasPrefixIcon) {
      await t.expect(getPrefixIcon(wrapper).exists).ok('prefix icon is not present');
    } else {
      await t.expect(getPrefixIcon(wrapper).exists).notOk("prefix icon is present although shouldn't");
    }

    if (options.hasPlaceholder) {
      await t.expect(getInputInner(wrapper).getAttribute('placeholder')).eql('Enter something here');
    }
  });

  // hint but no hintIcon
  test.page(visit({ hint: 'Some instructions here', validationState: 'error', showHintIcon: false }))(
    'Renders with hint but without hintIcon if icon is disabled',
    async t => {
      const wrapper = Selector(dataTestIdSelector(testId));

      await t.expect(getHint(wrapper).textContent).eql('Some instructions here');
      await t.expect(getHintErrorIcon(wrapper).exists).notOk("hint error icon is present altought shouldn't");
    },
  );

  // label hint
  test.page(visit({ labelTooltip: 'label hint test' }))(
    'Renders tooltip when the label question mark icon is hovered with a mouse',
    async t => {
      const wrapper = Selector(dataTestIdSelector(testId));
      const labelTooltip = getLabelTooltip();
      const hintTrigger = getLabelTooltipTrigger(wrapper);

      await t.expect(labelTooltip.exists).notOk("label hint is present although shouldn't");

      await t
        .hover(hintTrigger)
        .expect(labelTooltip.exists)
        .ok('label hint is not present')
        .expect(labelTooltip.textContent)
        .eql('label hint test');
    },
  );

  // maxLength
  if (options.hasCounter) {
    test.page(visit({ value: '', maxLength: 2, allowMoreThanMaxLength: false }))(
      'Should limit amount of text characters in case a limit is set and should demonstrate a relevant indicator',
      async t => {
        const wrapper = Selector(dataTestIdSelector(testId));
        const counter = getCounter(wrapper);
        const input = getInputInner(wrapper);
        const sampleText = '42';
        const longText = '420';

        await t.expect(counter.textContent).eql('0/2');

        await t.typeText(input, sampleText).expect(input.value).eql(sampleText);
        await t.expect(counter.textContent).eql('2/2');

        await t.selectText(input).pressKey('delete').expect(input.value).eql('');
        await t.expect(counter.textContent).eql('0/2');

        await t.typeText(input, longText).expect(input.value).eql(sampleText);
        await t.expect(counter.textContent).eql('2/2');
      },
    );

    test.page(visit({ value: '', maxLength: 2, allowMoreThanMaxLength: true }))(
      'Should not limit amount of text characters if allowed',
      async t => {
        const wrapper = Selector(dataTestIdSelector(testId));
        const counter = getCounter(wrapper);
        const counterCurrentValue = getCounterCurrentValue(wrapper);
        const counterLimitValue = getCounterLimitValue(wrapper);
        const input = getInputInner(wrapper);
        const longText = '420';
        const hasLimitExceededAttr = (item: Selector) => item.hasAttribute('data-limit-exceeded');

        await t.expect(counter.textContent).eql('0/2');
        await t.expect(hasLimitExceededAttr(counterCurrentValue)).notOk("data attribute is present although shouldn't");
        await t.expect(hasLimitExceededAttr(counterLimitValue)).notOk("data attribute is present although shouldn't");

        await t.typeText(input, longText).expect(input.value).eql(longText);

        await t.expect(counter.textContent).eql('3/2');
        await t.expect(hasLimitExceededAttr(counterCurrentValue)).ok('data attribute is not present');
        await t.expect(hasLimitExceededAttr(counterLimitValue)).ok('data attribute is not present');
      },
    );
  }

  // showCopyButton = false
  test.page(visit({ value, readonly: true, showCopyButton: false }))(
    "Shouldn't have copy button when showCopyButton = false",
    async t => {
      const wrapper = Selector(dataTestIdSelector(testId));

      await t.expect(getButtonCopyValue(wrapper).exists).notOk("copy button is present although shouldn't");
    },
  );

  // copy button
  test.page(visit({ value, readonly: true, showCopyButton: true }))(
    'Should copy value by clicking the button',
    async t => {
      await t.setNativeDialogHandler(() => true);
      const wrapper = Selector(dataTestIdSelector(testId));
      const input = getInputInner(wrapper);

      await t.expect(input.value).eql(expectedValue);
      await t.expect(input.hasAttribute('readonly')).ok('attribute readonly is not present');
      await t.expect(getCopyValueTooltip().exists).notOk("tooltip is present although shouldn't");

      await t.click(getButtonCopyValue(wrapper));

      await t.expect(getCopyValueTooltip().exists).ok('tooltip is not present');
    },
  );

  // copy with keyboard
  test.page(visit({ value, readonly: true, showCopyButton: true }))('Should copy value with keyboard', async t => {
    const tooltip = getCopyValueTooltip();

    await t.setNativeDialogHandler(() => true);

    await t.expect(tooltip.exists).notOk("tooltip is present although shouldn't before enter");
    await t.pressKey('tab').pressKey('tab').pressKey('enter');
    await t.expect(tooltip.exists).ok('tooltip is not present after enter');

    // not working in FF
    // await t.wait(2000).expect(tooltip.exists).notOk("tooltip is present although shouldn't before space");
    // await t.pressKey('space');
    // await t.expect(tooltip.exists).ok('tooltip is not present after space');
  });

  // clear button
  if (options.hasClearButton) {
    // mouse
    test.page(visit({ value }))('Should clear value by clicking the button', async t => {
      const wrapper = Selector(dataTestIdSelector(testId));
      const input = getInputInner(wrapper);
      const clearButton = getButtonClearValue(wrapper);

      await t.expect(input.value).eql(expectedValue);

      await t.click(clearButton);

      await t.expect(input.value).eql('');
    });

    // keyboard = space
    test.page(visit({ value }))('Should clear value with space', async t => {
      // not working in FF
      if (t.browser.name === 'Chrome') {
        const wrapper = Selector(dataTestIdSelector(testId));
        const input = getInputInner(wrapper);

        await t.expect(input.value).eql(expectedValue);
        await t.pressKey('tab').pressKey('tab').pressKey('space');
        await t.expect(input.value).eql('');
      }
    });

    // keyboard = enter
    test.page(visit({ value }))('Should clear value with enter', async t => {
      // not working in FF for textarea
      if (t.browser.name === 'Chrome') {
        const wrapper = Selector(dataTestIdSelector(testId));
        const input = getInputInner(wrapper);

        await t.expect(input.value).eql(expectedValue);
        await t.pressKey('tab').pressKey('tab').pressKey('enter');
        await t.expect(input.value).eql('');
      }
    });
  } else {
    // no clear button
    test.page(visit({ value: value }))("Shouldn't have clear button", async t => {
      const wrapper = Selector(dataTestIdSelector(testId));
      const clearButton = getButtonClearValue(wrapper);

      await t.expect(clearButton.exists).notOk('clear button is present');
    });
  }

  // validation state
  [
    { validationState: 'default' },
    { validationState: 'error' },
    { validationState: 'warning' },
    { validationState: 'success' },
    { validationState: 'error', readonly: true, expectedValidationState: 'default' },
    { validationState: 'error', disabled: true, expectedValidationState: 'default' },
  ].forEach(({ validationState, disabled, readonly, expectedValidationState = validationState }) => {
    test.page(visit({ hint: 'Hint', validationState, disabled, readonly, showHintIcon: true, maxLength: 20 }))(
      `Renders correctly in validationState="${validationState}"${readonly ? ', readonly="true"' : ''}${
        disabled ? ', disabled="true"' : ''
      }`,
      async t => {
        const wrapper = Selector(dataTestIdSelector(testId));
        const getValidation = (item: Selector) => item.getAttribute('data-validation');

        await t.expect(getValidation(getContainerPrivate(wrapper))).eql(expectedValidationState);
        await t.expect(getValidation(getHint(wrapper))).eql(expectedValidationState);

        if (options.hasCounter && !readonly && !disabled) {
          await t.expect(getValidation(getCounterCurrentValue(wrapper))).eql(expectedValidationState);
          await t.expect(getValidation(getCounterLimitValue(wrapper))).eql(expectedValidationState);
        } else {
          await t.expect(getCounterCurrentValue(wrapper).exists).notOk('counter current value is present');
          await t.expect(getCounterLimitValue(wrapper).exists).notOk('counter limit value is present');
        }

        switch (expectedValidationState) {
          case 'error':
            await t.expect(getHintErrorIcon(wrapper).exists).ok('hint error icon is not present');
            break;
          case 'warning':
            await t.expect(getHintWarningIcon(wrapper).exists).ok('hint warning icon is not present');
            break;
          case 'success':
            await t.expect(getHintSuccessIcon(wrapper).exists).ok('hint success icon is not present');
            break;
          case 'default':
          default:
            await t.expect(getHintDefaultIcon(wrapper).exists).ok('hint default icon is not present');
            break;
        }
      },
    );
  });
};
