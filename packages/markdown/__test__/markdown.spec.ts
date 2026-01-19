import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'markdown';

test.describe('Markdown', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'markdown',
      group: 'markdown',
      props: {
        'data-test-id': TEST_ID,
        value: '10',
      },
    });

    const markdown = getByTestId(TEST_ID);
    await expect(markdown).toBeVisible();
  });
});
