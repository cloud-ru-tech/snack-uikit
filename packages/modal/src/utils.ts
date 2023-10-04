import { ButtonFilled, ButtonSimple, ButtonTonal } from '@snack-ui/button';

import { Align, ContentAlign, Size } from './constants';
import { ModalHeaderImage, ModalHeaderProps } from './helperComponents';

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

export function getButtonsSizes({ align, size }: { align: Align; size: Size }) {
  switch (true) {
    case align === Align.Vertical && size === Size.S:
      return {
        filled: ButtonFilled.sizes.L,
        tonal: ButtonTonal.sizes.L,
        simple: ButtonSimple.sizes.L,
      };
    case [Align.Default, Align.Center].includes(align):
    default:
      return {
        filled: ButtonFilled.sizes.M,
        tonal: ButtonTonal.sizes.M,
        light: ButtonSimple.sizes.M,
      };
  }
}

export function isPictureImage(picture: ModalHeaderProps['picture']): picture is ModalHeaderImage {
  if (!picture) return false;

  return 'src' in picture;
}

export function getPicture({ size, picture }: { size: Size; picture: ModalHeaderProps['picture'] }) {
  switch (size) {
    case Size.S:
      return picture;
    case Size.M:
    case Size.L:
    default:
      return isPictureImage(picture) ? picture : undefined;
  }
}
