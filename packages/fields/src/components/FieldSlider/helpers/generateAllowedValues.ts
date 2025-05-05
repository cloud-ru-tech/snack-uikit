export const generateAllowedValues = (min: number, max: number, step: number): number[] => {
  const values: number[] = [];

  let current = min;

  while (current <= max) {
    values.push(parseFloat(current.toFixed(10)));
    current += step;
  }

  return values;
};
