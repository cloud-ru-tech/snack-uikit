import { AlarmFilledSSVG, CheckFilledSSVG, CrossFilledSSVG } from '@snack-ui/icons';

import { ToastUserActionAppearance } from './constants';

export function getIcon(appearance: ToastUserActionAppearance) {
  switch (appearance) {
    case ToastUserActionAppearance.Success:
      return <CheckFilledSSVG />;
    case ToastUserActionAppearance.Error:
      return <CrossFilledSSVG />;
    case ToastUserActionAppearance.Warning:
      return <AlarmFilledSSVG />;
    case ToastUserActionAppearance.Neutral:
    default:
      return null;
  }
}
