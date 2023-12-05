import { ModalProps } from '@snack-uikit/modal';

import { PICTURE_ARGS } from './constants';
import { ExtendedStoryProps } from './types';

export function getStoryPicture({
  picture,
  icon,
  showIcon,
  showImage,
}: Pick<ExtendedStoryProps<ModalProps>, 'picture' | 'icon' | 'showIcon' | 'showImage'>) {
  if (showIcon) {
    return icon || PICTURE_ARGS.icon;
  }

  if (showImage) {
    return picture || PICTURE_ARGS.image;
  }

  return undefined;
}
