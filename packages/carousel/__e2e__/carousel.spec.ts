import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/testIds';
import { STORY_TEST_IDS } from '../stories/constants';

const TEST_ID = 'carousel';

test.describe('Carousel', () => {
  test('Should render with arrows & pagination', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'carousel',
      props: {
        'data-test-id': TEST_ID,
        scrollBy: 2,
        showItems: 2.5,
        page: 2,
        itemsCount: 12,
        arrows: true,
        pagination: true,
        infiniteScroll: false,
        controlsVisibility: 'always',
      },
    });

    const carousel = getByTestId(TEST_ID);
    const arrowNext = getByTestId(TEST_IDS.arrowNext);
    const arrowPrev = getByTestId(TEST_IDS.arrowPrev);
    const pagination = getByTestId(TEST_IDS.pagination);

    await expect(carousel).toBeVisible();
    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).toBeVisible();
    await expect(pagination).toBeVisible();
  });

  test('Should render without arrows & pagination', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'carousel',
      props: {
        'data-test-id': TEST_ID,
        scrollBy: 2,
        showItems: 2.5,
        page: 1,
        itemsCount: 12,
        arrows: false,
        pagination: false,
        infiniteScroll: false,
        controlsVisibility: 'always',
      },
    });

    const carousel = getByTestId(TEST_ID);
    const arrowNext = getByTestId(TEST_IDS.arrowNext);
    const arrowPrev = getByTestId(TEST_IDS.arrowPrev);
    const pagination = getByTestId(TEST_IDS.pagination);

    await expect(carousel).toBeVisible();
    await expect(arrowNext).not.toBeVisible();
    await expect(arrowPrev).not.toBeVisible();
    await expect(pagination).not.toBeVisible();
  });

  test('Should hide arrows in first/last page', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'carousel',
      props: {
        'data-test-id': TEST_ID,
        scrollBy: 2,
        showItems: 2.5,
        page: 1,
        itemsCount: 12,
        arrows: true,
        pagination: true,
        infiniteScroll: false,
        controlsVisibility: 'always',
      },
    });

    const arrowNext = getByTestId(TEST_IDS.arrowNext);
    const arrowPrev = getByTestId(TEST_IDS.arrowPrev);
    const pagination = getByTestId(TEST_IDS.pagination);
    const paginationItems = pagination.locator('button');
    const lastPaginationItem = paginationItems.nth(-1);

    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).not.toBeVisible();

    await arrowNext.click();

    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).toBeVisible();

    await lastPaginationItem.click();
    await expect(arrowPrev).toBeVisible();
    await expect(arrowNext).not.toBeVisible();
  });

  test('Should infiniteScroll', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'carousel',
      props: {
        'data-test-id': TEST_ID,
        scrollBy: 2,
        showItems: 2.5,
        page: 1,
        itemsCount: 12,
        arrows: true,
        pagination: true,
        infiniteScroll: true,
        controlsVisibility: 'always',
      },
    });

    const arrowNext = getByTestId(TEST_IDS.arrowNext);
    const arrowPrev = getByTestId(TEST_IDS.arrowPrev);
    const hiddenPageCounter = getByTestId(STORY_TEST_IDS.HiddenPageCounter);

    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).toBeVisible();

    await expect(hiddenPageCounter).toHaveText('1');

    await arrowPrev.click();

    await expect(hiddenPageCounter).not.toHaveText('1');

    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).toBeVisible();

    await arrowNext.click();

    await expect(hiddenPageCounter).toHaveText('1');

    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).toBeVisible();
  });

  test('Should arrows be hidden', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'carousel',
      props: {
        'data-test-id': TEST_ID,
        scrollBy: 2,
        showItems: 2.5,
        page: 1,
        itemsCount: 12,
        arrows: true,
        pagination: true,
        infiniteScroll: true,
        controlsVisibility: 'hover',
      },
    });

    const arrowNext = getByTestId(TEST_IDS.arrowNext);
    const arrowPrev = getByTestId(TEST_IDS.arrowPrev);
    const hiddenPageCounter = getByTestId(STORY_TEST_IDS.HiddenPageCounter);

    await hiddenPageCounter.click(); // to snatch focus and hover from carousel
    await page.waitForTimeout(250); // waiting for arrows disappearing animation

    await expect(arrowNext).toBeVisible();
    await expect(arrowPrev).toBeVisible();

    // Проверяем, что стрелки невидимы (opacity: 0)
    const arrowNextOpacity = await arrowNext.evaluate(el => getComputedStyle(el).getPropertyValue('opacity'));
    expect(arrowNextOpacity).toEqual('0');
    const arrowPrevOpacity = await arrowPrev.evaluate(el => getComputedStyle(el).getPropertyValue('opacity'));
    expect(arrowPrevOpacity).toEqual('0');

    // Проверяем, что стрелки неактивны (pointer-events: none)
    const arrowNextPointerEvents = await arrowNext.evaluate(el =>
      getComputedStyle(el).getPropertyValue('pointer-events'),
    );
    expect(arrowNextPointerEvents).toEqual('none');
    const arrowPrevPointerEvents = await arrowPrev.evaluate(el =>
      getComputedStyle(el).getPropertyValue('pointer-events'),
    );
    expect(arrowPrevPointerEvents).toEqual('none');
  });
});
