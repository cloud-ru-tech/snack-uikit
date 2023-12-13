import { IconPredefinedProps } from '@snack-uikit/icon-predefined';

import { Align } from '../src/types';

export type ExtendedStoryProps<T> = T & {
  icon: IconPredefinedProps['icon'];
  alignM: Align;
  showImage: boolean;
  showIcon: boolean;
};
