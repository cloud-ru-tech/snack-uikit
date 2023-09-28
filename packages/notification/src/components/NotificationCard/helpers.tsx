import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-ui/icons';

import { Appearance } from './constants';

export function getIcon(appearance: Appearance) {
  switch (appearance) {
    case Appearance.Success:
      return <CheckFilledSVG size={16} />;
    case Appearance.Error:
    case Appearance.ErrorCritical:
      return <CrossFilledSVG size={16} />;
    case Appearance.Warning:
      return <AlarmFilledSVG size={16} />;
    case Appearance.Neutral:
      return <InfoFilledSVG size={16} />;
    default:
      return null;
  }
}
