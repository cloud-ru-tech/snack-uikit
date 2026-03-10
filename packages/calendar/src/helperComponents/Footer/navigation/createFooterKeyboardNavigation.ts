import { TimePickerFooterMode } from '../../../types';
import { ApplyOnlyFooterNavigation } from './ApplyOnlyFooterNavigation';
import { CurrentTimeAndApplyFooterNavigation } from './CurrentTimeAndApplyFooterNavigation';
import { FooterFocusController } from './FooterFocusController';
import { FooterKeyboardNavigationStrategy } from './FooterKeyboardNavigationStrategy';

export function createFooterKeyboardNavigation(
  footerMode: TimePickerFooterMode,
  focusController: FooterFocusController,
  isApplyButtonDisabled: boolean,
): FooterKeyboardNavigationStrategy {
  switch (footerMode) {
    case 'apply-only':
      return new ApplyOnlyFooterNavigation(focusController, isApplyButtonDisabled);
    case 'current-time-and-apply':
    default:
      return new CurrentTimeAndApplyFooterNavigation(focusController, isApplyButtonDisabled);
  }
}
