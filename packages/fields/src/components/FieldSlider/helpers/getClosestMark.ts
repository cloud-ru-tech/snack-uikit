const getDiff = (value: number, mark: number): number => Math.abs(mark - value);

export const getClosestMark = (value: number, marks: number[]): { lowestDiff: number; mark: number } =>
  marks.reduce(
    (accResult, mark) => {
      const diff = getDiff(value, mark);
      if (diff < accResult.lowestDiff) {
        return {
          lowestDiff: diff,
          mark,
        };
      }

      return accResult;
    },
    {
      lowestDiff: getDiff(value, marks[0]),
      mark: marks[0],
    },
  );
