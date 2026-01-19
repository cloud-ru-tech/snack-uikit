import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/testIds';

const MOCK_DATA = {
  title: 'Title',
  description: 'Description',
};

test.describe('Accordion Collapse Block', () => {
  test('Primary - Render all', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblockprimary',
      story: 'collapse-block-primary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: MOCK_DATA.description,
        showTip: true,
        showActions: true,
      },
    });

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.description)).toHaveText(MOCK_DATA.description);
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tooltip)).toBeVisible();
    await expect(getByTestId(TEST_IDS.actions)).toBeVisible();
  });

  test('Secondary - Render all', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblocksecondary',
      story: 'collapse-block-secondary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: MOCK_DATA.description,
        showTip: true,
        showActions: true,
      },
    });

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.description)).toHaveText(MOCK_DATA.description);
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tooltip)).toBeVisible();
    await expect(getByTestId(TEST_IDS.actions)).toBeVisible();
  });

  test('Primary - Render only title with content', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblockprimary',
      story: 'collapse-block-primary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: undefined,
        showTip: false,
        showActions: false,
      },
    });

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.description)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tooltip)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.actions)).not.toBeVisible();
  });

  test('Secondary - Render only title with content', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblocksecondary',
      story: 'collapse-block-secondary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: undefined,
        showTip: false,
        showActions: false,
      },
    });

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.description)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tooltip)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.actions)).not.toBeVisible();
  });

  test('Primary - Controlled hidden content by click chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblockprimary',
      story: 'collapse-block-primary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: MOCK_DATA.description,
        expanded: false,
      },
    });

    const collapseBlock = getByTestId(TEST_IDS.collapseBlock);
    const content = getByTestId(TEST_IDS.content);
    const chevron = getByTestId(TEST_IDS.chevron);

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');

    await chevron.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toHaveAttribute('aria-hidden', 'false');

    await chevron.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  test('Secondary - Controlled hidden content by click chevron', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblocksecondary',
      story: 'collapse-block-secondary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: MOCK_DATA.description,
        expanded: false,
      },
    });

    const collapseBlock = getByTestId(TEST_IDS.collapseBlock);
    const content = getByTestId(TEST_IDS.content);
    const chevron = getByTestId(TEST_IDS.chevron);

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');

    await chevron.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toHaveAttribute('aria-hidden', 'false');

    await chevron.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  test('Primary - Controlled hidden content by click header', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblockprimary',
      story: 'collapse-block-primary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: MOCK_DATA.description,
        expanded: false,
      },
    });

    const collapseBlock = getByTestId(TEST_IDS.collapseBlock);
    const content = getByTestId(TEST_IDS.content);
    const header = getByTestId(TEST_IDS.header);

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');

    await header.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toHaveAttribute('aria-hidden', 'false');

    await header.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  test('Secondary - Controlled hidden content by click header', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'collapseblocksecondary',
      story: 'collapse-block-secondary',
      group: 'accordion',
      props: {
        'data-test-id': TEST_IDS.collapseBlock,
        customHeader: false,
        title: MOCK_DATA.title,
        description: MOCK_DATA.description,
        expanded: false,
      },
    });

    const collapseBlock = getByTestId(TEST_IDS.collapseBlock);
    const content = getByTestId(TEST_IDS.content);
    const header = getByTestId(TEST_IDS.header);

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');

    await header.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toHaveAttribute('aria-hidden', 'false');

    await header.click();

    await expect(collapseBlock).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toHaveAttribute('aria-hidden', 'true');
  });
});
