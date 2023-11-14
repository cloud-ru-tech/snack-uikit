import { Calendar } from '@snack-ui/calendar';
import { Droplist } from '@snack-ui/droplist';

import { ButtonSize, Size } from '../../constants';

export const BUTTON_CLEAR_VALUE_SIZE_MAP = {
  [Size.Xs]: ButtonSize.Xxs,
  [Size.S]: ButtonSize.Xs,
  [Size.M]: ButtonSize.Xs,
  [Size.L]: ButtonSize.Xs,
};

export const CALENDAR_SIZE_MAP = {
  [Size.Xs]: Calendar.sizes.S,
  [Size.S]: Calendar.sizes.S,
  [Size.M]: Calendar.sizes.M,
  [Size.L]: Calendar.sizes.M,
};

export const DROPLIST_SIZE_MAP = {
  [Size.Xs]: Droplist.sizes.S,
  [Size.S]: Droplist.sizes.S,
  [Size.M]: Droplist.sizes.M,
  [Size.L]: Droplist.sizes.L,
};
