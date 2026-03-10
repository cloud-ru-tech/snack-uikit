import { KeyboardEvent } from 'react';

import { FooterFocusController } from './FooterFocusController';
import { FooterForwardFocusResult } from './types';

export abstract class FooterKeyboardNavigationStrategy {
  constructor(
    protected readonly focusController: FooterFocusController,
    protected readonly isApplyButtonDisabled: boolean,
  ) {}

  abstract focusFooterForward(): FooterForwardFocusResult;

  abstract focusFooterOnEnter(): void;

  abstract handleApplyKeyDown(event: KeyboardEvent): void;

  protected isTabKey(event: KeyboardEvent) {
    return event.key === 'Tab';
  }

  protected focusApplyOrLeave(): FooterForwardFocusResult {
    if (this.isApplyButtonDisabled) {
      if (this.focusController.canLeaveForward()) {
        this.focusController.leaveForward();
        return 'handled';
      }

      return 'native-tab';
    }

    this.focusController.focusApplyButton();
    return 'handled';
  }

  protected handleShiftTabToLastTimeColumn(event: KeyboardEvent) {
    event.preventDefault();
    this.focusController.focusLastTimeColumn();
  }
}
