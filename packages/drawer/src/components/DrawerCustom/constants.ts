import './motion.css';

import type { DrawerProps } from 'rc-drawer';

export const maskMotion: DrawerProps['maskMotion'] = {
  motionAppear: true,
  motionName: 'maskMotion',
};

export const motion: DrawerProps['motion'] = placement => ({
  motionAppear: true,
  motionName: `panelMotion-${placement}`,
});

export const motionProps: Partial<DrawerProps> = {
  maskMotion,
  motion,
};
