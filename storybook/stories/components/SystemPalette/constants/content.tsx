import { Cards, OtherColors } from '../components';
import { SystemPalette } from './palette';

export const ColorGridMap = [
  ['Background', 'Background1Level', 'Background2Level'],
  ['DecorDefault', 'DecorHovered', 'DecorActivated', 'DecorDisabled'],
  ['TextMain', 'TextSupport', 'TextLight', 'TextDisabled'],
  ['AccentDefault', 'AccentHovered', 'AccentPressed', 'OnAccent'],
];

export const TABS = [
  {
    sysPalette: SystemPalette.Primary,
    content: (
      <Cards
        sysPalette={SystemPalette.Primary}
        description='Primary - цвет Brand в базовой палитре. Используется для привлечения внимания пользователя к основным действиям.'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Neutral,
    content: (
      <Cards
        sysPalette={SystemPalette.Neutral}
        description='Neutral - цвет Gray в базовой палитре. Примерно 90% интерфейса основано на этом цвете.'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Red,
    content: (
      <Cards
        sysPalette={SystemPalette.Red}
        description='Red - цвет Red в базовой палитре Может использоваться для привлечения внимания к критическим событиям в интерфейсе'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Orange,
    content: (
      <Cards
        sysPalette={SystemPalette.Orange}
        description='Orange - цвет Orange в базовой палитре Может использоваться в тегах, графиках и других местах требующих цветового кодирования'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Yellow,
    content: (
      <Cards
        sysPalette={SystemPalette.Yellow}
        description='Yellow - цвет Yellow в базовой палитре Может использоваться для привлечения внимания к предупредительным событиям в интерфейсе'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Green,
    content: (
      <Cards
        sysPalette={SystemPalette.Green}
        description='Green - цвет Green в базовой палитре Может использоваться для привлечения внимания успешным событиям в интерфейсе'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Blue,
    content: (
      <Cards
        sysPalette={SystemPalette.Blue}
        description='Blue - цвет Blue в базовой палитре Может использоваться в тегах, графиках и других местах требующих цветового кодирования'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Violet,
    content: (
      <Cards
        sysPalette={SystemPalette.Violet}
        description='Violet - цвет Violet в базовой палитре Может использоваться в тегах, графиках и других местах требующих цветового кодирования'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Pink,
    content: (
      <Cards
        sysPalette={SystemPalette.Pink}
        description='Pink - цвет Pink в базовой палитре Может использоваться в тегах, графиках и других местах требующих цветового кодирования'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Invert,
    content: (
      <Cards
        sysPalette={SystemPalette.Invert}
        description='InvertNeutral - цвет Gray в базовой палитре Для дополнительного контраста относительно Neutral, к примеру tooltip'
      />
    ),
  },
  {
    sysPalette: SystemPalette.Other,
    content: <OtherColors />,
  },
];
