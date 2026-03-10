import { KeyboardEvent } from 'react';

import { FooterKeyboardNavigationStrategy } from './FooterKeyboardNavigationStrategy';
import { FooterForwardFocusResult } from './types';

export class CurrentTimeAndApplyFooterNavigation extends FooterKeyboardNavigationStrategy {
  focusFooterForward(): FooterForwardFocusResult {
    this.focusController.focusCurrentButton();
    return 'handled';
  }

  focusFooterOnEnter() {
    this.focusController.focusApplyButton();
  }

  handleCurrentKeyDown(event: KeyboardEvent) {
    if (!this.isTabKey(event)) {
      return;
    }

    if (event.shiftKey) {
      this.handleShiftTabToLastTimeColumn(event);
      return;
    }

    if (this.isApplyButtonDisabled) {
      this.focusController.leaveForward();
    }
  }

  handleApplyKeyDown(event: KeyboardEvent) {
    if (!this.isTabKey(event)) {
      return;
    }

    if (event.shiftKey) {
      return;
    }

    this.focusController.leaveForward();
  }
}
