import { APPEARANCE } from '../src/constants';
import { TagRowItemInner } from '../src/types';

const COLOURS = Object.values(APPEARANCE);

export const generateFakeTags = (amountToGenerate: number, char: string, charLimit: number): TagRowItemInner[] => {
  let colorIndex = 0;
  let charsAmount = 1;

  const tags: TagRowItemInner[] = [];

  while (tags.length < amountToGenerate) {
    const index = tags.length + 1;
    const label = `tag${index}`.padEnd(charsAmount + `tag${index}`.length, char);

    tags.push({
      label,
      color: COLOURS[colorIndex],
    });

    colorIndex++;
    charsAmount++;

    if (colorIndex > COLOURS.length) {
      colorIndex = 0;
    }

    if (charsAmount > charLimit) {
      charsAmount = 1;
    }
  }

  return tags;
};
