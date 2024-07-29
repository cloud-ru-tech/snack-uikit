import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';

import { APPEARANCE } from './constants';
import { Appearance } from './types';

export function getIcon(appearance: Appearance, size: number) {
  switch (appearance) {
    case APPEARANCE.Success:
      return <CheckFilledSVG size={size} />;
    case APPEARANCE.Error:
      return <CrossFilledSVG size={size} />;
    case APPEARANCE.Warning:
      return <AlarmFilledSVG size={size} />;
    case APPEARANCE.Primary:
    case APPEARANCE.Neutral:
    default:
      return <InfoFilledSVG size={size} />;
  }
}
