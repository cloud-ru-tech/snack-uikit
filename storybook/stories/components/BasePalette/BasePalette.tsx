import cn from 'classnames';

import { Typography } from '@snack-ui/typography';

import { Palette } from './components/Palette';
import { RainbowColor, ReferenceColor, TONES } from './constants';
import styles from './styles.module.scss';

export function BasePalette() {
  const referenceColors = Object.values(ReferenceColor);
  const rainbowColors = Object.values(RainbowColor);

  return (
    <>
      <Typography
        family={Typography.families.Sans}
        role={Typography.roles.Title}
        size={Typography.sizes.L}
        tag={Typography.tags.h1}
        className={styles.title}
      >
        Base Palette
      </Typography>
      <Typography
        family={Typography.families.Sans}
        role={Typography.roles.Body}
        size={Typography.sizes.S}
        tag={Typography.tags.p}
        className={styles.description}
      >
        Это наборы тонов для каждого цвета, где каждый тон имеет порядковый номер. Базовая палитра не используется
        напрямую в интерфейсах и отсутствует в Figma
      </Typography>
      <div className={styles.table}>
        <Typography
          family={Typography.families.Sans}
          role={Typography.roles.Label}
          size={Typography.sizes.S}
          className={cn(styles.cell, styles.firstCell)}
        >
          Tone
        </Typography>
        {TONES.map(tone => (
          <Typography
            family={Typography.families.Sans}
            role={Typography.roles.Label}
            size={Typography.sizes.S}
            key={tone}
            className={styles.cell}
          >
            {tone}
          </Typography>
        ))}
        <Typography
          family={Typography.families.Sans}
          role={Typography.roles.Label}
          size={Typography.sizes.S}
          className={cn(styles.cell, styles.lastCell)}
        >
          Tone
        </Typography>
      </div>

      <div className={styles.offset}>
        <Palette colors={referenceColors} />
      </div>
      <Palette colors={rainbowColors} />
    </>
  );
}
