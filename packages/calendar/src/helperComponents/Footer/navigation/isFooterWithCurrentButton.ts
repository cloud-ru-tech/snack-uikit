import { CurrentTimeAndApplyFooterNavigation } from './CurrentTimeAndApplyFooterNavigation';
import { FooterKeyboardNavigationStrategy } from './FooterKeyboardNavigationStrategy';

export function isFooterWithCurrentButton(
  navigation: FooterKeyboardNavigationStrategy,
): navigation is CurrentTimeAndApplyFooterNavigation {
  return navigation instanceof CurrentTimeAndApplyFooterNavigation;
}
