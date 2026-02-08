import { expect, test } from '../../../playwright/fixtures';
import { focusItem, getCalendarTextSnapshot } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;
const PERIOD_LEVEL = `period-level-${TEST_ID}`;

test.describe('[calendar] mode=month-range', () => {
  test('Should highlight selected range', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'month-range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await getByTestId(ITEM).nth(3).click(); // April
    await getByTestId(ITEM).nth(5).click(); // June
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: 'January,February,March,[April]_,_!May_,_[June],July,August,September,October,November,December',
      periodLevelName: '2023',
    });
  });

  test('Should show start of selected range', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'month-range',
      },
    });
    await expect(getByTestId(TEST_ID)).toBeVisible();

    await getByTestId(ITEM).nth(3).click(); // April
    await focusItem(page, 11); // December
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items:
        'January,February,March,[April]_,_!May_,_June_,_July_,_August_,_September_,_October_,_November_,_December',
      periodLevelName: '2023',
    });
  });

  test('Should show selected years', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'month-range',
      },
    });
    await getByTestId(ITEM).nth(3).click(); // April 2023
    await getByTestId(`period-next-${TEST_ID}`).click(); // 2024
    await getByTestId(`period-next-${TEST_ID}`).click(); // 2025
    await getByTestId(ITEM).nth(5).click(); // June 2025
    await getByTestId(PERIOD_LEVEL).click();
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: '2019,2020,2021,2022,[!2023]_,_2024_,_[2025],2026,2027,2028,2029,2030',
      periodLevelName: '2020-2029',
    });
  });

  test('Should highlight months on focus in preselect', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'calendar',
      group: 'calendar',
      props: {
        'data-test-id': TEST_ID,
        dateToday: 1684141200000, // 15 Мая 2023, 12-00
        mode: 'month-range',
      },
    });
    await getByTestId(ITEM).nth(3).click();
    await focusItem(page, 9);
    await expect(await getCalendarTextSnapshot(page)).toEqual({
      items: 'January,February,March,[April]_,_!May_,_June_,_July_,_August_,_September_,_October,November,December',
      periodLevelName: '2023',
    });
  });
});
