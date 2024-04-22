const getDiff = (value: number, mark: number): number => Math.abs(mark - value);

export const getClosestMark = <T>(
  value: number,
  marks: T[],
  getMarkValue: (value: T) => number,
): { lowestDiff: number; mark: T } =>
  marks.reduce(
    (accResult, mark) => {
      const diff = getDiff(value, getMarkValue(mark));
      if (diff < accResult.lowestDiff) {
        return {
          lowestDiff: diff,
          mark,
        };
      }

      return accResult;
    },
    {
      lowestDiff: getDiff(value, getMarkValue(marks[0])),
      mark: marks[0],
    },
  );
