import { extractDataTestProps } from '@snack-uikit/utils';

export const getDataTestAttributes = (rest: Record<string, unknown>) => {
  const dataTestProps = extractDataTestProps(rest);

  return Object.keys(dataTestProps).reduce<Record<string, unknown>>((acc, key) => {
    const newKey = key.replace('data-', '');
    acc[newKey] = dataTestProps[key];

    return acc;
  }, {});
};
