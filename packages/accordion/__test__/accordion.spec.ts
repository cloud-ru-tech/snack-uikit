import { expect, test } from '../../../playwright/fixtures';
import { STORY_TEST_IDS } from '../stories/constants';

test.describe('Accordion', () => {
  test('Primary - Single mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'accordionprimary',
      story: 'accordion-primary',
      group: 'accordion',
      props: {
        selectionMode: 'single',
      },
    });

    const collapseBlockFirst = getByTestId(STORY_TEST_IDS[0]);
    const collapseBlockSecond = getByTestId(STORY_TEST_IDS[1]);

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockFirst.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockSecond.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'true');
  });

  test('Secondary - Single mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'accordionsecondary',
      story: 'accordion-secondary',
      group: 'accordion',
      props: {
        selectionMode: 'single',
      },
    });

    const collapseBlockFirst = getByTestId(STORY_TEST_IDS[0]);
    const collapseBlockSecond = getByTestId(STORY_TEST_IDS[1]);

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockFirst.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockSecond.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'true');
  });

  test('Primary - Multiple mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'accordionprimary',
      story: 'accordion-primary',
      group: 'accordion',
      props: {
        selectionMode: 'multiple',
      },
    });

    const collapseBlockFirst = getByTestId(STORY_TEST_IDS[0]);
    const collapseBlockSecond = getByTestId(STORY_TEST_IDS[1]);

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockFirst.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockSecond.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'true');
  });

  test('Secondary - Multiple mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'accordionsecondary',
      story: 'accordion-secondary',
      group: 'accordion',
      props: {
        selectionMode: 'multiple',
      },
    });

    const collapseBlockFirst = getByTestId(STORY_TEST_IDS[0]);
    const collapseBlockSecond = getByTestId(STORY_TEST_IDS[1]);

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockFirst.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'false');

    await collapseBlockSecond.click();

    await expect(collapseBlockFirst).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseBlockSecond).toHaveAttribute('aria-expanded', 'true');
  });
});
