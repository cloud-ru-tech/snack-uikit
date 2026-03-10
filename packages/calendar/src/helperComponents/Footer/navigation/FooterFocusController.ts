import { RefObject } from 'react';

import { getDefaultItemId, ListProps } from '@snack-uikit/list';

import { DateAndTime, FocusDirection } from '../../../types';

export type FooterFocusControllerDeps = {
  showSeconds: boolean;
  dateAndTime?: DateAndTime;
  applyButtonRef: RefObject<HTMLButtonElement>;
  currentButtonRef: RefObject<HTMLButtonElement>;
  minutesKeyboardNavigationRef: NonNullable<ListProps['keyboardNavigationRef']>;
  secondsKeyboardNavigationRef: NonNullable<ListProps['keyboardNavigationRef']>;
  onFocusLeave?(direction: FocusDirection): void;
};

export class FooterFocusController {
  constructor(private readonly deps: FooterFocusControllerDeps) {}

  focusLastTimeColumn() {
    const ref = this.deps.showSeconds ? this.deps.secondsKeyboardNavigationRef : this.deps.minutesKeyboardNavigationRef;
    const value = this.deps.showSeconds ? this.deps.dateAndTime?.seconds : this.deps.dateAndTime?.minutes;

    ref.current?.focusItem(getDefaultItemId(value ?? 0));
  }

  focusApplyButton() {
    this.deps.applyButtonRef.current?.focus();
  }

  focusCurrentButton() {
    this.deps.currentButtonRef.current?.focus();
  }

  canLeaveForward() {
    return Boolean(this.deps.onFocusLeave);
  }

  leaveForward() {
    this.deps.onFocusLeave?.('next');
  }
}
