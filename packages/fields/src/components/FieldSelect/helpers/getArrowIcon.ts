import { ChevronDownSVG, ChevronUpSVG } from '@snack-ui/icons';
import { IconSize, Size } from '@snack-ui/input-private';

export function getArrowIcon({ size, open }: { size: Size; open: boolean }) {
  return { ArrowIcon: open ? ChevronUpSVG : ChevronDownSVG, arrowIconSize: size === Size.S ? IconSize.Xs : IconSize.S };
}
