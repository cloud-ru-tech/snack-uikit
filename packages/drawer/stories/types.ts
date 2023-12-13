import { DrawerCustom, DrawerCustomProps, DrawerProps } from '../src';
import { Size } from '../src/types';

type CustomDrawerProps = DrawerCustomProps &
  Omit<DrawerCustom.HeaderProps, 'className'> &
  Omit<DrawerCustom.BodyProps, 'className'>;

export type ExtendedStoryProps<T> = T & {
  title: string;
  subtitle?: string;
  titleTooltip?: string;
  onClose?(): void;
};

export type DrawerCustomStoryProps = Omit<ExtendedStoryProps<CustomDrawerProps>, 'size' | 'nestedDrawer'> & {
  sizePredefined?: Size;
  sizeCustom?: string | number;
  approveButton?: DrawerProps['approveButton'];
  cancelButton?: DrawerProps['cancelButton'];
  additionalButton?: DrawerProps['additionalButton'];
};

export type DrawerStoryProps = ExtendedStoryProps<DrawerProps>;
