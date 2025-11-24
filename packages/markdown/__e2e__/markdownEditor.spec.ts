import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'markdown-editor';

test.describe('Markdown Editor', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'markdown-editor',
      group: 'markdown',
      props: {
        'data-test-id': TEST_ID,
        value: '10',
      },
    });

    const markdownEditor = getByTestId(TEST_ID);
    await expect(markdownEditor).toBeVisible();
  });
});
