import { useLocale } from '@snack-uikit/locale';

import { PresetItem, Range } from '../../types';
type TFunction = ReturnType<typeof useLocale<'Calendar'>>['t'];

const dayInMs = 24 * 60 * 60 * 1000;

export function getDefaultPresets(t: TFunction, today?: Date): PresetItem[] {
  const now = today || new Date();
  const nowInMs = now.getTime();

  const calculatePeriodUpToNow = (presetLimitInMs: number): Range => {
    const limit = new Date(now.getTime() + presetLimitInMs);
    return nowInMs > limit.getTime() ? [limit, now] : [now, limit];
  };

  return [
    {
      label: t('defaultPresets.lastWeek'),
      id: 'week',
      range: calculatePeriodUpToNow(dayInMs * -7),
    },
    {
      label: t('defaultPresets.lastTwoWeeks'),
      id: 'twoWeeks',
      range: calculatePeriodUpToNow(dayInMs * -14),
    },
    {
      label: t('defaultPresets.lastMonth'),
      id: 'month',
      range: calculatePeriodUpToNow(dayInMs * -30),
    },
    {
      label: t('defaultPresets.lastQuarter'),
      id: 'quarter',
      range: calculatePeriodUpToNow(dayInMs * -90),
    },
    {
      label: t('defaultPresets.lastThird'),
      id: 'fourMonths',
      range: calculatePeriodUpToNow(dayInMs * -120),
    },
    {
      label: t('defaultPresets.lastYear'),
      id: 'year',
      range: calculatePeriodUpToNow(dayInMs * -365),
    },
    {
      label: t('defaultPresets.lastTwoYears'),
      id: 'twoYears',
      range: calculatePeriodUpToNow(dayInMs * -365 * 2),
    },
  ];
}
