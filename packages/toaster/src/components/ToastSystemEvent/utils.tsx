import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';

import { ToastSystemEventAppearance } from './constants';

export function getIcon(appearance: ToastSystemEventAppearance) {
  switch (appearance) {
    case ToastSystemEventAppearance.Success:
      return <CheckFilledSVG />;
    case ToastSystemEventAppearance.Error:
    case ToastSystemEventAppearance.ErrorCritical:
      return <CrossFilledSVG />;
    case ToastSystemEventAppearance.Warning:
      return <AlarmFilledSVG />;
    case ToastSystemEventAppearance.Neutral:
    default:
      return <InfoFilledSVG />;
  }
}
