import { ButtonFilled, ButtonLight, ButtonTonal } from '@snack-ui/button';

import { Align, ContentAlign, Size } from './constants';

const MAP_ALIGNS = {
  [Align.Default]: {
    header: ContentAlign.Default,
    body: ContentAlign.Default,
    footer: Align.Default,
  },
  [Align.Center]: {
    header: ContentAlign.Center,
    body: ContentAlign.Center,
    footer: Align.Center,
  },
  [Align.Vertical]: {
    header: ContentAlign.Center,
    body: ContentAlign.Center,
    footer: Align.Vertical,
  },
};

export function getAlignProps({ align, size }: { align: Align; size: Size }) {
  if (size === Size.L) {
    return MAP_ALIGNS[Align.Default];
  }

  if (size === Size.M && align === Align.Vertical) {
    return MAP_ALIGNS[Align.Default];
  }

  return MAP_ALIGNS[align];
}

export function getButtonsSizes(align: Align) {
  switch (align) {
    case Align.Vertical:
      return {
        filled: ButtonFilled.sizes.L,
        tonal: ButtonTonal.sizes.L,
        light: ButtonLight.sizes.L,
      };
    case Align.Default:
    case Align.Center:
    default:
      return {
        filled: ButtonFilled.sizes.M,
        tonal: ButtonTonal.sizes.M,
        light: ButtonLight.sizes.M,
      };
  }
}
