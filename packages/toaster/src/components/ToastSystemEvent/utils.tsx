import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';

import { ToastSystemEventAppearance } from './types';

export function getIcon(appearance: ToastSystemEventAppearance) {
  switch (appearance) {
    case 'success':
      return <CheckFilledSVG />;
    case 'error':
    case 'errorCritical':
      return <CrossFilledSVG />;
    case 'warning':
      return <AlarmFilledSVG />;
    case 'neutral':
    default:
      return <InfoFilledSVG />;
  }
}
