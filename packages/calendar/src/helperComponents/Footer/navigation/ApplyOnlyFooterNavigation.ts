import { KeyboardEvent } from 'react';

import { FooterKeyboardNavigationStrategy } from './FooterKeyboardNavigationStrategy';
import { FooterForwardFocusResult } from './types';

export class ApplyOnlyFooterNavigation extends FooterKeyboardNavigationStrategy {
  focusFooterForward(): FooterForwardFocusResult {
    return this.focusApplyOrLeave();
  }

  focusFooterOnEnter() {
    this.focusFooterForward();
  }

  handleApplyKeyDown(event: KeyboardEvent) {
    if (!this.isTabKey(event)) {
      return;
    }

    if (event.shiftKey) {
      this.handleShiftTabToLastTimeColumn(event);
      return;
    }

    this.focusController.leaveForward();
  }
}
