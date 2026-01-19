import { expect, test } from '../../../playwright/fixtures';
import { FAMILY, PURPOSE, SIZE, TAG } from '../src/components/constants';

const TEST_ID = 'typography';
const family = FAMILY.CrossedOut;
const purpose = PURPOSE.Label;
const size = SIZE.M;
const tag = TAG.h3;

test.describe('Typography', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'typography',
      props: { family, purpose, size, tag, 'data-test-id': TEST_ID },
    });

    const element = getByTestId(TEST_ID);

    await expect(element).toBeVisible();
    expect(await element.getAttribute('data-family')).toEqual(family);
    expect(await element.getAttribute('data-purpose')).toEqual(purpose);
    expect(await element.getAttribute('data-size')).toEqual(size);
    expect(await element.evaluate(el => el.tagName.toLowerCase())).toEqual(tag);
  });
});
