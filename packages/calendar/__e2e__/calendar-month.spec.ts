import { expect, test } from '../../../playwright/fixtures';
import { getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;

test.describe('[calendar] mode=month', () => {
  test('Should select month by click in month mode', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'month',
      },
    });
    await getByTestId(ITEM).nth(1).click(); // выбрать второй месяц

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: 'January,[February],March,April,!May,June,July,August,September,October,November,December',
      periodLevelName: '2023',
    });
  });

  test('Presets should not be available', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'month',
        showPeriodPresets: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(`presets-${TEST_ID}`)).not.toBeVisible();
  });
});
