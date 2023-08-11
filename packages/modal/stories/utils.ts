import { ModalProps } from '@snack-ui/modal';

import { PICTURE_ARGS } from './constants';
import { ExtendedStoryProps } from './types';

export function getPicture({
  picture,
  icon,
  showPicture,
}: Pick<ExtendedStoryProps<ModalProps>, 'picture' | 'icon' | 'showPicture'>) {
  if (picture) return picture;

  if (showPicture === 'icon' && icon) {
    return icon;
  }

  return PICTURE_ARGS[showPicture];
}
