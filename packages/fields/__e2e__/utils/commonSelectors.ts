import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';

export function getContainerPrivate(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-container-private'));
}

export function getInput(wrapper: Selector, componentPrefix: string) {
  return wrapper.find(dataTestIdSelector(`${componentPrefix}__input`));
}

export function getLabel(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__label'));
}

export function getLabelTooltip() {
  return Selector(dataTestIdSelector('field-decorator__label-tooltip'));
}

export function getLabelTooltipTrigger(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__label-tooltip-trigger'));
}

export function getRequiredSign(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__required-sign'));
}

export function getHint(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__hint'));
}

export function getHintDefaultIcon(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('icon-info-filled-xs'));
}

export function getHintErrorIcon(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('icon-cross-filled-xs'));
}

export function getHintWarningIcon(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('icon-alarm-filled-xs'));
}

export function getHintSuccessIcon(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('icon-check-filled-xs'));
}

export function getCounter(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__counter'));
}

export function getCounterCurrentValue(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__counter-current-value'));
}

export function getCounterLimitValue(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-decorator__counter-limit-value'));
}

export function getPrefixIcon(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-container-private__prefix-icon'));
}

export function getPrefix(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-prefix'));
}

export function getPostfix(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('field-postfix'));
}

export function getButtonClearValue(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('button-clear-value'));
}

export function getButtonCopyValue(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('button-copy-value'));
}

export function getButtonHideValue(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('button-hide-value'));
}

export function getButtonField(wrapper: Selector) {
  return wrapper.find(dataTestIdSelector('button-field'));
}

export function getButtonFieldList() {
  return Selector(dataTestIdSelector('button-field-list'));
}
