import { ChevronDownSSVG, ChevronDownXsSVG, ChevronUpSSVG, ChevronUpXsSVG } from '@snack-ui/icons';

import { Size } from '../../../constants';

export function getArrowIcon({ size, open }: { size: Size; open: boolean }) {
  const iconMap = {
    [Size.S]: {
      open: ChevronUpXsSVG,
      closed: ChevronDownXsSVG,
    },
    [Size.M]: {
      open: ChevronUpSSVG,
      closed: ChevronDownSSVG,
    },
    [Size.L]: {
      open: ChevronUpSSVG,
      closed: ChevronDownSSVG,
    },
  };

  return iconMap[size][open ? 'open' : 'closed'];
}
