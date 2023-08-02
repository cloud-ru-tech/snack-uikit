import { AlarmFilledSSVG, CheckFilledSSVG, CrossFilledSSVG, InfoFilledSSVG } from '@snack-ui/icons';

import { ToastSystemEventAppearance } from './constants';

export function getIcon(appearance: ToastSystemEventAppearance) {
  switch (appearance) {
    case ToastSystemEventAppearance.Success:
      return <CheckFilledSSVG />;
    case ToastSystemEventAppearance.Error:
    case ToastSystemEventAppearance.ErrorCritical:
      return <CrossFilledSSVG />;
    case ToastSystemEventAppearance.Warning:
      return <AlarmFilledSSVG />;
    case ToastSystemEventAppearance.Neutral:
    default:
      return <InfoFilledSSVG />;
  }
}
