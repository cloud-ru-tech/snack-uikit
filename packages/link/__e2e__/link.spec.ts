import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'link-on-surface-test';
const EXTERNAL_ICON_TEST_ID = 'link__external-icon';

const getStory = (props: Record<string, unknown> = {}) => ({
  name: 'link',
  props: {
    'data-test-id': TEST_ID,
    external: false,
    ...props,
  },
});

test.describe('Link', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const link = getByTestId(TEST_ID);

    await expect(link).toBeVisible();
    await expect(link.locator(`[data-test-id="${EXTERNAL_ICON_TEST_ID}"]`)).not.toBeVisible();
  });
});
