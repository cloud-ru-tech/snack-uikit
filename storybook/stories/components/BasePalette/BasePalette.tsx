import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';

import { Palette } from './components';
import { RainbowColor, ReferenceColor, TONES } from './constants';
import styles from './styles.module.scss';

export function BasePalette() {
  const referenceColors = Object.values(ReferenceColor);
  const rainbowColors = Object.values(RainbowColor);

  return (
    <>
      <Typography.SansTitleL tag='h1' className={styles.title}>
        Base Palette
      </Typography.SansTitleL>
      <Typography.SansBodyS tag='p' className={styles.description}>
        Это наборы тонов для каждого цвета, где каждый тон имеет порядковый номер. Базовая палитра не используется
        напрямую в интерфейсах и отсутствует в Figma
      </Typography.SansBodyS>
      <div className={styles.table}>
        <Typography.SansLabelS className={cn(styles.cell, styles.firstCell)}>Tone</Typography.SansLabelS>
        {TONES.map(tone => (
          <Typography.SansLabelS key={tone} className={styles.cell}>
            {tone}
          </Typography.SansLabelS>
        ))}
        <Typography.SansLabelS className={cn(styles.cell, styles.lastCell)}>Tone</Typography.SansLabelS>
      </div>

      <div className={styles.offset}>
        <Palette colors={referenceColors} />
      </div>
      <Palette colors={rainbowColors} />
    </>
  );
}
