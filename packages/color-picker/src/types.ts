import { HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from 'react-colorful';

export type { HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor };

export type Color = RgbColor | HslColor | HsvColor | RgbaColor | HslaColor | HsvaColor | string;

export type RawColor = {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  hsv: HsvColor;
  rgba: RgbaColor;
  hsla: HslaColor;
  hsva: HsvaColor;
};
