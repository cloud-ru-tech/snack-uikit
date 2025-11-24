import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'file-upload';

test.describe('File Upload', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'file-upload',
      story: 'file-upload',
      group: 'drop-zone',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(TEST_ID)).toBeAttached();
  });
});
