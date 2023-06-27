import { ClientFunction } from 'testcafe';

export const getCalendarTextSnapshot = ClientFunction(() => {
  const TEST_ID = 'calendar';
  const ITEM = `item-${TEST_ID}`;
  const HEADER_ITEM = `header-item-${TEST_ID}`;
  const PERIOD_LEVEL = `period-level-${TEST_ID}`;

  const dataTestIdSelector = (testId: string) => `*[data-test-id="${testId}"]`;

  const getItemsText = (selector: string) => {
    const elements = document.querySelectorAll<HTMLElement>(dataTestIdSelector(selector));
    const items: string[] = [];

    for (const element of elements) {
      let text = element.innerText;
      const isSelected = element.getAttribute('data-is-selected');
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
  const periodLevelName = document.querySelector<HTMLElement>(dataTestIdSelector(PERIOD_LEVEL))?.innerText;

  return { items: items.join(','), header: header.join(','), periodLevelName };
});

export const focusItem = ClientFunction((index: number) => {
  const items = document.querySelectorAll<HTMLButtonElement>('*[data-test-id="item-calendar"]');
  const button = items?.[index];
  button?.focus();
});

export const getValueFromHolder = ClientFunction(() => {
  const holder = document.querySelector<HTMLElement>('[data-test-id="calendar-value-holder"]');
  return holder?.innerText || '';
});
