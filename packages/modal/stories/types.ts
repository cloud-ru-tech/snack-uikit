import { IconPredefinedProps } from '@snack-ui/icon-predefined';

export type ExtendedStoryProps<T> = T & {
  icon: IconPredefinedProps['icon'];
  showPicture: 'image' | 'icon' | 'none';
};
