import { expect, test } from '../../../playwright/fixtures';
import { VARIANT } from '../src/components/constants';

const TRUNCATE_STRING_TEST_ID = 'truncate-string';
const FULL_TEXT = 'Very long text that should be truncated in the middle';
const TRUNCATED_TEXT = 'Very long text th...ated in the middle';

test.describe('Truncate string', () => {
  test('Text should be cropped in the middle for variant = Variant.Middle', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'truncate-string',
      props: {
        'data-test-id': TRUNCATE_STRING_TEST_ID,
        text: FULL_TEXT,
        variant: VARIANT.Middle,
      },
    });

    const truncatedText = getByTestId('truncated-text');
    await expect(truncatedText).toHaveText(TRUNCATED_TEXT);
  });
});
