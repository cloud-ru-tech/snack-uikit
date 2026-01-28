import { MouseEvent } from 'react';

import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';

import { APPEARANCE } from './constants';
import { Appearance } from './types';

export function getIcon(appearance: Appearance) {
  switch (appearance) {
    case APPEARANCE.Success:
      return <CheckFilledSVG size={16} />;
    case APPEARANCE.Error:
    case APPEARANCE.ErrorCritical:
      return <CrossFilledSVG size={16} />;
    case APPEARANCE.Warning:
      return <AlarmFilledSVG size={16} />;
    case APPEARANCE.Neutral:
      return <InfoFilledSVG size={16} />;
    default:
      return null;
  }
}

export function stopPropagationClick(e: MouseEvent<HTMLElement>) {
  e.stopPropagation();
}
