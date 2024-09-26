import { Color, RawColor, RgbaColor } from '../../types';
import { FieldPrivate } from '../FieldPrivate';

export type ColorPickerProps = {
  /** Значение */
  value?: Color;
  /** Колбек на изменение */
  onChange?(rawColor: Partial<RawColor>): void;
  /** Значение с альфаканалом */
  withAlpha?: boolean;
  /** Применять изменения автоматически, если значение false - то изменения происходят по кнопке */
  autoApply?: boolean;
};

export type FieldAlphaColorProps = {
  rgba: RgbaColor;
  onChange(color: Color): void;
};

export function FieldAlphaColor({ onChange, rgba }: FieldAlphaColorProps) {
  const handleChange = (a: string) => {
    onChange({ ...rgba, a: (Number(a) % 100) / 100 });
  };

  return <FieldPrivate value={rgba.a * 100} onChange={handleChange} inputType='number' min={0} max={100} />;
}
