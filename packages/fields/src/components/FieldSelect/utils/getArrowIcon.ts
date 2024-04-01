import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { ICON_SIZE, SIZE, Size } from '@snack-uikit/input-private';

export function getArrowIcon({ size, open }: { size: Size; open: boolean }) {
  return {
    ArrowIcon: open ? ChevronUpSVG : ChevronDownSVG,
    arrowIconSize: size === SIZE.S ? ICON_SIZE.Xs : ICON_SIZE.S,
  };
}
