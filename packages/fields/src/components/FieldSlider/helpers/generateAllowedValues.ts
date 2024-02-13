export const generateAllowedValues = (min: number, max: number, step: number): number[] => {
  const values: number[] = [];

  let current = min;

  while (current < max) {
    values.push(current);
    current += step;
  }

  return values;
};
