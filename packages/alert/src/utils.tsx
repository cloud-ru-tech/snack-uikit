import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';

import { APPEARANCE } from './constants';
import { Appearance } from './types';

export function getIcon(appearance: Appearance) {
  switch (appearance) {
    case APPEARANCE.Success:
      return <CheckFilledSVG />;
    case APPEARANCE.Error:
      return <CrossFilledSVG />;
    case APPEARANCE.Warning:
      return <AlarmFilledSVG />;
    case APPEARANCE.Primary:
    case APPEARANCE.Neutral:
    default:
      return <InfoFilledSVG />;
  }
}
