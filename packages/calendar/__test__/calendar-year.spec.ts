import { expect, test } from '../../../playwright/fixtures';
import { getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;

test.describe('[calendar] mode=year', () => {
  test('Should select year by click in year mode', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'year',
      },
    });
    await getByTestId(ITEM).nth(1).click(); // выбрать 2020 год

    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '2019,[2020],2021,2022,!2023,2024,2025,2026,2027,2028,2029,2030',
      periodLevelName: '2020-2029',
    });
  });

  test('Presets should not be available', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'year',
        showPeriodPresets: true,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId(`presets-${TEST_ID}`)).not.toBeVisible();
  });
});
