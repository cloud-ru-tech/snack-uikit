import type { Locator } from '@playwright/test';

export function getContainerPrivate(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-container-private"]');
}

export function getInput(wrapper: Locator, componentPrefix: string) {
  return wrapper.locator(`[data-test-id="${componentPrefix}__input"]`);
}

export function getLabel(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__label"]');
}

export function getLabelTooltip(getByTestId: (testId: string) => Locator) {
  return getByTestId('field-decorator__label-tooltip');
}

export function getLabelTooltipTrigger(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__label-tooltip-trigger"]');
}

export function getRequiredSign(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__required-sign"]');
}

export function getHint(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__hint"]');
}

export function getHintDefaultIcon(wrapper: Locator) {
  return wrapper.locator('[data-test-id="icon-info-filled-xs"]');
}

export function getHintErrorIcon(wrapper: Locator) {
  return wrapper.locator('[data-test-id="icon-cross-filled-xs"]');
}

export function getHintWarningIcon(wrapper: Locator) {
  return wrapper.locator('[data-test-id="icon-alarm-filled-xs"]');
}

export function getHintSuccessIcon(wrapper: Locator) {
  return wrapper.locator('[data-test-id="icon-check-filled-xs"]');
}

export function getCounter(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__counter"]');
}

export function getCounterCurrentValue(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__counter-current-value"]');
}

export function getCounterLimitValue(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-decorator__counter-limit-value"]');
}

export function getPrefixIcon(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-container-private__prefix-icon"]');
}

export function getPrefix(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-prefix"]');
}

export function getPostfix(wrapper: Locator) {
  return wrapper.locator('[data-test-id="field-postfix"]');
}

export function getButtonClearValue(wrapper: Locator) {
  return wrapper.locator('[data-test-id="button-clear-value"]');
}

export function getButtonCopyValue(wrapper: Locator) {
  return wrapper.locator('[data-test-id="button-copy-value"]');
}

export function getButtonHideValue(wrapper: Locator) {
  return wrapper.locator('[data-test-id="button-hide-value"]');
}

export function getButtonField(wrapper: Locator) {
  return wrapper.locator('[data-test-id="button-field"]');
}

export function getButtonFieldList(getByTestId: (testId: string) => Locator) {
  return getByTestId('button-field-list');
}
