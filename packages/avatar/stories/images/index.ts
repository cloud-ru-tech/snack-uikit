import { Avatar } from '../../src';
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
  [Avatar.shapes.Round]: {
    [Avatar.appearances.Red]: ImageUser01,
    [Avatar.appearances.Orange]: ImageUser02,
    [Avatar.appearances.Yellow]: ImageUser03,
    [Avatar.appearances.Green]: ImageUser04,
    [Avatar.appearances.Blue]: ImageUser05,
    [Avatar.appearances.Violet]: ImageUser06,
    [Avatar.appearances.Pink]: ImageUser07,
    [Avatar.appearances.Gray]: ImageUser08,
  },
  [Avatar.shapes.Square]: {
    [Avatar.appearances.Red]: ImageCorp01,
    [Avatar.appearances.Orange]: ImageCorp02,
    [Avatar.appearances.Yellow]: ImageCorp03,
    [Avatar.appearances.Green]: ImageCorp04,
    [Avatar.appearances.Blue]: ImageCorp05,
    [Avatar.appearances.Violet]: ImageCorp06,
    [Avatar.appearances.Pink]: ImageCorp07,
    [Avatar.appearances.Gray]: ImageCorp08,
  },
};
