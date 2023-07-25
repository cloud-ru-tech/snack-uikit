import { AlarmFilledSSVG, CheckFilledSSVG, CrossFilledSSVG, InfoFilledSSVG } from '@snack-ui/icons';

import { Appearance } from './constants';

export function getIcon(appearance: Appearance) {
  switch (appearance) {
    case Appearance.Success:
      return <CheckFilledSSVG />;
    case Appearance.Error:
      return <CrossFilledSSVG />;
    case Appearance.Warning:
      return <AlarmFilledSSVG />;
    case Appearance.Primary:
    case Appearance.Neutral:
    default:
      return <InfoFilledSSVG />;
  }
}
