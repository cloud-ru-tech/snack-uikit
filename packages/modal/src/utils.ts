import { ALIGN, CONTENT_ALIGN, SIZE } from './constants';
import { ModalHeaderImage, ModalHeaderProps } from './helperComponents';
import { Align, Size } from './types';

const MAP_ALIGNS = {
  [ALIGN.Default]: {
    header: CONTENT_ALIGN.Default,
    body: CONTENT_ALIGN.Default,
    footer: ALIGN.Default,
  },
  [ALIGN.Center]: {
    header: CONTENT_ALIGN.Center,
    body: CONTENT_ALIGN.Center,
    footer: ALIGN.Center,
  },
  [ALIGN.Vertical]: {
    header: CONTENT_ALIGN.Center,
    body: CONTENT_ALIGN.Center,
    footer: ALIGN.Vertical,
  },
};

export function getAlignProps({ align, size }: { align: Align; size: Size }) {
  if (size === SIZE.L) {
    return MAP_ALIGNS[ALIGN.Default];
  }

  if (size === SIZE.M && align === ALIGN.Vertical) {
    return MAP_ALIGNS[ALIGN.Default];
  }

  return MAP_ALIGNS[align];
}

export function getButtonsSize({ align, size }: { align: Align; size: Size }) {
  switch (true) {
    case align === ALIGN.Vertical && size === SIZE.S:
      return 'l';
    case ([ALIGN.Default, ALIGN.Center] as Align[]).includes(align):
    default:
      return 'm';
  }
}

export function isPictureImage(picture: ModalHeaderProps['picture']): picture is ModalHeaderImage {
  if (!picture) return false;

  return 'src' in picture;
}

export function getPicture({ size, picture }: { size: Size; picture: ModalHeaderProps['picture'] }) {
  switch (size) {
    case SIZE.S:
      return picture;
    case SIZE.M:
    case SIZE.L:
    default:
      return isPictureImage(picture) ? picture : undefined;
  }
}
