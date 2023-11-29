export function rgb2hsl(HTMLcolor: string) {
  const r = parseInt(HTMLcolor.substring(1, 3), 16) / 255;
  const g = parseInt(HTMLcolor.substring(3, 5), 16) / 255;
  const b = parseInt(HTMLcolor.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let h, s;

  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }

    h /= 6;
  }

  return [h, s, l]; // H - цветовой тон, S - насыщенность, L - светлота
}

export function isDark(color: string) {
  const [h, _, l] = rgb2hsl(color);

  return (h < 0.55 && l >= 0.5) || (h >= 0.55 && l >= 0.75);
}
