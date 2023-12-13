import { APPEARANCE, SHAPE } from '../../src/components/constants';
import ImageCorp01 from './ImageCorp01.jpg';
import ImageCorp02 from './ImageCorp02.jpg';
import ImageCorp03 from './ImageCorp03.jpg';
import ImageCorp04 from './ImageCorp04.jpg';
import ImageCorp05 from './ImageCorp05.jpg';
import ImageCorp06 from './ImageCorp06.jpg';
import ImageCorp07 from './ImageCorp07.jpg';
import ImageCorp08 from './ImageCorp08.jpg';
import ImageUser01 from './ImageUser01.jpg';
import ImageUser02 from './ImageUser02.jpg';
import ImageUser03 from './ImageUser03.jpg';
import ImageUser04 from './ImageUser04.jpg';
import ImageUser05 from './ImageUser05.jpg';
import ImageUser06 from './ImageUser06.jpg';
import ImageUser07 from './ImageUser07.jpg';
import ImageUser08 from './ImageUser08.jpg';

export const imagesConfig = {
  [SHAPE.Round]: {
    [APPEARANCE.Red]: ImageUser01,
    [APPEARANCE.Orange]: ImageUser02,
    [APPEARANCE.Yellow]: ImageUser03,
    [APPEARANCE.Green]: ImageUser04,
    [APPEARANCE.Blue]: ImageUser05,
    [APPEARANCE.Violet]: ImageUser06,
    [APPEARANCE.Pink]: ImageUser07,
    [APPEARANCE.Neutral]: ImageUser08,
  },
  [SHAPE.Square]: {
    [APPEARANCE.Red]: ImageCorp01,
    [APPEARANCE.Orange]: ImageCorp02,
    [APPEARANCE.Yellow]: ImageCorp03,
    [APPEARANCE.Green]: ImageCorp04,
    [APPEARANCE.Blue]: ImageCorp05,
    [APPEARANCE.Violet]: ImageCorp06,
    [APPEARANCE.Pink]: ImageCorp07,
    [APPEARANCE.Neutral]: ImageCorp08,
  },
};
