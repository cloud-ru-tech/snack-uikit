import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';

import { Appearance } from './constants';

export function getIcon(appearance: Appearance) {
  switch (appearance) {
    case Appearance.Success:
      return <CheckFilledSVG />;
    case Appearance.Error:
      return <CrossFilledSVG />;
    case Appearance.Warning:
      return <AlarmFilledSVG />;
    case Appearance.Primary:
    case Appearance.Neutral:
    default:
      return <InfoFilledSVG />;
  }
}
