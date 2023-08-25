import { IconPredefinedProps } from '@snack-ui/icon-predefined';

import { Align } from '../src/constants';

export type ExtendedStoryProps<T> = T & {
  icon: IconPredefinedProps['icon'];
  alignM: Align;
  showImage: boolean;
  showIcon: boolean;
};
