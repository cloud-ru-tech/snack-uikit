import * as Icons from '@snack-uikit/icons';
import { PlaceholderSVG } from '@snack-uikit/icons';

export const ICONS = Object.fromEntries(
  (Object.keys(Icons) as Array<keyof typeof Icons>).map(key => {
    const Icon = Icons[key];

    return [key, Icon];
  }),
);

export const BUTTON_PROPS = { label: 'Label text', icon: <PlaceholderSVG /> };

export const FOOTER_VARIANT = {
  none: 'none',
  predefined: 'InfoBlock.Footer',
  custom: 'custom',
} as const;
