import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import {
  HexAlphaColorPicker,
  HexColorPicker,
  HsvaColorPicker,
  HsvColorPicker,
  RgbaColorPicker,
  RgbColorPicker,
} from 'react-colorful';

import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { CheckSVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';
import { SegmentedControl } from '@snack-uikit/segmented-control';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { COLOR_MODE, COLOR_MODE_LABEL, ColorMode, DEFAULT_COLOR_MODE_CONFIG } from '../constants';
import { FieldPrivate } from '../helperComponents';
import { FieldAlphaColor } from '../helperComponents/FieldAlphaColor/FieldAlphaColor';
import { Color, RawColor } from '../types';
import { colorToRawValue, hexToRgba } from '../utils/convert';
import { validHex } from '../utils/validate';
import styles from './styles.module.scss';

export type ColorPickerProps = WithSupportProps<{
  /** Значение */
  value?: Color;
  /** Колбек на изменение */
  onChange?(rawColor: Partial<RawColor>): void;
  /** Значение с альфаканалом */
  withAlpha?: boolean;
  /** Применять изменения автоматически, если значение false - то изменения происходят по кнопке */
  autoApply?: boolean;
  /** Класснейм */
  className?: string;

  colorMode?: {
    hex?: boolean;
    rgb?: boolean;
    hsv?: boolean;
  };
}>;

export function ColorPicker({
  value,
  onChange,
  withAlpha = true,
  autoApply,
  className,
  colorMode: colorModeProp = DEFAULT_COLOR_MODE_CONFIG,
  ...rest
}: ColorPickerProps) {
  const colorModeOptions = useMemo(() => {
    const colorModeConfig: Record<ColorMode, boolean> = { ...DEFAULT_COLOR_MODE_CONFIG, ...colorModeProp };

    return Object.keys(colorModeConfig).reduce(
      (res, colorMode: ColorMode) => {
        if (Boolean(colorModeConfig[colorMode])) {
          res.push({
            value: colorMode,
            label: COLOR_MODE_LABEL[colorMode],
          });
        }

        return res;
      },
      [] as { label: string; value: ColorMode }[],
    );
  }, [colorModeProp]);
  const [rawValue, setRawValue] = useState(colorToRawValue(value || '#000'));
  const [colorMode, setColorMode] = useState<ColorMode>(colorModeOptions[0].value);

  const [tempHex, setTempHex] = useState<string>(rawValue.hex);

  useEffect(() => {
    if (value) {
      const raw = colorToRawValue(value);

      setRawValue(raw);
      setTempHex(raw.hex);
    }
  }, [value]);

  const handleChange = (color: Color) => {
    const rawValue = colorToRawValue(color);
    setRawValue(rawValue);
    autoApply && onChange?.(rawValue);
  };

  const applyChange = () => {
    onChange?.(rawValue);
  };

  const reset = () => {
    value && setRawValue(colorToRawValue(value));
  };

  const { t } = useLocale('ColorPicker');

  return (
    <div className={cn(styles.container, 'osThemeSnack', className)} {...extractSupportProps(rest)}>
      {colorMode === COLOR_MODE.Hex &&
        (withAlpha ? (
          <HexAlphaColorPicker onChange={handleChange} color={rawValue.hex} />
        ) : (
          <HexColorPicker onChange={handleChange} color={rawValue.hex} />
        ))}

      {colorMode === COLOR_MODE.Rbg &&
        (withAlpha ? (
          <RgbaColorPicker onChange={handleChange} color={rawValue.rgba} />
        ) : (
          <RgbColorPicker onChange={handleChange} color={rawValue.rgb} />
        ))}

      {colorMode === COLOR_MODE.Hsv &&
        (withAlpha ? (
          <HsvaColorPicker onChange={handleChange} color={rawValue.hsva} />
        ) : (
          <HsvColorPicker onChange={handleChange} color={rawValue.hsv} />
        ))}

      <div className={styles.colorModel}>
        <SegmentedControl outline value={colorMode} size='s' onChange={setColorMode} items={colorModeOptions} />

        <div className={styles.colorFields} data-mode={colorMode} data-with-alpha={withAlpha || undefined}>
          <>
            {colorMode === COLOR_MODE.Hex && (
              <FieldPrivate
                value={rawValue.hex.replace('#', '').substring(0, 6)}
                error={!validHex(tempHex, withAlpha)}
                inputType='text'
                onChange={(value = '') => {
                  setTempHex(value);

                  if (validHex(value)) {
                    handleChange({ ...hexToRgba(value), a: rawValue.rgba.a });
                  }
                }}
              />
            )}

            {colorMode === COLOR_MODE.Rbg && (
              <>
                <FieldPrivate
                  value={rawValue.rgb.r}
                  max={255}
                  onChange={value => {
                    handleChange({ ...rawValue.rgba, r: Number(value) });
                  }}
                />
                <FieldPrivate
                  value={rawValue.rgb.g}
                  max={255}
                  onChange={value => {
                    handleChange({ ...rawValue.rgba, g: Number(value) });
                  }}
                />
                <FieldPrivate
                  value={rawValue.rgb.b}
                  max={255}
                  onChange={value => {
                    handleChange({ ...rawValue.rgba, b: Number(value) });
                  }}
                />
              </>
            )}

            {colorMode === COLOR_MODE.Hsv && (
              <>
                <FieldPrivate
                  value={rawValue.hsv.h}
                  max={360}
                  onChange={value => {
                    handleChange({ ...rawValue.hsva, h: Number(value) });
                  }}
                />
                <FieldPrivate
                  value={rawValue.hsv.s}
                  max={100}
                  onChange={value => {
                    handleChange({ ...rawValue.hsva, s: Number(value) });
                  }}
                />
                <FieldPrivate
                  value={rawValue.hsv.v}
                  max={100}
                  onChange={value => {
                    handleChange({ ...rawValue.hsva, v: Number(value) });
                  }}
                />
              </>
            )}
          </>

          {withAlpha && <FieldAlphaColor rgba={rawValue.rgba} onChange={handleChange} />}
        </div>
      </div>

      {!autoApply && (
        <div className={styles.footer}>
          <ButtonFunction label={t('cancel')} size='xs' onClick={reset} />
          <ButtonFilled label={t('apply')} icon={<CheckSVG />} onClick={applyChange} size='xs' />
        </div>
      )}
    </div>
  );
}
