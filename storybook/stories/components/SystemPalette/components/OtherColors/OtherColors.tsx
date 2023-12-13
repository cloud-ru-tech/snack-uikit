import { Typography } from '@snack-uikit/typography';

import { SYSTEM_PALETTE } from '../../constants';
import { useThemeChange } from '../../hooks';
import { Card } from '../Card';
import styles from './styles.module.scss';

enum OtherPalette {
  Opacity = 'Opacity',
  Available = 'Available',
  Blackout = 'Blackout',
}

const DESCRIPTION = {
  [OtherPalette.Opacity]:
    'Opacity - цвет Gray в базовой палитре в альфа канале, подходит для выражения состояний поверх AccentDefault или других насыщенных цветов.',
  [OtherPalette.Available]:
    'Available - цвет Gray в базовой палитре. Самые доступные цвета палитры. Используются для компонентов к которым требуется постоянное внимание пользователя: курсор мыши, каретка ввода текста, фокусное состояние компонента и т.п.',
  [OtherPalette.Blackout]:
    'Цвет затемнения экрана для фокусировки внимания пользователя на основной операции, например при вызове модального окна или дровера.',
};

const OPACITY_TONE_GRID = ['Enabled', 'Hovered', 'Disabled', 'Activated'];
const AVAILABLE_TONE_GRID = ['Complementary', 'OnComplementary'];

export function OtherColors() {
  useThemeChange();

  return (
    <>
      <Typography.SansBodyS className={styles.description} tag='p'>
        {DESCRIPTION[OtherPalette.Opacity]}
      </Typography.SansBodyS>
      <div className={styles.opacityTable}>
        {OPACITY_TONE_GRID.filter(tone => Object.keys(SYSTEM_PALETTE.Opacity).includes(tone)).map(tone => (
          <Card color={SYSTEM_PALETTE.Opacity[tone]} key={tone} tone={tone} palette={OtherPalette.Opacity} />
        ))}
      </div>

      <Typography.SansBodyS className={styles.description} tag='p'>
        {DESCRIPTION[OtherPalette.Available]}
      </Typography.SansBodyS>
      <div className={styles.availableTable}>
        {AVAILABLE_TONE_GRID.filter(tone => Object.keys(SYSTEM_PALETTE.Available).includes(tone)).map(tone => (
          <Card color={SYSTEM_PALETTE.Available[tone]} key={tone} tone={tone} palette={OtherPalette.Available} />
        ))}
      </div>

      <Typography.SansBodyS className={styles.description} tag='p'>
        {DESCRIPTION[OtherPalette.Blackout]}
      </Typography.SansBodyS>
      <div className={styles.blackout}>
        <Card color={SYSTEM_PALETTE.Blackout} palette={OtherPalette.Blackout} />
      </div>
    </>
  );
}
