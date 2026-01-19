import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS } from '../stories/testIds';

const MOCK_DATA = {
  title: 'Title',
  titleLong: 'Title Title Title Title Title Title Title Title Title Title Title',
  description: 'Description',
  descriptionLong: 'Description Description Description Description Description Description Description',
  metadata: 'Metadata',
  metadataLong: 'Metadata Metadata Metadata Metadata Metadata Metadata Metadata Metadata Metadata Metadata',
  promoBadge: 'PromoBadge',
  href: 'cloud-ru',
};

test.describe('Card', () => {
  test(`Should rendered correctly`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
        promoBadge: MOCK_DATA.promoBadge,
        badgeAlwaysVisible: false,
      },
    });

    const card = getByTestId(STORY_TEST_IDS.main);
    const title = getByTestId(TEST_IDS.title);
    const metadata = getByTestId(TEST_IDS.metadata);
    const description = getByTestId(TEST_IDS.description);
    const promoBadge = getByTestId(TEST_IDS.promoBadge);
    const functionBadge = getByTestId(TEST_IDS.functionBadge);

    await expect(card).toBeVisible();

    await expect(title).toBeVisible();
    await expect(title).toHaveText(MOCK_DATA.title);

    await expect(description).toBeVisible();
    await expect(description).toHaveText(MOCK_DATA.description);

    await expect(metadata).toBeVisible();
    await expect(metadata).toHaveText(MOCK_DATA.metadata);

    await expect(promoBadge).toBeVisible();
    await expect(promoBadge).toHaveText(MOCK_DATA.promoBadge);

    // Fix to remove hover from card
    await page.mouse.move(0, 0);
    await expect(functionBadge).not.toBeVisible();
  });

  test(`Should show/hide/hover Card.FunctionBadge`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
        badgeAlwaysVisible: false,
      },
    });

    const card = getByTestId(STORY_TEST_IDS.main);
    const functionBadge = getByTestId(TEST_IDS.functionBadge);

    // Move mouse to top-left corner to remove hover from card
    await page.mouse.move(0, 0);

    await expect(functionBadge).not.toBeVisible();

    await card.hover();
    await page.waitForTimeout(100);
    await expect(functionBadge).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(functionBadge).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(functionBadge).toBeFocused();
  });

  test(`Should show with prop badgeAlwaysVisible Card.FunctionBadge`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
        badgeAlwaysVisible: true,
      },
    });

    const functionBadge = getByTestId(TEST_IDS.functionBadge);

    await expect(functionBadge).toBeVisible();
  });

  test(`Card.FunctionBadge should be controlled by keyboard`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
      },
    });

    const card = getByTestId(STORY_TEST_IDS.main);
    const functionBadge = getByTestId(TEST_IDS.functionBadge);
    const droplist = getByTestId(TEST_IDS.droplist);
    const toast = getByTestId(STORY_TEST_IDS.toaster);

    await card.hover();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(functionBadge).toBeFocused();

    await expect(droplist).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await expect(functionBadge).not.toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(toast).toBeVisible();
  });

  test(`Card.Check should appear when card is checked in multipleSelection mode`, async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
        multipleSelection: true,
      },
    });

    const check = getByTestId(TEST_IDS.check);
    const card = getByTestId(STORY_TEST_IDS.main);

    await expect(check).not.toBeVisible();

    await card.click();
    await expect(check).toBeVisible();

    await card.click();
    await expect(check).not.toBeVisible();
  });

  test(`Card.Check should not appear when card is checked without multipleSelection mode`, async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
        multipleSelection: false,
      },
    });

    const check = getByTestId(TEST_IDS.check);
    const card = getByTestId(STORY_TEST_IDS.main);

    await expect(check).not.toBeVisible();

    await card.click();
    await expect(check).not.toBeVisible();

    await card.click();
    await expect(check).not.toBeVisible();
  });

  test(`Card should use anchor element if href prop was passed`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
        href: MOCK_DATA.href,
      },
    });

    const anchor = getByTestId(TEST_IDS.anchor);

    await expect(anchor).toBeVisible();
  });

  test(`Card should not use anchor element if href prop was not passed`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'card',
      props: {
        'data-test-id': STORY_TEST_IDS.main,
        title: MOCK_DATA.title,
        metadata: MOCK_DATA.metadata,
        description: MOCK_DATA.description,
      },
    });

    const anchor = getByTestId(TEST_IDS.anchor);

    await expect(anchor).not.toBeVisible();
  });
});
