import { expect, test } from '../../../playwright/fixtures';
import { focusItem, getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;

test.describe('[calendar] mode=year-range', () => {
  test('Should highlight selected range', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'year-range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await getByTestId(ITEM).nth(4).click(); // 2023
    await getByTestId(ITEM).nth(6).click(); // 2025
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '2019,2020,2021,2022,[!2023]_,_2024_,_[2025],2026,2027,2028,2029,2030',
      periodLevelName: '2020-2029',
    });
  });

  test('Should show start of selected range', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'year-range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await getByTestId(ITEM).nth(4).click(); // 2023
    await focusItem(page, 9); // 2028
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '2019,2020,2021,2022,[!2023]_,_2024_,_2025_,_2026_,_2027_,_2028,2029,2030',
      periodLevelName: '2020-2029',
    });
  });

  test('Should select range across decades', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'year-range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await getByTestId(ITEM).nth(4).click(); // 2023
    await getByTestId(`period-next-${TEST_ID}`).click(); // 2030-2039
    await getByTestId(ITEM).nth(3).click(); // 2032
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '_2029_,_2030_,_2031_,_[2032],2033,2034,2035,2036,2037,2038,2039,2040',
      periodLevelName: '2030-2039',
    });
  });
});
