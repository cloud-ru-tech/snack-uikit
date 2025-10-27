import { BuildCellPropsFunction, Range } from '../src/types';

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
  switch (viewMode) {
    case 'month':
      if (date.getDate() >= 1 && date.getDate() < 14) {
        return { isDisabled: true };
      }
      return { isDisabled: false };

    default:
      return { isDisabled: false };
  }
};

export const getBuildCellProps = (modeBuildCellProps: 'for-tests' | 'disable-past' | 'none') => {
  switch (modeBuildCellProps) {
    case 'disable-past':
      return disablePast;
    case 'for-tests':
      return buildCellPropsForTests;
    case 'none':
    default:
      return;
  }
};

const dayInMs = 24 * 60 * 60 * 1000;

export function getCustomListOfPeriodOptions(today?: Date) {
  const now = today || new Date();
  const nowInMs = now.getTime();

  const calculatePeriodUpToNow = (presetLimitInMs: number): Range => {
    const limit = new Date(now.getTime() + presetLimitInMs);
    return nowInMs > limit.getTime() ? [limit, now] : [now, limit];
  };

  const getNextWeekendRange = (): Range => {
    const dayOfWeek = now.getDay();
    let daysUntilSaturday: number;
    let saturday: Date;
    let sunday: Date;

    if (dayOfWeek === 6) {
      saturday = new Date(now);
      sunday = new Date(now);
      sunday.setDate(sunday.getDate() + 1);
    } else if (dayOfWeek === 0) {
      daysUntilSaturday = 6;
      saturday = new Date(now);
      saturday.setDate(saturday.getDate() + daysUntilSaturday);
      sunday = new Date(saturday);
      sunday.setDate(sunday.getDate() + 1);
    } else {
      daysUntilSaturday = 6 - dayOfWeek;
      saturday = new Date(now);
      saturday.setDate(saturday.getDate() + daysUntilSaturday);
      sunday = new Date(saturday);
      sunday.setDate(sunday.getDate() + 1);
    }

    saturday.setHours(0, 0, 0, 0);
    sunday.setHours(0, 0, 0, 0);

    return [saturday, sunday];
  };

  return [
    {
      label: 'Next 7 days',
      id: 'next-7-days',
      range: calculatePeriodUpToNow(dayInMs * 7),
    },
    {
      label: 'Next 14 days',
      id: 'next-14-days',
      range: calculatePeriodUpToNow(dayInMs * 14),
    },
    {
      label: 'Previous 7 days',
      id: 'previous-7-days',
      range: calculatePeriodUpToNow(dayInMs * -7),
    },
    {
      label: 'Previous 14 days',
      id: 'previous-14-days',
      range: calculatePeriodUpToNow(dayInMs * -14),
    },
    {
      label: 'Next weekend',
      id: 'next-weekend',
      range: getNextWeekendRange(),
    },
  ];
}
