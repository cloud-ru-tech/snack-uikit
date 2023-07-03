import cn from 'classnames';
import { Fragment } from 'react';

import { themeVars } from '@sbercloud/figma-tokens';
import { Typography } from '@snack-ui/typography';

import { capitalize } from '../../../utils';
import { TONES } from '../../constants';
import styles from './styles.module.scss';

type PaletteProps = {
  colors: string[];
};

export function Palette({ colors }: PaletteProps) {
  return (
    <div className={styles.table}>
      {colors.map((color, colorIndex) => {
        const colorName = capitalize(color);

        return (
          <Fragment key={color}>
            <Typography
              family={Typography.families.Sans}
              role={Typography.roles.Body}
              size={Typography.sizes.S}
              className={cn(styles.cell, styles.firstCell)}
            >
              {colorName}
            </Typography>
            {TONES.map(tone => (
              <Fragment key={tone}>
                <div
                  className={cn(styles.cell, {
                    [styles.firstRowCell]: colorIndex === 0,
                    [styles.lastRowCell]: colorIndex === colors.length - 1,
                  })}
                  style={{ backgroundColor: `var(${themeVars.ref[color][tone]})` }}
                />
              </Fragment>
            ))}
            <Typography
              family={Typography.families.Sans}
              role={Typography.roles.Body}
              size={Typography.sizes.S}
              className={cn(styles.cell, styles.lastCell)}
            >
              {colorName}
            </Typography>
          </Fragment>
        );
      })}
    </div>
  );
}
