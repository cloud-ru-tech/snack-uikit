import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG } from '@snack-uikit/icons';

import { ToastUserActionAppearance } from './constants';

export function getIcon(appearance: ToastUserActionAppearance) {
  switch (appearance) {
    case ToastUserActionAppearance.Success:
      return <CheckFilledSVG />;
    case ToastUserActionAppearance.Error:
      return <CrossFilledSVG />;
    case ToastUserActionAppearance.Warning:
      return <AlarmFilledSVG />;
    case ToastUserActionAppearance.Neutral:
    default:
      return null;
  }
}
