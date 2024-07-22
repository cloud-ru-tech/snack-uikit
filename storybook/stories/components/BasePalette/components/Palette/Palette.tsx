import cn from 'classnames';
import { Fragment } from 'react';

import { themeVars } from '@snack-uikit/figma-tokens';
import { Typography } from '@snack-uikit/typography';

import { capitalize } from '../../../utils';
import { TONES } from '../../constants';
import styles from './styles.module.scss';

type PaletteProps = {
  colors: string[];
};

type ThemeVars = Record<string, Record<string, string>>;

const THEME_VARS_REF: ThemeVars = themeVars.ref;

export function Palette({ colors }: PaletteProps) {
  return (
    <div className={styles.table}>
      {colors.map((color, colorIndex) => {
        const colorName = capitalize(color);

        return (
          <Fragment key={color}>
            <Typography.SansBodyS className={cn(styles.cell, styles.firstCell)}>{colorName}</Typography.SansBodyS>
            {TONES.map(tone => (
              <Fragment key={tone}>
                <div
                  className={cn(styles.cell, {
                    [styles.firstRowCell]: colorIndex === 0,
                    [styles.lastRowCell]: colorIndex === colors.length - 1,
                  })}
                  style={{ backgroundColor: THEME_VARS_REF[color][tone] }}
                />
              </Fragment>
            ))}
            <Typography.SansBodyS className={cn(styles.cell, styles.lastCell)}>{colorName}</Typography.SansBodyS>
          </Fragment>
        );
      })}
    </div>
  );
}
