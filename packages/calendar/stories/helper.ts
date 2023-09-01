import { BuildCellPropsFunction } from '../src/types';

const disablePast: BuildCellPropsFunction = (date, viewMode) => {
  let isDisabled = false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  switch (viewMode) {
    case 'month':
      if (date.valueOf() + 86400000 < Date.now()) {
        isDisabled = true;
      }
      break;
    case 'year':
      if (currentYear > date.getFullYear()) {
        isDisabled = false;
      } else if (currentYear === date.getFullYear()) {
        if (date.getMonth() < currentMonth) {
          isDisabled = true;
        }
      }
      break;
    case 'decade':
      if (date.getFullYear() < currentYear) {
        isDisabled = true;
      }
      break;
    default:
      return { isDisabled };
  }
  return { isDisabled };
};

const buildCellPropsForTests: BuildCellPropsFunction = (date, viewMode) => {
  let isDisabled = false;
  // eslint-disable-next-line default-case
  switch (viewMode) {
    case 'month':
      if (date.getDate() >= 1 && date.getDate() < 14) {
        isDisabled = true;
      }
      break;
  }
  return { isDisabled };
};
export const getBuildCellProps = (modeBuildCellProps: 'for-tests' | 'disable-past' | 'none') => {
  // eslint-disable-next-line default-case
  switch (modeBuildCellProps) {
    case 'disable-past':
      return disablePast;
    case 'for-tests':
      return buildCellPropsForTests;
    case 'none':
      return null;
  }
};
