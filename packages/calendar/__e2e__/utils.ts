import { ClientFunction } from 'testcafe';

export const getCalendarTextSnapshot = ClientFunction(() => {
  const TEST_ID = 'test-id';
  const ITEM = `item-${TEST_ID}`;
  const HEADER_ITEM = `header-item-${TEST_ID}`;
  const PERIOD_LEVEL = `period-level-${TEST_ID}`;
  const HOURS_ITEM = `hours-${TEST_ID}`;
  const MINUTES_ITEM = `minutes-${TEST_ID}`;
  const SECONDS_ITEM = `seconds-${TEST_ID}`;

  const dataTestIdSelector = (testId: string) => `*[data-test-id="${testId}"]`;

  const getItemsText = (selector: string) => {
    const elements = document.querySelectorAll<HTMLElement>(dataTestIdSelector(selector));
    const items: string[] = [];

    for (const element of elements) {
      let text = element.innerText;
      const isSelected = element.getAttribute('data-is-selected') || element.getAttribute('data-checked');
      const isCurrent = element.getAttribute('data-is-current');
      const inRangePosition = element.getAttribute('data-in-range-position');
      text = isCurrent ? `!${text}` : text;
      text = isSelected ? `[${text}]` : text;
      if (inRangePosition === 'start') {
        text = `${text}_`;
      } else if (inRangePosition === 'in') {
        text = `_${text}_`;
      } else if (inRangePosition === 'end') {
        text = `_${text}`;
      }
      items.push(text);
    }

    return items;
  };

  const items = getItemsText(ITEM);
  const header = getItemsText(HEADER_ITEM);
  const hours = getItemsText(HOURS_ITEM);
  const minutes = getItemsText(MINUTES_ITEM);
  const seconds = getItemsText(SECONDS_ITEM);
  const periodLevelName = document.querySelector<HTMLElement>(dataTestIdSelector(PERIOD_LEVEL))?.innerText;

  return {
    ...(periodLevelName ? { periodLevelName } : {}),
    ...(items.length > 0 ? { items: items.join(',') } : {}),
    ...(header.length > 0 ? { header: header.join(',') } : {}),
    ...(hours.length > 0 ? { hours: hours.join(',') } : {}),
    ...(minutes.length > 0 ? { minutes: minutes.join(',') } : {}),
    ...(seconds.length > 0 ? { seconds: seconds.join(',') } : {}),
  };
});

export const focusItem = ClientFunction((index: number) => {
  const items = document.querySelectorAll<HTMLButtonElement>('*[data-test-id="item-test-id"]');
  const button = items?.[index];
  button?.focus();
});

export const getDateValueFromHolder = ClientFunction(() => {
  const holder = document.querySelector<HTMLElement>('[data-test-id="calendar-value-holder"]');
  return holder?.innerText || '';
});

export const getTimeValueFromHolder = ClientFunction(() => {
  const holder = document.querySelector<HTMLElement>('[data-test-id="timepicker-value-holder"]');
  return holder?.innerText || '';
});

export const getPresetsItemsLabels = ClientFunction(() => {
  const dataTestIdSelector = (testId: string) => `*[data-test-id="${testId}"]`;

  const elements = document.querySelectorAll<HTMLElement>(dataTestIdSelector('list__base-item-option'));

  const itemsLabels: string[] = [];

  for (const element of elements) {
    itemsLabels.push(element.innerText);
  }

  return itemsLabels;
});

const DEFAULT_OPTIONS_LABELS = ['7 days', '14 days', '30 days', '90 days', '120 days', '1 year', '2 years'];

export function getDefaultOptions() {
  return DEFAULT_OPTIONS_LABELS.map(period => `Last ${period}`);
}

export function getCustomOptions() {
  return [
    ...DEFAULT_OPTIONS_LABELS.slice(0, 2).map(period => `Next ${period}`),
    ...DEFAULT_OPTIONS_LABELS.slice(0, 2).map(period => `Previous ${period}`),
    'Next weekend',
  ];
}
