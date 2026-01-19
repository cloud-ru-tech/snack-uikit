import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'code-editor';

test.describe('Code Editor', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'code-editor',
      props: {
        'data-test-id': TEST_ID,
        value: 9,
      },
    });
    const codeEditor = getByTestId(TEST_ID);

    await expect(codeEditor).toBeVisible();
  });
});
