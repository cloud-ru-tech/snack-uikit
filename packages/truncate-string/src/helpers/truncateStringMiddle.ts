import { isEllipsisActive } from './isEllipsisActive';

const CONFIG = [
  { potentialDelimiterWidth: 0.5, leftHalfDelta: 0, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 1, leftHalfDelta: 0, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 1, leftHalfDelta: 0.5, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 1, leftHalfDelta: 0, rightHalfDelta: 0.5 },
  { potentialDelimiterWidth: 2, leftHalfDelta: 0, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 2, leftHalfDelta: 1, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 2, leftHalfDelta: 0, rightHalfDelta: 1 },
  { potentialDelimiterWidth: 3, leftHalfDelta: 0, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 3, leftHalfDelta: 1, rightHalfDelta: 0 },
  { potentialDelimiterWidth: 3, leftHalfDelta: 0, rightHalfDelta: 1 },
  { potentialDelimiterWidth: 4, leftHalfDelta: 0, rightHalfDelta: 0 },
];
const DELIMITER = '...';

export const truncateStringMiddle = ({
  text,
  element,
  truncatedElement,
}: {
  text: string;
  element: HTMLElement | null;
  truncatedElement: HTMLElement | null;
}) => {
  if (element && truncatedElement && isEllipsisActive(element)) {
    const baseWidth = element.scrollWidth / text.length;
    let result = text;

    for (const { potentialDelimiterWidth, leftHalfDelta, rightHalfDelta } of CONFIG) {
      const half = Math.floor((element.offsetWidth / baseWidth - potentialDelimiterWidth) / 2);
      const leftHalf = text.slice(0, half - leftHalfDelta);
      const rightHalf = text.slice(text.length - half + rightHalfDelta, text.length);
      result = `${leftHalf}${DELIMITER}${rightHalf}`;

      truncatedElement.innerText = result;

      if (truncatedElement.scrollWidth <= element.offsetWidth - 1) {
        break;
      }
    }

    return result;
  }

  return text;
};
