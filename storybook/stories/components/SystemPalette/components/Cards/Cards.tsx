import { Typography } from '@snack-uikit/typography';

import { SYSTEM_PALETTE } from '../../constants';
import { useThemeChange } from '../../hooks';
import { Card } from '../Card';
import styles from './styles.module.scss';

export const TONE_GRID = [
  ['Background', 'Background1Level', 'Background2Level'],
  ['DecorDefault', 'DecorHovered', 'DecorActivated', 'DecorDisabled'],
  ['TextMain', 'TextSupport', 'TextLight', 'TextDisabled'],
  ['AccentDefault', 'AccentHovered', 'AccentPressed', 'OnAccent'],
];

type SystemColorsProps = {
  sysPalette: string;
  description: string;
};

export function Cards({ sysPalette, description }: SystemColorsProps) {
  useThemeChange();

  return (
    <>
      <Typography.SansBodyS className={styles.description} tag='p'>
        {description}
      </Typography.SansBodyS>
      <div className={styles.table}>
        {TONE_GRID.map((tones: string[], index: number) => (
          <div className={styles.row} key={index}>
            {tones
              .filter(tone => Object.keys(SYSTEM_PALETTE[sysPalette]).includes(tone))
              .map(tone => (
                <Card color={SYSTEM_PALETTE[sysPalette][tone]} key={tone} tone={tone} palette={sysPalette} />
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
