import { APPEARANCE } from '../src/constants';
import { TagRowItemInner } from '../src/types';

const APPEARANCES = Object.values(APPEARANCE);

type GenerateParams = {
  amountToGenerate: number;
  char: string;
  charLimit: number;
  includeTooltip: boolean;
};

export const generateFakeTags = ({
  amountToGenerate,
  char,
  charLimit,
  includeTooltip,
}: GenerateParams): TagRowItemInner[] => {
  let colorIndex = 0;
  let charsAmount = 1;

  const tags: TagRowItemInner[] = [];

  while (tags.length < amountToGenerate) {
    const index = tags.length + 1;
    const label = `tag${index}`.padEnd(charsAmount + `tag${index}`.length, char);

    tags.push({
      label,
      appearance: APPEARANCES[colorIndex],
      tooltip: includeTooltip
        ? {
            tip: `Tooltip for ${label}. You can set custom props.`,
          }
        : undefined,
    });

    colorIndex++;
    charsAmount++;

    if (colorIndex > APPEARANCES.length) {
      colorIndex = 0;
    }

    if (charsAmount > charLimit) {
      charsAmount = 1;
    }
  }

  return tags;
};
